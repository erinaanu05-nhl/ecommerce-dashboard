import React, { useEffect } from 'react';

export default function Toast({ message, onClose, theme }) {
  // Check the console (F12) to see if this triggers!
  useEffect(() => {
    console.log("Toast Component Mounted!");
    const timer = setTimeout(onClose, 3000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!theme) return null;

  return (
    <>
      <style>
        {`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
      <div style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        borderRadius: "4px",
        display: "flex",
        width: "380px",
        minHeight: "80px",
        overflow: "hidden",
        zIndex: 99999, // Over everything
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        animation: "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}>
        <div style={{ width: "6px", backgroundColor: theme.accent }} />
        
        <div style={{ padding: "16px 20px", display: "flex", flex: 1, justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "10px", fontWeight: "bold", color: theme.subtext, fontFamily: "monospace" }}>
              SYSTEM NOTIFICATION
            </span>
            <span style={{ color: theme.text, fontSize: "15px" }}>{message}</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: theme.subtext, cursor: "pointer" }}>✕</button>
        </div>
      </div>
    </>
  );
}