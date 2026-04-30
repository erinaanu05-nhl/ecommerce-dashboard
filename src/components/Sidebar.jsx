import { useState } from "react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "Orders" },
  { id: "customers", label: "Customers" },
  { id: "inventory", label: "Inventory" },
  { id: "settings", label: "Settings" }, 
];

export default function Sidebar({ activePage, onNavigate, onGenerate, theme }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [btnHover, setBtnHover] = useState(false);

  if (!theme) return null;

  // --- DIAGNOSTIC LOG ---
  // When the sidebar loads, check your console (F12). 
  // It should say "onGenerate is a function". 
  // If it says "onGenerate is undefined", the error is in App.jsx.
  console.log("Sidebar Rendered. onGenerate type:", typeof onGenerate);

  return (
    <div style={{...sidebarContainerStyle, backgroundColor: theme.bg, borderRight: `1px solid ${theme.border}`}}>
      <div style={{ flex: 1 }}>
        <h2 style={{...logoStyle, color: theme.text}}>E-Dash</h2>
        <nav>
          {NAV_ITEMS.map((item) => (
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
          onClick={() => {
            console.log("Button physically clicked!");
            if (onGenerate) onGenerate();
            else console.error("onGenerate is missing!");
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            ...generateButtonStyle,
            borderColor: theme.accent,
            color: theme.accent,
            backgroundColor: btnHover ? "rgba(35, 134, 54, 0.1)" : "transparent",
          }}
        >
          Generate Data
        </button>
      </div>
    </div>
  );
}

// ... Styles stay exactly the same ...
const sidebarContainerStyle = { width: "240px", minHeight: "100vh", padding: "24px 16px", display: "flex", flexDirection: "column", transition: "all 0.3s ease" };
const logoStyle = { marginBottom: "32px", fontSize: "14px", fontWeight: "bold", letterSpacing: "1px", paddingLeft: "12px", textTransform: "uppercase" };
const navItemStyle = { padding: "10px 12px", cursor: "pointer", borderRadius: "6px", marginBottom: "4px", transition: "all 0.2s ease", fontSize: "14px", fontWeight: "500" };
const footerStyle = { paddingTop: "20px" };
const generateButtonStyle = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid", fontSize: "12px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s ease", textTransform: "uppercase" };