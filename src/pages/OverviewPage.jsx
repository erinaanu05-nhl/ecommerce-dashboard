import React from 'react';

// --- Mini Component: The Industrial Chart ---
const IndustrialChart = () => {
  const pathData = "M 0 80 Q 150 75, 300 50 T 450 40 T 600 25 T 900 15";
  return (
    <div style={{ width: "100%", paddingTop: "20px" }}>
      <svg viewBox="0 0 900 100" style={{ width: "100%", height: "140px", overflow: "visible" }}>
        {/* Horizontal Grid Lines */}
        <line x1="0" y1="20" x2="900" y2="20" stroke="#21262d" strokeWidth="1" />
        <line x1="0" y1="50" x2="900" y2="50" stroke="#21262d" strokeWidth="1" />
        <line x1="0" y1="80" x2="900" y2="80" stroke="#21262d" strokeWidth="1" />
        
        {/* The Projection Line (GitHub Green) */}
        <path 
          d={pathData} 
          fill="none" 
          stroke="#238636" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(35, 134, 54, 0.4))" }}
        />
        
        {/* Data Points */}
        <circle cx="300" cy="50" r="4" fill="#238636" />
        <circle cx="600" cy="25" r="4" fill="#238636" />
      </svg>
      <div style={labelsRowStyle}>
        <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
      </div>
    </div>
  );
};

// --- Mini Component: Stat Card ---
const StatCard = ({ title, value, trend, isPositive = true }) => (
  <div style={statCardStyle}>
    <p style={labelStyle}>{title}</p>
    <h3 style={valueStyle}>{value}</h3>
    <p style={{ 
      color: isPositive ? "#3fb950" : "#f85149", 
      fontSize: "12px", 
      fontWeight: "600", 
      margin: 0,
      display: "flex",
      alignItems: "center",
      gap: "4px"
    }}>
      {isPositive ? "↑" : "↓"} {trend} 
      <span style={{ color: "#8b949e", fontWeight: "400" }}> vs prev</span>
    </p>
  </div>
);

// --- Main Page Component ---
export default function Overview({ sales }) {
  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      <div style={headerFlexStyle}>
        <h2 style={pageTitleStyle}>System Overview</h2>
        <span style={timestampStyle}>Last Sync: {new Date().toLocaleTimeString()}</span>
      </div>
      
      {/* 1. Stats Grid */}
      <div style={statsGridStyle}>
        <StatCard title="Net Revenue" value={`$${sales?.toLocaleString() || '0'}`} trend="12.5%" />
        <StatCard title="Active Instances" value="1,402" trend="8.2%" />
        <StatCard title="Latency" value="24ms" trend="2.1%" isPositive={false} />
      </div>

      {/* 2. Performance Chart */}
      <div style={sectionCardStyle}>
        <div style={sectionHeaderStyle}>
          <h3 style={sectionTitleStyle}>Revenue Projection</h3>
          <div style={liveBadgeStyle}>Real-time</div>
        </div>
        <IndustrialChart />
      </div>

      {/* 3. System Logs (Table) */}
      <div style={sectionCardStyle}>
        <h3 style={sectionTitleStyle}>Recent Operations</h3>
        <div style={{ marginTop: "20px" }}>
          <div style={rowStyle}>
            <span style={monoIdStyle}>#DE-9012</span>
            <span style={{ color: "#e6edf3" }}>LOAD_BALANCER_SYNC</span>
            <span>$0.00</span>
            <span style={statusOkStyle}>OK</span>
          </div>
          <div style={rowStyle}>
            <span style={monoIdStyle}>#TX-4402</span>
            <span style={{ color: "#e6edf3" }}>STRIPE_PAYMENT_INIT</span>
            <span>$442.00</span>
            <span style={statusOkStyle}>OK</span>
          </div>
          <div style={{...rowStyle, borderBottom: "none"}}>
            <span style={monoIdStyle}>#SY-1102</span>
            <span style={{ color: "#e6edf3" }}>CRON_JOB_REVENUE</span>
            <span>$12.50</span>
            <span style={{...statusOkStyle, color: "#f59e0b"}}>WARN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Industrial "Developer" Styles ---
const pageTitleStyle = { color: "white", fontSize: "22px", fontWeight: "600", margin: 0 };
const headerFlexStyle = { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" };
const timestampStyle = { color: "#484f58", fontSize: "12px", fontFamily: "monospace" };

const statsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "16px" };
const statCardStyle = { padding: "20px", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "4px" };
const labelStyle = { color: "#8b949e", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0" };
const valueStyle = { color: "white", fontSize: "28px", fontWeight: "700", margin: "0 0 4px 0" };

const sectionCardStyle = { backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "4px", padding: "24px", marginBottom: "16px" };
const sectionHeaderStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" };
const sectionTitleStyle = { color: "white", fontSize: "14px", fontWeight: "600", margin: 0 };
const liveBadgeStyle = { fontSize: "10px", color: "#3fb950", border: "1px solid #238636", padding: "2px 8px", borderRadius: "2px", textTransform: "uppercase", fontWeight: "bold" };

const labelsRowStyle = { display: "flex", justifyContent: "space-between", color: "#484f58", fontSize: "10px", marginTop: "12px", fontFamily: "monospace" };

const rowStyle = { display: "grid", gridTemplateColumns: "1.2fr 2fr 1fr 1fr", padding: "12px 8px", borderBottom: "1px solid #21262d", fontSize: "13px", color: "#8b949e", fontFamily: "monospace" };
const monoIdStyle = { color: "#58a6ff" };
const statusOkStyle = { color: "#3fb950", fontWeight: "bold", fontSize: "11px", textAlign: "right" };