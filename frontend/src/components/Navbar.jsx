import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={nav}>
      <div style={logo}>🍔 FoodStartup</div>

      <div style={links}>
        <NavLink to="/" style={link}>Home</NavLink>
        <NavLink to="/about" style={link}>About</NavLink>
        <NavLink to="/contact" style={link}>Contact</NavLink>
        <NavLink to="/login" style={link}>Login</NavLink>
      </div>
    </nav>
  );
}

/* ================= STYLES ================= */

const nav = {
  height: 64,
  padding: "0 40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  background: "#f0f0f0",
  borderBottom: "1px solid #d4d4d4",

  /* 🔥 FIX GAP + STICKY */
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,

  /* 🔥 STRONG SHADOW */
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
};

const logo = {
  fontSize: 20,
  fontWeight: 700,
  color: "#111827",
};

const links = {
  display: "flex",
  gap: 24,
};

const link = ({ isActive }) => ({
  textDecoration: "none",
  color: "#374151",
  fontWeight: 500,
  padding: "8px 14px",
  borderRadius: 8,
  transition: "all 0.2s ease",

  background: isActive ? "#ffffff" : "transparent",
  boxShadow: isActive
    ? "0 6px 18px rgba(0,0,0,0.15)"
    : "none",
});
