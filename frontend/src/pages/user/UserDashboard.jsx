// ================= FRONTEND =================
// ✅ src/pages/user/UserDashboard.jsx
// (PRO UI + SMOOTH ANIMATIONS – LOGIC SAME)

import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false); // 🔥 page appearance

  useEffect(() => {
    loadOrders();
    setTimeout(() => setShow(true), 100); // smooth entry
  }, []);

  const loadOrders = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === "Pending").length;
  const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
  const recentOrders = orders.slice(0, 5);

  if (loading) return <p style={{ padding: 40 }}>Loading dashboard...</p>;

  return (
    <div
      style={{
        ...page,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease",
      }}
    >
      <h1 style={title}>📊 My Dashboard</h1>
      <p style={subtitle}>Quick overview of your orders</p>

      {/* STATS */}
      <div style={statsGrid}>
        <StatCard title="Total Orders" value={totalOrders} color="#38bdf8" />
        <StatCard title="Pending" value={pendingOrders} color="#facc15" />
        <StatCard title="Delivered" value={deliveredOrders} color="#4ade80" />
      </div>

      {/* RECENT ORDERS */}
      <div style={card}>
        <h3 style={{ marginBottom: 16 }}>🧾 Recent Orders</h3>

        {recentOrders.length === 0 ? (
          <p style={{ color: "#64748b" }}>No orders yet</p>
        ) : (
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Order ID</th>
                <th style={th}>Items</th>
                <th style={th}>Status</th>
                <th style={th}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order._id} style={row}>
                  <td style={td}>#{order._id.slice(-6)}</td>
                  <td style={td}>
                    {order.items.map(i => i.name).join(", ")}
                  </td>
                  <td
                    style={{
                      ...td,
                      fontWeight: 700,
                      color:
                        order.status === "Delivered"
                          ? "#16a34a"
                          : "#f97316",
                    }}
                  >
                    {order.status}
                  </td>
                  <td style={{ ...td, fontWeight: 700 }}>
                    ₹{order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        ...statCard,
        borderLeft: `6px solid ${color}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "rgba(0,0,0,0.18) 0px 20px 40px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "rgba(0,0,0,0.12) 0px 18px 30px";
      }}
    >
      <p style={statTitle}>{title}</p>
      <h2 style={statValue}>{value}</h2>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  padding: 40,
  background: "#f1f5f9",
};

const title = {
  marginBottom: 6,
  color: "#0f172a",
};

const subtitle = {
  marginBottom: 28,
  color: "#64748b",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
  marginBottom: 36,
};

const statCard = {
  background: "#ffffff",
  padding: 26,
  borderRadius: 18,
  transition: "all 0.35s ease",
  boxShadow:
    "rgba(0,0,0,0.12) 0px 18px 30px",
};

const statTitle = {
  color: "#64748b",
  fontWeight: 600,
  marginBottom: 8,
};

const statValue = {
  fontSize: 30,
  color: "#0f172a",
};

const card = {
  background: "#ffffff",
  padding: 28,
  borderRadius: 18,
  boxShadow:
    "rgba(0,0,0,0.12) 0px 18px 30px",
  transition: "all 0.4s ease",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  padding: "14px",
  textAlign: "left",
  background: "#f8fafc",
  color: "#334155",
  fontWeight: 700,
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #e5e7eb",
  color: "#0f172a",
};

const row = {
  transition: "background 0.25s ease",
};
