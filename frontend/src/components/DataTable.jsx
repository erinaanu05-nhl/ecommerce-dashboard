import React from 'react';

export default function DataTable({ columns, data, theme }) {
  // Simple helper to color-code status badges
  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === 'completed' || s === 'active' || s === 'success') return { color: "#3fb950", border: "1px solid rgba(63, 185, 80, 0.3)" };
    if (s === 'pending' || s === 'warn') return { color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.3)" };
    if (s === 'cancelled' || s === 'failed') return { color: "#f85149", border: "1px solid rgba(248, 81, 71, 0.3)" };
    return { color: "#58a6ff", border: "1px solid rgba(88, 166, 255, 0.3)" };
  };

  return (
    <div style={{ 
      width: "100%", 
      backgroundColor: theme.card, 
      borderRadius: "4px", // Industrial sharp corners
      border: `1px solid ${theme.border}`, 
      overflow: "hidden" 
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={thStyle(theme)}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={trStyle(theme, rowIndex === data.length - 1)}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={tdStyle(theme, col.accessor)}>
                  {col.accessor === 'status' ? (
                    <span style={{ ...badgeBase, ...getStatusStyle(row[col.accessor]) }}>
                      {row[col.accessor].toUpperCase()}
                    </span>
                  ) : (
                    row[col.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Dynamic Styles ---

const thStyle = (theme) => ({
  padding: "12px 16px",
  backgroundColor: theme.bg, // Sunken header look
  color: theme.subtext,
  fontWeight: "600",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  borderBottom: `1px solid ${theme.border}`
});

const tdStyle = (theme, accessor) => ({
  padding: "14px 16px",
  color: theme.text,
  borderBottom: `1px solid ${theme.border}`,
  fontFamily: accessor === 'id' || accessor === 'amount' ? "monospace" : "inherit"
});

const trStyle = (theme, isLast) => ({
  borderBottom: isLast ? "none" : `1px solid ${theme.border}`,
  backgroundColor: "transparent"
});

const badgeBase = {
  padding: "2px 8px",
  borderRadius: "2px",
  fontSize: "10px",
  fontWeight: "bold",
  display: "inline-block"
};