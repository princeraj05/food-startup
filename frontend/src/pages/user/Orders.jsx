// ================= FRONTEND =================
// ✅ src/pages/user/Orders.jsx (ONLY UI / STYLING UPDATED)

import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
    const t = setInterval(loadOrders, 1000);
    return () => clearInterval(t);
  }, []);

  const loadOrders = async () => {
    const token = await getToken();
    const res = await fetch("http://localhost:5000/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(await res.json());
  };

  const remaining = (o) => {
    if (o.status === "Delivered") return "Delivered";
    if (!o.etaMinutes || !o.etaSetAt) return "Not Set";

    const diff =
      o.etaMinutes * 60000 -
      (Date.now() - new Date(o.etaSetAt).getTime());

    if (diff <= 0) return "Arriving";

    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${m}m ${s}s`;
  };

  const badgeColor = (status) =>
    ({
      Delivered: "#16a34a",
      Pending: "#f97316",
      Preparing: "#2563eb",
    }[status]);

  return (
    <div style={page}>
      <h1 style={title}>📦 My Orders</h1>

      {orders.map((o) => (
        <div key={o._id} style={card}>
          {/* HEADER */}
          <div style={top}>
            <h3 style={{ margin: 0 }}>Order #{o._id.slice(-6)}</h3>
            <span
              style={{
                ...badge,
                background: badgeColor(o.status),
              }}
            >
              {o.status}
            </span>
          </div>

          <p style={eta}>
            ⏱ ETA: <b>{remaining(o)}</b>
          </p>

          {/* ITEMS */}
          <div style={itemsBox}>
            {o.items.map((i, idx) => (
              <div key={idx} style={row}>
                <img
                  src={`http://localhost:5000/uploads/${i.image}`}
                  alt={i.name}
                  style={img}
                  onError={(e) => (e.target.style.display = "none")}
                />
                <span style={{ flex: 1 }}>
                  {i.name} × {i.qty}
                </span>
                <b>₹{i.price * i.qty}</b>
              </div>
            ))}
          </div>

          <h3 style={total}>Total ₹{o.total}</h3>
        </div>
      ))}
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
  marginBottom: 30,
  color: "#0f172a",
};

const card = {
  background: "#ffffff",
  padding: 24,
  borderRadius: 18,
  marginBottom: 24,
  maxWidth: 900,
  boxShadow:
    "rgba(0, 0, 0, 0.12) 0px 10px 25px, rgba(0, 0, 0, 0.06) 0px 5px 10px",
};

const top = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};

const badge = {
  padding: "6px 16px",
  borderRadius: 20,
  color: "#fff",
  fontWeight: 600,
  fontSize: 14,
};

const eta = {
  margin: "8px 0 16px",
  color: "#0f172a",
};

const itemsBox = {
  borderTop: "1px solid #e5e7eb",
  paddingTop: 12,
};

const row = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 8,
};

const img = {
  width: 56,
  height: 56,
  borderRadius: 10,
  objectFit: "cover",
};

const total = {
  marginTop: 12,
  textAlign: "right",
  color: "#14532d",
};
