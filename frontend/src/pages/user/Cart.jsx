// ================= FRONTEND =================
// ✅ src/pages/user/Cart.jsx (ONLY UI / STYLING UPDATED)

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const updateQty = (id, type) => {
    const updated = cart.map((item) =>
      item._id === id
        ? { ...item, qty: type === "inc" ? item.qty + 1 : Math.max(1, item.qty - 1) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={page}>
      <h1 style={title}>🛒 My Cart</h1>

      {cart.length === 0 && <p style={empty}>No items in cart</p>}

      {cart.map((item) => (
        <div key={item._id} style={card}>
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.name}
            style={img}
          />

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
            <p style={price}>₹{item.price}</p>

            <div style={qtyBox}>
              <button style={qtyBtn} onClick={() => updateQty(item._id, "dec")}>
                −
              </button>
              <span style={qty}>{item.qty}</span>
              <button style={qtyBtn} onClick={() => updateQty(item._id, "inc")}>
                +
              </button>
            </div>
          </div>

          <button onClick={() => removeItem(item._id)} style={removeBtn}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={summary}>
          <h2 style={total}>Total: ₹{subtotal}</h2>
          <button
            onClick={() => navigate("/user/checkout")}
            style={checkoutBtn}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: 40,
  maxWidth: 900,
  margin: "auto",
  background: "#f1f5f9",
  minHeight: "100vh",
};

const title = {
  marginBottom: 24,
  color: "#0f172a",
};

const empty = {
  color: "#64748b",
};

const card = {
  display: "flex",
  alignItems: "center",
  gap: 20,
  background: "#ffffff",
  padding: 20,
  borderRadius: 18,
  boxShadow:
    "rgba(0, 0, 0, 0.08) 0px 10px 25px, rgba(0, 0, 0, 0.04) 0px 5px 10px",
  marginBottom: 16,
};

const img = {
  width: 100,
  height: 100,
  objectFit: "cover",
  borderRadius: 14,
};

const price = {
  margin: "6px 0",
  color: "#475569",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 6,
};

const qtyBtn = {
  width: 32,
  height: 32,
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  background: "#f8fafc",
  cursor: "pointer",
  fontWeight: 700,
};

const qty = {
  minWidth: 20,
  textAlign: "center",
  fontWeight: 600,
};

const removeBtn = {
  border: "none",
  background: "transparent",
  color: "#ef4444",
  cursor: "pointer",
  fontWeight: 600,
};

const summary = {
  marginTop: 24,
  paddingTop: 16,
  borderTop: "1px solid #e5e7eb",
};

const total = {
  marginBottom: 16,
  color: "#14532d",
};

const checkoutBtn = {
  width: "100%",
  padding: 16,
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(90deg,#22c55e,#16a34a)",
  color: "#ffffff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};
