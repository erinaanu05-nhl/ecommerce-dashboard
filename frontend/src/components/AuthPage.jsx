import { useState } from "react";

export default function AuthPage({ onLogin, theme }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Since the backend has no login route yet, we simulate a success
    const userData = {
      email: email,
      name: isLogin ? email.split('@')[0] : name 
    };

    console.log("Simulating login for now since backend routes are missing...");
    onLogin(userData); 
  };

  return (
    <div style={{...containerStyle, backgroundColor: theme.bg, color: theme.text}}>
      <div style={{...cardStyle, border: `1px solid ${theme.border}`, backgroundColor: theme.cardBg || 'rgba(255,255,255,0.05)'}}>
        <h2 style={{ marginBottom: "8px", fontSize: "24px" }}>
          {isLogin ? "Sign In" : "Create Account"}
        </h2>
        <p style={{ color: theme.subtext, fontSize: "14px", marginBottom: "24px" }}>
          (Developer Mode: Bypass Login enabled)
        </p>

        <form onSubmit={handleSubmit} style={formStyle}>
          {!isLogin && (
            <>
              <label style={labelStyle}>Full Name</label>
              <input 
                type="text" 
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
            required 
            style={{...inputStyle, backgroundColor: theme.bg, color: theme.text, borderColor: theme.border}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={labelStyle}>Password</label>
          <input 
            type="password" 
            required 
            style={{...inputStyle, backgroundColor: theme.bg, color: theme.text, borderColor: theme.border}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" style={{...btnStyle, backgroundColor: theme.accent}}>
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} style={{...toggleBtnStyle, color: theme.accent}}>
          {isLogin ? "New here? Create an account" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

const containerStyle = { height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" };
const cardStyle = { width: "100%", maxWidth: "400px", padding: "40px", borderRadius: "16px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" };
const formStyle = { display: "flex", flexDirection: "column", textAlign: "left" };
const labelStyle = { fontSize: "12px", fontWeight: "600", marginBottom: "8px", textTransform: "uppercase" };
const inputStyle = { padding: "12px", borderRadius: "8px", border: "1px solid", marginBottom: "20px", outline: "none" };
const btnStyle = { padding: "14px", border: "none", borderRadius: "8px", color: "white", fontWeight: "600", cursor: "pointer", marginTop: "10px" };
const toggleBtnStyle = { background: "none", border: "none", marginTop: "24px", cursor: "pointer", fontSize: "14px" };