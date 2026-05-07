import { useState } from "react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "Orders" },
  { id: "customers", label: "Customers" },
  { id: "inventory", label: "Inventory" },
  { id: "settings", label: "Settings" }, 
];

export default function Sidebar({ activePage, onNavigate, theme, showAdminTools }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  if (!theme) return null;

  // --- THE SYNC LOGIC ---
  const handleGenerateData = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/system/sync', {
        method: 'POST', // Backend requires POST
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Sync Success:", result);
        // Refresh the page to show the new data on the dashboard
        window.location.reload(); 
      } else {
        alert("Server error during sync.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Cannot reach backend. Is it running on port 3000?");
    } finally {
      setIsSyncing(false);
    }
  };

  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (item.id === "settings") {
      return showAdminTools === true;
    }
    return true;
  });

  return (
    <div style={{...sidebarContainerStyle, backgroundColor: theme.bg, borderRight: `1px solid ${theme.border}`}}>
      <div style={{ flex: 1 }}>
        <h2 style={{...logoStyle, color: theme.text}}>E-Dash</h2>
        <nav>
          {visibleNavItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                ...navItemStyle,
                backgroundColor: activePage === item.id 
                  ? (theme.bg === "#ffffff" ? "#f0f0f0" : "rgba(255, 255, 255, 0.1)") 
                  : hoveredItem === item.id 
                    ? "rgba(139, 148, 158, 0.1)" 
                    : "transparent",
                color: activePage === item.id ? theme.text : theme.subtext
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </div>

      <div style={{...footerStyle, borderTop: `1px solid ${theme.border}`}}>
        <button 
          onClick={handleGenerateData} // Trigger the backend sync
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          disabled={isSyncing}
          style={{
            ...generateButtonStyle,
            borderColor: isSyncing ? theme.subtext : theme.accent,
            color: isSyncing ? theme.subtext : theme.accent,
            backgroundColor: btnHover ? "rgba(35, 134, 54, 0.1)" : "transparent",
            cursor: isSyncing ? "not-allowed" : "pointer",
            opacity: isSyncing ? 0.6 : 1
          }}
        >
          {isSyncing ? "Syncing..." : "Generate Data"}
        </button>
      </div>
    </div>
  );
}

const sidebarContainerStyle = { width: "240px", minHeight: "100vh", padding: "24px 16px", display: "flex", flexDirection: "column" };
const logoStyle = { marginBottom: "32px", fontSize: "14px", fontWeight: "bold", letterSpacing: "1px", paddingLeft: "12px", textTransform: "uppercase" };
const navItemStyle = { padding: "10px 12px", cursor: "pointer", borderRadius: "6px", marginBottom: "4px", transition: "all 0.2s ease", fontSize: "14px", fontWeight: "500" };
const footerStyle = { paddingTop: "20px" };
const generateButtonStyle = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid", fontSize: "12px", fontWeight: "600", transition: "all 0.2s ease", textTransform: "uppercase" };