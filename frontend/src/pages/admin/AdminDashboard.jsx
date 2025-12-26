// ================= FRONTEND =================
// ✅ src/pages/admin/AdminDashboard.jsx (ONLY UI / STYLING UPDATED)

import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    foods: 0,
    revenue: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const token = await getToken();
    const res = await fetch("http://localhost:5000/api/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setStats(data);
  };

  return (
    <div style={page}>
      <h1 style={title}>👨‍💼 Admin Dashboard</h1>
      <p style={subtitle}>Overview of your food startup</p>

      <div style={grid}>
        <StatCard title="Users" value={stats.users} color="#2563eb" />
        <StatCard title="Orders" value={stats.orders} color="#f97316" />
        <StatCard title="Foods" value={stats.foods} color="#16a34a" />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} color="#9333ea" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div style={{ ...card, borderLeft: `6px solid ${color}` }}>
      <p style={cardTitle}>{title}</p>
      <h2 style={cardValue}>{value}</h2>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: 40,
  background: "#f1f5f9",
  minHeight: "100vh",
};

const title = {
  marginBottom: 6,
  color: "#0f172a",
};

const subtitle = {
  color: "#475569",
  marginBottom: 30,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};

const card = {
  background: "#ffffff",
  padding: 28,
  borderRadius: 18,
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 10px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
};

const cardTitle = {
  margin: 0,
  fontSize: 14,
  fontWeight: 600,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

const cardValue = {
  marginTop: 10,
  fontSize: 32,
  fontWeight: 700,
  color: "#0f172a",
};
