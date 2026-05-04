import React from 'react';

export default function SalesChart() {
  // Mock path for a clean, professional growth line
  const pathData = "M 0 80 Q 150 70, 300 40 T 600 20 T 900 10";

  return (
    <div style={chartWrapper}>
      <svg viewBox="0 0 900 100" style={svgStyle}>
        {/* Grid Lines */}
        <line x1="0" y1="20" x2="900" y2="20" stroke="#21262d" strokeWidth="1" />
        <line x1="0" y1="50" x2="900" y2="50" stroke="#21262d" strokeWidth="1" />
        <line x1="0" y1="80" x2="900" y2="80" stroke="#21262d" strokeWidth="1" />
        
        {/* The Projection Line */}
        <path 
          d={pathData} 
          fill="none" 
          stroke="#238636" 
          strokeWidth="3" 
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 4px rgba(35, 134, 54, 0.4))" }}
        />
      </svg>
      <div style={labelsRow}>
        <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
      </div>
    </div>
  );
}

const chartWrapper = { width: "100%", paddingTop: "20px" };
const svgStyle = { width: "100%", height: "120px", overflow: "visible" };
const labelsRow = { 
  display: "flex", 
  justifyContent: "space-between", 
  color: "#484f58", 
  fontSize: "10px", 
  marginTop: "10px",
  fontFamily: "monospace" 
};