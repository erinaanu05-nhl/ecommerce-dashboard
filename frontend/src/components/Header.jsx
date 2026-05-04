export default function Header({ theme, userName, onLogout }) {
  return (
    <header style={{...headerStyle, backgroundColor: theme.bg, borderBottomColor: theme.border}}>
      <div style={searchContainerStyle}>
        <input 
          type="text" 
          placeholder="Search system logs..." 
          style={{...inputStyle, backgroundColor: theme.card, borderColor: theme.border, color: theme.text}} 
        />
      </div>
      
      <div style={userAreaStyle}>
        <div style={statusIndicatorStyle} />
        
        {/* Profile Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={avatarStyle}>
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
          <span style={{...userNameStyle, color: theme.text}}>
            {userName || "Guest User"}
          </span>
        </div>

        {/* Logout Button */}
        <button 
          onClick={onLogout}
          style={{
            ...logoutBtnStyle,
            borderColor: theme.border,
            color: "#f85149" // GitHub-style red for danger/logout
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

// --- Styles ---
const headerStyle = { 
  height: "64px", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "space-between", 
  padding: "0 24px" 
};

const searchContainerStyle = { flex: 1, maxWidth: "400px" };

const inputStyle = { 
  width: "100%", 
  border: "1px solid", 
  borderRadius: "6px", 
  padding: "8px 12px", 
  fontSize: "13px", 
  outline: "none" 
};

const userAreaStyle = { display: "flex", alignItems: "center", gap: "20px" };

const statusIndicatorStyle = { 
  width: "8px", 
  height: "8px", 
  backgroundColor: "#238636", 
  borderRadius: "50%", 
  boxShadow: "0 0 8px #238636" 
};

const avatarStyle = { 
  width: "32px", 
  height: "32px", 
  backgroundColor: "#30363d", 
  borderRadius: "50%", // Circular looks a bit more modern
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  fontSize: "12px", 
  fontWeight: "bold", 
  color: "white",
  border: "1px solid rgba(255,255,255,0.1)"
};

const userNameStyle = { fontSize: "13px", fontWeight: "500" };

const logoutBtnStyle = {
  backgroundColor: "transparent",
  border: "1px solid",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease"
};