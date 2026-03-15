import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = "https://food-startup-1.onrender.com"; // backend url

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(`${API}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

    } catch (err) {

      console.error(err);
      alert("Server error");

    }

  };

  return (

    <div style={page}>

      <form style={card} onSubmit={handleLogin}>

        <h2 style={title}>Login</h2>

        <input
          style={input}
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button style={btn} type="submit">
          Login
        </button>

        <p style={text}>
          New user? <Link to="/register">Register</Link>
        </p>

      </form>

    </div>

  );

}

/* styles */

const page={
  minHeight:"100vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  background:"#f1f5f9"
};

const card={
  width:360,
  padding:32,
  borderRadius:14,
  background:"#ffffff",
  boxShadow:"0 12px 30px rgba(0,0,0,0.15)"
};

const title={
  textAlign:"center",
  marginBottom:20
};

const input={
  width:"100%",
  padding:12,
  marginBottom:12,
  borderRadius:8,
  border:"1px solid #d1d5db"
};

const btn={
  width:"100%",
  padding:12,
  borderRadius:8,
  border:"none",
  cursor:"pointer",
  fontWeight:"bold",
  background:"#111827",
  color:"#fff"
};

const text={
  marginTop:12,
  textAlign:"center"
};