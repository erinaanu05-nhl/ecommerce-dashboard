import { useState } from "react";

export default function AuthPage({ onLogin, theme }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Added name state

  const handleSubmit = (e) => {
  e.preventDefault();
  
  // Create an object with the data
  const userData = {
    email: email,
    name: isLogin ? email.split('@')[0] : name // if login, use part of email; if signup, use name
  };

  // PASS THE OBJECT HERE
  onLogin(userData); 
};
  return (
    <div style={{...containerStyle, backgroundColor: theme.bg, color: theme.text}}>
      <div style={{...cardStyle, border: `1px solid ${theme.border}`, backgroundColor: theme.cardBg || 'rgba(255,255,255,0.05)'}}>
        
        <h2 style={{ marginBottom: "8px", fontSize: "24px" }}>
          {isLogin ? "Sign In" : "Create Account"}
        </h2>
        
        <p style={{ color: theme.subtext, fontSize: "14px", marginBottom: "24px" }}>
          {isLogin ? "Welcome back to E-Dash" : "Start managing your inventory today"}
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          {/* PHASE 2: Only show Full Name if isLogin is FALSE (Sign Up mode) */}
          {!isLogin && (
            <>
              <label style={labelStyle}>Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                required 
                style={{...inputStyle, backgroundColor: theme.bg, color: theme.text, borderColor: theme.border}}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          )}

          <label style={labelStyle}>Email Address</label>
          <input 
            type="email" 
            placeholder="name@company.com"
            required 
            style={{...inputStyle, backgroundColor: theme.bg, color: theme.text, borderColor: theme.border}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={labelStyle}>Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            required 
            style={{...inputStyle, backgroundColor: theme.bg, color: theme.text, borderColor: theme.border}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            type="submit"
            style={{...btnStyle, backgroundColor: theme.accent}}
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          style={{...toggleBtnStyle, color: theme.accent}}
        >
          {isLogin ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

// Styles remain the same as your current file
const containerStyle = { height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" };
const cardStyle = { width: "100%", maxWidth: "400px", padding: "40px", borderRadius: "16px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" };
const formStyle = { display: "flex", flexDirection: "column", textAlign: "left" };
const labelStyle = { fontSize: "12px", fontWeight: "600", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" };
const inputStyle = { padding: "12px", borderRadius: "8px", border: "1px solid", marginBottom: "20px", outline: "none", transition: "border-color 0.2s" };
const btnStyle = { padding: "14px", border: "none", borderRadius: "8px", color: "white", fontWeight: "600", cursor: "pointer", marginTop: "10px", fontSize: "16px" };
const toggleBtnStyle = { background: "none", border: "none", marginTop: "24px", cursor: "pointer", fontSize: "14px", fontWeight: "500" };