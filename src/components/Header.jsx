export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={searchContainerStyle}>
        <input type="text" placeholder="Search system logs..." style={inputStyle} />
      </div>
      <div style={userAreaStyle}>
        <div style={statusIndicatorStyle} />
        <div style={avatarStyle}>EA</div>
        <span style={userNameStyle}>Erina Abid</span>
      </div>
    </header>
  );
}

const headerStyle = { height: "64px", borderBottom: "1px solid #30363d", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", backgroundColor: "#0d1117" };
const searchContainerStyle = { flex: 1, maxWidth: "400px" };
const inputStyle = { width: "100%", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "4px", padding: "8px 12px", color: "white", fontSize: "13px", outline: "none" };
const userAreaStyle = { display: "flex", alignItems: "center", gap: "16px" };
const statusIndicatorStyle = { width: "8px", height: "8px", backgroundColor: "#238636", borderRadius: "50%", boxShadow: "0 0 8px #238636" };
const avatarStyle = { width: "28px", height: "28px", backgroundColor: "#30363d", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold", color: "white" };
const userNameStyle = { color: "#8b949e", fontSize: "13px", fontWeight: "500" };