import React, { useState } from 'react';

const MOCK_PRODUCTS = [
  { id: 1, sku: "PRO-HOD-01", name: "Premium Hoodie", price: "$59.99", stock: 12, category: "Apparel" },
  { id: 2, sku: "PRO-JNS-02", name: "Designer Jeans", price: "$89.00", stock: 4, category: "Apparel" },
  { id: 3, sku: "PRO-WCH-03", name: "Minimalist Watch", price: "$150.00", stock: 8, category: "Accessories" },
  { id: 4, sku: "PRO-BTS-04", name: "Leather Boots", price: "$120.00", stock: 2, category: "Footwear" },
];

export default function Inventory({ theme }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Safety Guard
  if (!theme) return null;

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      {/* HEADER SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ color: theme.text, fontSize: "22px", fontWeight: "600", margin: 0 }}>Inventory Management</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={primaryBtnStyle(theme)}
        >
          Add New SKU
        </button>
      </div>

      {/* SEARCH BAR */}
      <div style={{ marginBottom: "20px" }}>
        <input 
          type="text"
          placeholder="Filter by SKU or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle(theme)}
        />
      </div>
      
      {/* PRODUCT GRID */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
        gap: "16px" 
      }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={productCardStyle(theme)}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={skuStyle(theme)}>{product.sku}</span>
              <span style={categoryStyle(theme)}>{product.category}</span>
            </div>

            <h3 style={{ color: theme.text, fontSize: "16px", fontWeight: "600", margin: "0 0 4px 0" }}>
              {product.name}
            </h3>
            <p style={{ color: theme.subtext, fontSize: "14px", margin: "0 0 16px 0" }}>Unit Price: {product.price}</p>

            <div style={stockLevelContainer(theme)}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", color: theme.text }}>Stock Level</span>
                <span style={{ 
                  fontSize: "12px", 
                  fontWeight: "bold", 
                  color: product.stock < 5 ? "#f85149" : theme.accent 
                }}>
                  {product.stock} Units
                </span>
              </div>
              <div style={progressBarBg(theme)}>
                <div style={progressBarFill(product.stock, theme)} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
              <button style={secondaryBtnStyle(theme)}>Adjust</button>
              <button style={secondaryBtnStyle(theme)}>History</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div style={overlayStyle}>
          <div style={modalStyle(theme)}>
            <h3 style={{ color: theme.text, marginTop: 0 }}>Register New SKU</h3>
            <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
              <div>
                <label style={labelStyle(theme)}>SKU IDENTIFIER</label>
                <input style={inputStyle(theme)} placeholder="e.g. PRO-HOD-05" />
              </div>
              <div>
                <label style={labelStyle(theme)}>INITIAL STOCK</label>
                <input type="number" style={inputStyle(theme)} placeholder="0" />
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
              <button onClick={() => setIsModalOpen(false)} style={secondaryBtnStyle(theme)}>Cancel</button>
              <button onClick={() => setIsModalOpen(false)} style={primaryBtnStyle(theme)}>Confirm Entry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Styles ---

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

const overlayStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 1000,
  backdropFilter: "blur(4px)"
};

const modalStyle = (theme) => ({
  backgroundColor: theme.card,
  border: `1px solid ${theme.border}`,
  padding: "32px", width: "100%", maxWidth: "400px", borderRadius: "4px"
});

const labelStyle = (theme) => ({
  display: "block", fontSize: "10px", fontWeight: "bold", color: theme.subtext,
  marginBottom: "8px", fontFamily: "monospace"
});

const inputStyle = (theme) => ({
  width: "100%", backgroundColor: theme.bg, border: `1px solid ${theme.border}`,
  borderRadius: "4px", padding: "10px", color: theme.text, outline: "none"
});

const productCardStyle = (theme) => ({
  backgroundColor: theme.card, padding: "20px", borderRadius: "4px", border: `1px solid ${theme.border}`
});

const skuStyle = (theme) => ({
  fontFamily: "monospace", fontSize: "10px", color: "#58a6ff",
  backgroundColor: "rgba(88, 166, 255, 0.1)", padding: "2px 6px", borderRadius: "2px"
});

const categoryStyle = (theme) => ({ fontSize: "10px", color: theme.subtext, textTransform: "uppercase" });

const stockLevelContainer = (theme) => ({
  backgroundColor: theme.bg, padding: "12px", borderRadius: "4px", border: `1px solid ${theme.border}`
});

const progressBarBg = (theme) => ({ width: "100%", height: "4px", backgroundColor: theme.border, borderRadius: "2px" });

const progressBarFill = (stock, theme) => ({
  width: `${Math.min((stock / 15) * 100, 100)}%`,
  height: "100%", backgroundColor: stock < 5 ? "#f85149" : theme.accent,
  transition: "width 0.5s ease"
});

const primaryBtnStyle = (theme) => ({
  backgroundColor: theme.accent, color: "white", border: "none",
  padding: "8px 16px", borderRadius: "4px", fontWeight: "600", cursor: "pointer"
});

const secondaryBtnStyle = (theme) => ({
  flex: 1, backgroundColor: "transparent", color: theme.text,
  border: `1px solid ${theme.border}`, padding: "8px", borderRadius: "4px", cursor: "pointer"
});