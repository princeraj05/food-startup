// ================= FRONTEND =================
// ✅ src/pages/admin/AdminLayout.jsx (HOVER + UI IMPROVED)

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    loadAdmin();
  }, []);

  const loadAdmin = async () => {
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
      {/* SIDEBAR */}
      <aside style={sidebar}>
        <h2 style={brand}>🍔 Food Startup</h2>

        <div style={adminBox}>
          👨‍💼 <span style={adminName}>{name || "Admin"}</span>
        </div>

        <nav style={nav}>
          <NavItem to="/admin" end>🏠 Dashboard</NavItem>
          <NavItem to="/admin/foods">🍔 Manage Foods</NavItem>
          <NavItem to="/admin/orders">📦 Manage Orders</NavItem>
          <NavItem to="/admin/users">👥 Manage Users</NavItem>
          <NavItem to="/admin/contacts">📩 User Contacts</NavItem>
        </nav>

        <button
          style={logoutBtn}
          onMouseEnter={(e) => (e.target.style.boxShadow = dangerShadow)}
          onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
          onClick={() => navigate("/login")}
        >
          🚪 Logout
        </button>
      </aside>

      {/* MAIN */}
      <main style={main}>
        <div style={pageCard}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/* ================= COMPONENT ================= */

function NavItem({ to, end, children }) {
  const [hover, setHover] = useState(false);

  return (
    <NavLink
      to={to}
      end={end}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={({ isActive }) => ({
        ...navLink,
        background: isActive
          ? "linear-gradient(135deg,#22c55e,#16a34a)"
          : hover
          ? "rgba(255,255,255,0.08)"
          : "transparent",
        boxShadow: hover
          ? "rgba(0,0,0,0.35) 0px 8px 20px"
          : "none",
        transform: hover ? "translateX(4px)" : "none",
        color: isActive ? "#fff" : "#e5e7eb",
      })}
    >
      {children}
    </NavLink>
  );
}

/* ================= STYLES ================= */

const layout = {
  display: "flex",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#f0fdf4,#ecfeff,#eef2ff)",
};

const sidebar = {
  width: 280,
  padding: "26px 22px",
  background: "linear-gradient(180deg,#020617,#0f172a)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  boxShadow: "rgba(0,0,0,0.45) 6px 0px 30px",
};

const brand = {
  fontSize: 22,
  fontWeight: 800,
  marginBottom: 24,
  background: "linear-gradient(90deg,#22c55e,#38bdf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const adminBox = {
  marginBottom: 32,
  padding: "14px 16px",
  borderRadius: 16,
  background: "rgba(255,255,255,0.08)",
  boxShadow: "rgba(0,0,0,0.35) 0px 10px 25px",
};

const adminName = {
  fontWeight: 700,
  color: "#a7f3d0",
};

const nav = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const navLink = {
  textDecoration: "none",
  padding: "13px 16px",
  borderRadius: 16,
  fontSize: 15,
  transition: "all 0.25s ease",
};

const logoutBtn = {
  marginTop: "auto",
  padding: "14px",
  borderRadius: 18,
  border: "none",
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 700,
  color: "#fff",
  background: "linear-gradient(135deg,#ef4444,#b91c1c)",
  transition: "all 0.25s ease",
};

const dangerShadow =
  "rgba(239,68,68,0.6) 0px 10px 25px";

const main = {
  flex: 1,
  padding: 30,
};

const pageCard = {
  background: "linear-gradient(180deg,#ffffff,#f8fafc)",
  borderRadius: 22,
  padding: 32,
  minHeight: "100%",
  boxShadow: "rgba(0,0,0,0.12) 0px 15px 35px",
};
