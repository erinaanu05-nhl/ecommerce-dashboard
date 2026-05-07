import React, { useState, useEffect } from 'react';

const IndustrialChart = ({ theme }) => {
  const pathData = "M 0 80 Q 150 75, 300 50 T 450 40 T 600 25 T 900 15";
  return (
    <div style={{ width: "100%", paddingTop: "20px" }}>
      <svg viewBox="0 0 900 100" style={{ width: "100%", height: "140px", overflow: "visible" }}>
        <line x1="0" y1="20" x2="900" y2="20" stroke={theme.border} strokeWidth="1" opacity="0.3" />
        <line x1="0" y1="50" x2="900" y2="50" stroke={theme.border} strokeWidth="1" opacity="0.3" />
        <line x1="0" y1="80" x2="900" y2="80" stroke={theme.border} strokeWidth="1" opacity="0.3" />
        <path d={pathData} fill="none" stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" />
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

export default function Overview({ theme }) {
  // Initialize with the structure the backend expects
  const [data, setData] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    growthRate: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/stats/overview');
        const result = await response.json();
        // If the backend returns the object directly, use it. 
        // If it's wrapped in a 'data' key, use result.data
        setData(result); 
      } catch (error) {
        console.error("Connection failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const rowStyle = { 
    display: "grid", 
    gridTemplateColumns: "1.2fr 2fr 1fr 1fr", 
    padding: "12px 8px", 
    borderBottom: `1px solid ${theme.border}`, 
    fontSize: "13px", 
    color: theme.subtext, 
    fontFamily: "monospace"
  };

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ color: theme.text, fontSize: "22px", fontWeight: "600", margin: 0 }}>System Overview</h2>
          <p style={{ color: theme.subtext, fontSize: "12px", margin: "4px 0 0 0" }}>
            {loading ? "FETCHING TELEMETRY..." : "Real-time telemetry and financial reporting"}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "10px", color: theme.subtext, fontFamily: "monospace" }}>SERVER_STATUS: </span>
          <span style={{ fontSize: "10px", color: loading ? theme.subtext : "#3fb950", fontFamily: "monospace", fontWeight: "bold" }}>
            {loading ? "CONNECTING..." : "NOMINAL"}
          </span>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "16px" }}>
        <StatCard 
          title="Net Revenue" 
          value={`$${(data?.totalSales || 0).toLocaleString()}`} 
          trend={`${data?.growthRate || 0}%`} 
          isPositive={(data?.growthRate || 0) >= 0}
          theme={theme} 
        />
        <StatCard 
          title="Total Orders" 
          value={(data?.totalOrders || 0).toLocaleString()} 
          trend="SYNCED" 
          theme={theme} 
        />
        <StatCard 
          title="Customers" 
          value={(data?.totalCustomers || 0).toLocaleString()} 
          trend="ACTIVE" 
          theme={theme} 
        />
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
        
        {data?.recentActivity?.length > 0 ? (
          data.recentActivity.map((op, index) => (
            <div key={op.id || index} style={{ ...rowStyle, borderBottom: index === data.recentActivity.length - 1 ? "none" : `1px solid ${theme.border}` }}>
              <span style={{ color: "#58a6ff" }}>#ORD-{op.id}</span>
              <span style={{ color: theme.text }}>{op.event || "New Order"}</span>
              <span>${(op.amount || 0).toFixed(2)}</span>
              <span style={{ color: "#3fb950", textAlign: "right", fontWeight: "bold" }}>{op.time || "Just now"}</span>
            </div>
          ))
        ) : (
          <p style={{ color: theme.subtext, fontSize: "12px", fontFamily: "monospace" }}>NO_DATA_SYNCED: Awaiting telemetry...</p>
        )}
      </div>
    </div>
  );
}