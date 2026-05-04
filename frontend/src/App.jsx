import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Toast from "./components/Toast.jsx";
import AuthPage from "./components/AuthPage"; // Make sure file name is AuthPage.jsx in components
// Page Imports
import Overview from "./pages/OverviewPage.jsx"; 
import Orders from "./pages/Orders.jsx";
import Inventory from "./pages/Inventory.jsx";
import Customers from "./pages/Customers.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("overview");
  const [totalSales, setTotalSales] = useState(48210);
  const [showToast, setShowToast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState(null);

  const theme = {
    bg: isDarkMode ? "#0d1117" : "#ffffff",
    card: isDarkMode ? "#161b22" : "#f6f8fa",
    border: isDarkMode ? "#30363d" : "#d0d7de",
    text: isDarkMode ? "#ffffff" : "#1f2328",
    subtext: isDarkMode ? "#8b949e" : "#656d76",
    accent: "#238636"
  };

  const handleGenerateData = () => {
    console.log("APP: Button Triggered");
    setShowToast(true);
    setTotalSales(prev => prev + Math.floor(Math.random() * 1000));
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // --- THE BOUNCER LOGIC ---
  // If not logged in, we return early and ONLY show the AuthPage
 if (!isLoggedIn) {
  return (
    <AuthPage 
      theme={theme} 
      onLogin={(userData) => { // userData comes from AuthPage's handleSubmit
        setIsLoggedIn(true);
        setUser(userData);    // This saves { email, name } into your state
      }} 
    />
  );
}

  // --- THE PROTECTED CONTENT ---
  // This part only runs if isLoggedIn is TRUE
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: theme.bg }}>
      <Sidebar 
  activePage={activePage} 
  onNavigate={setActivePage} 
  // Only show settings if the email contains "admin"
  showAdminTools={user?.email?.toLowerCase().includes("admin")} 
  theme={theme} 
/>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <Header 
  theme={theme} 
  userName={user?.name} // Use the name we just saved!
  onLogout={() => {
    setIsLoggedIn(false);
    setUser(null);
  }} 
/>
        
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