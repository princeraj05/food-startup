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
    const res = await fetch("https://food-startup-1.onrender.com/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(await res.json());
  };

  const setETA = async (id, status) => {
    const token = await getToken();
    await fetch(`https://food-startup-1.onrender.com/api/orders/${id}/status`, {
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

          <div style={itemsBox}>
            {o.items.map((i, idx) => (
              <div key={idx} style={row}>
                <img
                  src={`https://food-startup-1.onrender.com/uploads/${i.image}`}
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
