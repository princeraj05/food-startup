// ================= FRONTEND =================
// ✅ src/pages/user/UserLayout.jsx
// (NAME NOW COMES FROM BACKEND – REGISTERED NAME)

import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function UserLayout() {
  const [name, setName] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = await getToken();
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setName(data.name);
  };

  return (
    <div style={layout}>
      <aside style={sidebar}>
        <h2 style={brand}>🍔 Food Startup</h2>

        <nav style={nav}>
          <HoverLink to="/user">🏠 Dashboard</HoverLink>
          <HoverLink to="/user/menu">🍽️ Menu</HoverLink>
          <HoverLink to="/user/cart">🛒 Cart</HoverLink>
          <HoverLink to="/user/orders">📦 My Orders</HoverLink>
          <HoverLink to="/user/profile">👤 Profile</HoverLink>
          <HoverLink to="/user/contact">📞 Contact</HoverLink>
          <HoverLogout to="/login">🚪 Logout</HoverLogout>
        </nav>
      </aside>

      <main style={main}>
        <div style={pageCard}>
          <h2 style={welcome}>
            Welcome, <span style={nameStyle}>{name}</span> 👋
          </h2>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function HoverLink({ to, children }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={to}
      style={{
        ...navLink,
        background: hover
          ? "linear-gradient(135deg,#22c55e,#16a34a)"
          : "transparent",
        color: hover ? "#fff" : "#e5e7eb",
        transform: hover ? "translateX(8px)" : "translateX(0)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
}

function HoverLogout({ to, children }) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={to}
      style={{
        ...logout,
        background: hover
          ? "linear-gradient(135deg,#ef4444,#b91c1c)"
          : "transparent",
        color: hover ? "#fff" : "#fecaca",
        transform: hover ? "translateX(8px)" : "translateX(0)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
}

/* ===== STYLES ===== */

const layout = {
  display: "flex",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#f0fdf4,#ecfeff,#eef2ff)",
};

const sidebar = {
  width: 270,
  padding: "26px 22px",
  background: "linear-gradient(180deg,#020617,#0f172a)",
  color: "#fff",
};

const brand = {
  marginBottom: 40,
  fontSize: 22,
  fontWeight: 800,
  background: "linear-gradient(90deg,#22c55e,#38bdf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const nav = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const navLink = {
  textDecoration: "none",
  padding: "13px 18px",
  borderRadius: 14,
  fontSize: 15,
  transition: "all 0.25s ease",
};

const logout = {
  marginTop: "auto",
  padding: "14px 18px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 700,
  transition: "all 0.25s ease",
};

const main = {
  flex: 1,
  padding: 30,
};

const pageCard = {
  background: "linear-gradient(180deg,#ffffff,#f8fafc)",
  borderRadius: 22,
  padding: 32,
};

const welcome = {
  marginBottom: 20,
  color: "#0f172a",
};

const nameStyle = {
  color: "#16a34a",
  fontWeight: 700,
};
