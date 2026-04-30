import React from 'react';
import DataTable from "../components/DataTable";

const ORDER_COLUMNS = [
  { header: "ORDER ID", accessor: "id" },
  { header: "CUSTOMER", accessor: "customer" },
  { header: "PRODUCT", accessor: "product" },
  { header: "AMOUNT", accessor: "amount" },
  { header: "STATUS", accessor: "status" },
];

const ORDER_DATA = [
  { id: "#1042", customer: "Sarah K.", product: "Wireless Mouse", amount: "$124.00", status: "Completed" },
  { id: "#1041", customer: "James O.", product: "Mechanical Keyboard", amount: "$89.50", status: "Pending" },
  { id: "#1040", customer: "Alex M.", product: "USB-C Cable", amount: "$15.00", status: "Shipped" },
  { id: "#1039", customer: "Jordan B.", product: "Monitor Stand", amount: "$45.00", status: "Completed" },
  { id: "#1038", customer: "Casey W.", product: "Desk Mat", amount: "$25.00", status: "Cancelled" },
];

export default function Orders({ theme }) {
  // --- ADD THIS GUARD HERE ---
  // If theme hasn't loaded yet, show nothing instead of crashing
  if (!theme) return <div style={{ color: 'white' }}>Loading System...</div>;

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      <div style={headerSectionStyle}>
        <h2 style={{ ...titleStyle, color: theme.text }}>Order History</h2>
        <button style={exportButtonStyle(theme)}>Export CSV</button>
      </div>

      <DataTable 
        columns={ORDER_COLUMNS} 
        data={ORDER_DATA} 
        theme={theme} 
      />
    </div>
  );
}

// --- Industrial Themed Styles ---
const headerSectionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px"
};

const titleStyle = {
  fontSize: "22px",
  fontWeight: "600",
  margin: 0
};

const exportButtonStyle = (theme) => ({
  backgroundColor: "transparent",
  border: `1px solid ${theme?.border || "#333"}`, // Added safety here too
  color: theme?.text || "#fff",
  padding: "8px 16px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
  fontFamily: "monospace",
  transition: "all 0.2s"
});