import React from 'react';

const IndustrialChart = ({ theme }) => {
  const pathData = "M 0 80 Q 150 75, 300 50 T 450 40 T 600 25 T 900 15";
  return (
    <div style={{ width: "100%", paddingTop: "20px" }}>
      <svg viewBox="0 0 900 100" style={{ width: "100%", height: "140px", overflow: "visible" }}>
        <line x1="0" y1="20" x2="900" y2="20" stroke={theme.border} strokeWidth="1" opacity="0.3" />
        <line x1="0" y1="50" x2="900" y2="50" stroke={theme.border} strokeWidth="1" opacity="0.3" />
        <line x1="0" y1="80" x2="900" y2="80" stroke={theme.border} strokeWidth="1" opacity="0.3" />
        <path 
          d={pathData} 
          fill="none" 
          stroke={theme.accent} 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", color: theme.subtext, fontSize: "10px", marginTop: "12px", fontFamily: "monospace" }}>
        <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, isPositive = true, theme }) => (
  <div style={{ padding: "20px", backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: "4px" }}>
    <p style={{ color: theme.subtext, fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0" }}>{title}</p>
    <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
      <h3 style={{ color: theme.text, fontSize: "28px", fontWeight: "700", margin: "0" }}>{value}</h3>
      <span style={{ 
        color: isPositive ? "#3fb950" : "#f85149", 
        fontSize: "12px", 
        fontWeight: "600",
        backgroundColor: isPositive ? "rgba(63, 185, 80, 0.1)" : "rgba(248, 81, 73, 0.1)",
        padding: "2px 6px",
        borderRadius: "4px"
      }}>
        {isPositive ? "↑" : "↓"} {trend}
      </span>
    </div>
  </div>
);

export default function Overview({ sales, theme }) {
  // Mock operations data that feels industrial
  const operations = [
    { id: "DE-9012", task: "LOAD_BALANCER_SYNC", amount: "$0.00", status: "OK", color: "#3fb950" },
    { id: "TX-4402", task: "STRIPE_PAYMENT_INIT", amount: "$442.00", status: "OK", color: "#3fb950" },
    { id: "INV-001", task: "STOCK_LEVEL_CRITICAL", amount: "N/A", status: "WARN", color: "#d29922" },
    { id: "SYS-99", task: "DATABASE_BACKUP", amount: "$0.00", status: "OK", color: "#3fb950" },
  ];

  const rowStyle = { 
    display: "grid", 
    gridTemplateColumns: "1.2fr 2fr 1fr 1fr", 
    padding: "12px 8px", 
    borderBottom: `1px solid ${theme.border}`, 
    fontSize: "13px", 
    color: theme.subtext, 
    fontFamily: "monospace",
    transition: "background-color 0.2s ease",
    cursor: "default"
  };

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ color: theme.text, fontSize: "22px", fontWeight: "600", margin: 0 }}>System Overview</h2>
          <p style={{ color: theme.subtext, fontSize: "12px", margin: "4px 0 0 0" }}>Real-time telemetry and financial reporting</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "10px", color: theme.subtext, fontFamily: "monospace" }}>SERVER_STATUS: </span>
          <span style={{ fontSize: "10px", color: "#3fb950", fontFamily: "monospace", fontWeight: "bold" }}>NOMINAL</span>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "16px" }}>
        <StatCard title="Net Revenue" value={`$${sales?.toLocaleString()}`} trend="12.5%" theme={theme} />
        <StatCard title="Active Nodes" value="1,402" trend="8.2%" theme={theme} />
        <StatCard title="Latency" value="24ms" trend="2.1%" isPositive={false} theme={theme} />
      </div>

      <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: "4px", padding: "24px", marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <h3 style={{ color: theme.text, fontSize: "14px", fontWeight: "600", margin: 0 }}>Revenue Projection</h3>
          <span style={{ color: theme.accent, fontSize: "11px", fontFamily: "monospace" }}>TARGET_META: 105%</span>
        </div>
        <IndustrialChart theme={theme} />
      </div>

      <div style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}`, borderRadius: "4px", padding: "24px" }}>
        <h3 style={{ color: theme.text, fontSize: "14px", fontWeight: "600", margin: "0 0 16px 0" }}>Recent Operations Log</h3>
        
        {operations.map((op, index) => (
          <div 
            key={op.id} 
            style={{
              ...rowStyle, 
              borderBottom: index === operations.length - 1 ? "none" : `1px solid ${theme.border}`
            }}
          >
            <span style={{ color: "#58a6ff" }}>#{op.id}</span>
            <span style={{ color: theme.text }}>{op.task}</span>
            <span>{op.amount}</span>
            <span style={{ color: op.color, textAlign: "right", fontWeight: "bold" }}>{op.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}