// ================= FRONTEND =================
// ✅ src/pages/admin/ManageOrders.jsx (ONLY UI / STYLING UPDATED)

import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [etaInput, setEtaInput] = useState({});

  useEffect(() => {
    loadOrders();
    const t = setInterval(loadOrders, 1000);
    return () => clearInterval(t);
  }, []);

  const loadOrders = async () => {
    const token = await getToken();
    const res = await fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(await res.json());
  };

  const setETA = async (id, status) => {
    const token = await getToken();
    await fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status,
        etaMinutes: Number(etaInput[id]) || 0,
      }),
    });
    setEtaInput({});
    loadOrders();
  };

  const remaining = (o) => {
    if (o.status === "Delivered") return "Delivered";
    if (!o.etaMinutes || !o.etaSetAt) return "Not Set";

    const diff =
      o.etaMinutes * 60000 -
      (Date.now() - new Date(o.etaSetAt).getTime());

    if (diff <= 0) return "Delivered Soon";

    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${m}m ${s}s`;
  };

  const badge = (status) =>
    ({
      Delivered: "#16a34a",
      Pending: "#f97316",
      Preparing: "#2563eb",
    }[status]);

  return (
    <div style={page}>
      <h1 style={title}>📦 Manage Orders</h1>

      {orders.map((o) => (
        <div key={o._id} style={card}>
          {/* HEADER */}
          <div style={top}>
            <h3 style={{ margin: 0 }}>Order #{o._id.slice(-6)}</h3>
            <select
              style={select}
              value={o.status}
              onChange={(e) => setETA(o._id, e.target.value)}
            >
              <option>Pending</option>
              <option>Preparing</option>
              <option>Delivered</option>
            </select>
          </div>

          {/* STATUS */}
          <span
            style={{
              ...statusBadge,
              background: badge(o.status),
            }}
          >
            {o.status}
          </span>

          <p style={text}>
            📍 <b>Address:</b> {o.address}
          </p>

          <p style={etaText}>
            ⏱ Remaining: <b>{remaining(o)}</b>
          </p>

          {/* ETA INPUT */}
          {o.status !== "Delivered" && (
            <div style={etaBox}>
              <input
                style={etaInputStyle}
                type="number"
                placeholder="ETA (minutes)"
                value={etaInput[o._id] || ""}
                onChange={(e) =>
                  setEtaInput({ ...etaInput, [o._id]: e.target.value })
                }
              />
              <button style={etaBtn} onClick={() => setETA(o._id, o.status)}>
                Set Time
              </button>
            </div>
          )}

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
    "rgba(0, 0, 0, 0.1) 0px 10px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
};

const top = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};

const select = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  fontWeight: 600,
};

const statusBadge = {
  display: "inline-block",
  padding: "6px 16px",
  borderRadius: 20,
  color: "#fff",
  fontWeight: 600,
  marginBottom: 10,
};

const text = {
  margin: "8px 0",
  color: "#334155",
};

const etaText = {
  margin: "6px 0 14px",
  color: "#0f172a",
};

const etaBox = {
  display: "flex",
  gap: 10,
  marginBottom: 16,
};

const etaInputStyle = {
  flex: 1,
  padding: 10,
  borderRadius: 10,
  border: "1px solid #cbd5e1",
};

const etaBtn = {
  padding: "10px 16px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 600,
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
  width: 60,
  height: 60,
  borderRadius: 10,
  objectFit: "cover",
};

const total = {
  marginTop: 12,
  textAlign: "right",
  color: "#14532d",
};
