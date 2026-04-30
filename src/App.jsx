import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Toast from "./components/Toast.jsx";

// Page Imports
import Overview from "./pages/OverviewPage.jsx"; // Renamed to match your file
import Orders from "./pages/Orders.jsx";
import Inventory from "./pages/Inventory.jsx";
import Customers from "./pages/Customers.jsx";
import Settings from "./pages/Settings.jsx";

// ... imports stay the same ...

export default function App() {
  const [activePage, setActivePage] = useState("overview");
  const [totalSales, setTotalSales] = useState(48210);
  const [showToast, setShowToast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = {
    bg: isDarkMode ? "#0d1117" : "#ffffff",
    card: isDarkMode ? "#161b22" : "#f6f8fa",
    border: isDarkMode ? "#30363d" : "#d0d7de",
    text: isDarkMode ? "#ffffff" : "#1f2328",
    subtext: isDarkMode ? "#8b949e" : "#656d76",
    accent: "#238636"
  };

  const handleGenerateData = () => {
    console.log("APP: Button Triggered"); // CHECK CONSOLE
    setShowToast(true);
    
    // This updates the overview sales
    setTotalSales(prev => prev + Math.floor(Math.random() * 1000));

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: theme.bg }}>
      <Sidebar 
        activePage={activePage} 
        onNavigate={setActivePage} 
        onGenerate={handleGenerateData} // Prop name: onGenerate
        theme={theme} 
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header theme={theme} />
        
        <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
          {activePage === "overview" && <Overview sales={totalSales} theme={theme} />}
          {activePage === "orders" && <Orders theme={theme} />}
          {activePage === "inventory" && <Inventory theme={theme} />}
          {activePage === "customers" && <Customers theme={theme} />}
          {activePage === "settings" && (
            <Settings isDarkMode={isDarkMode} onToggleTheme={toggleTheme} theme={theme} />
          )}
        </main>
      </div>

      {showToast && (
        <Toast 
          message="Data Generated" 
          onClose={() => setShowToast(false)} 
          theme={theme}
        />
      )}
    </div>
  );
}