import React, { useState } from 'react';

const MOCK_CUSTOMERS = [
  { id: 1, name: "Erina", email: "erina@dev-dash.io", role: "Owner", status: "Active", spend: "$5,200" },
  { id: 2, name: "Sadique", email: "sadique@backend.node", role: "Admin", status: "Active", spend: "$4,100" },
  { id: 3, name: "Nihal", email: "nihal@cloud.com", role: "Editor", status: "Inactive", spend: "$1,200" },
  { id: 4, name: "Shada", email: "shada@design.ui", role: "User", status: "Active", spend: "$2,850" },
  { id: 5, name: "Sama", email: "sama@growth.mkt", role: "User", status: "Active", spend: "$950" },
  { id: 6, name: "Ramsha", email: "ramsha@analysis.data", role: "Editor", status: "Active", spend: "$1,800" },
];

export default function Customers({ theme }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = MOCK_CUSTOMERS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ color: theme.text, fontSize: "22px", fontWeight: "600", margin: 0 }}>Customer Directory</h2>
        <div style={badgeStyle(theme)}>Total Members: {MOCK_CUSTOMERS.length}</div>
      </div>

      {/* 1. Search Bar Area */}
      <div style={{ marginBottom: "16px" }}>
        <input 
          type="text" 
          placeholder="Filter by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle(theme)}
        />
      </div>
      
      {/* 2. Main Table Container */}
      <div style={containerStyle(theme)}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={headerRowStyle(theme)}>
              <th style={paddingStyle}>MEMBER</th>
              <th style={paddingStyle}>ROLE</th>
              <th style={paddingStyle}>STATUS</th>
              <th style={paddingStyle}>CONTRIBUTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((user) => (
              <tr key={user.id} style={rowStyle(theme)}>
                <td style={{ ...paddingStyle, display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ ...avatarStyle, backgroundColor: theme.border }}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", color: theme.text, fontSize: "14px" }}>{user.name}</div>
                    <div style={{ fontSize: "12px", color: theme.subtext, fontFamily: "monospace" }}>{user.email}</div>
                  </div>
                </td>
                <td style={{ ...paddingStyle, color: theme.subtext, fontSize: "13px" }}>{user.role}</td>
                <td style={paddingStyle}>
                  <span style={statusBadgeStyle(user.status)}>
                    {user.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ ...paddingStyle, color: theme.text, fontWeight: "600", fontFamily: "monospace" }}>
                  {user.spend}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCustomers.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: theme.subtext }}>
            No matching system entities found.
          </div>
        )}
      </div>
    </div>
  );
}

// --- Dynamic Themed Styles ---

const containerStyle = (theme) => ({ 
  backgroundColor: theme.card, 
  borderRadius: "4px", 
  border: `1px solid ${theme.border}`, 
  overflow: "hidden" 
});

const searchInputStyle = (theme) => ({
  width: "100%",
  backgroundColor: theme.card,
  border: `1px solid ${theme.border}`,
  borderRadius: "4px",
  padding: "10px 14px",
  color: theme.text,
  fontSize: "13px",
  outline: "none",
  fontFamily: "monospace"
});

const headerRowStyle = (theme) => ({ 
  borderBottom: `1px solid ${theme.border}`, 
  color: theme.subtext, 
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "0.5px"
});

const rowStyle = (theme) => ({ 
  borderBottom: `1px solid ${theme.border}`,
  transition: "background 0.2s"
});

const paddingStyle = { padding: "14px 16px" };

const avatarStyle = { 
  width: "32px", height: "32px", borderRadius: "4px", 
  display: "flex", alignItems: "center", justifyContent: "center", 
  fontWeight: "bold", color: "white", fontSize: "12px"
};

const statusBadgeStyle = (status) => ({
  padding: "2px 8px", 
  borderRadius: "2px", 
  fontSize: "10px",
  fontWeight: "bold",
  backgroundColor: status === "Active" ? "rgba(63, 185, 80, 0.15)" : "rgba(248, 81, 73, 0.15)",
  color: status === "Active" ? "#3fb950" : "#f85149",
  border: `1px solid ${status === "Active" ? "#3fb950" : "#f85149"}`
});

const badgeStyle = (theme) => ({
  fontSize: "10px",
  color: theme.subtext,
  border: `1px solid ${theme.border}`,
  padding: "4px 8px",
  borderRadius: "2px",
  textTransform: "uppercase",
  fontFamily: "monospace"
});