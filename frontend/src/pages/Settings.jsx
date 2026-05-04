import React from 'react';

export default function Settings({ isDarkMode, onToggleTheme, theme }) {
  const cardStyle = {
    backgroundColor: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: "4px",
    padding: "24px",
    marginBottom: "20px"
  };

  const labelStyle = {
    display: "block",
    color: theme.subtext,
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "8px",
    textTransform: "uppercase"
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: isDarkMode ? "#0d1117" : "#ffffff",
    border: `1px solid ${theme.border}`,
    borderRadius: "4px",
    padding: "10px",
    color: theme.text,
    fontSize: "14px",
    outline: "none"
  };

  return (
    <div style={{ maxWidth: "800px", animation: "fadeIn 0.5s ease-out" }}>
      <h2 style={{ color: theme.text, fontSize: "22px", marginBottom: "24px" }}>Settings</h2>

      {/* Theme Toggle Section */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ color: theme.text, fontSize: "16px", margin: "0 0 4px 0" }}>Appearance</h3>
            <p style={{ color: theme.subtext, fontSize: "13px", margin: 0 }}>
              Currently using {isDarkMode ? "Dark" : "Light"} Industrial theme.
            </p>
          </div>
          <button 
            onClick={onToggleTheme}
            style={{
              padding: "8px 16px",
              backgroundColor: isDarkMode ? "#30363d" : "#0969da",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background 0.2s"
            }}
          >
            Switch to {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div style={cardStyle}>
        <h3 style={{ color: theme.text, fontSize: "16px", margin: "0 0 20px 0" }}>User Profile</h3>
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Display Name</label>
          <input style={inputStyle} defaultValue="Erina Abid" />
        </div>
        <div>
          <label style={labelStyle}>Email Address</label>
          <input style={inputStyle} defaultValue="erina@example.com" />
        </div>
      </div>
    </div>
  );
}