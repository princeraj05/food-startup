// ================= FRONTEND =================
// ✅ src/pages/user/Menu.jsx (SEARCH FEATURE ADDED – UI SAME)

import { useEffect, useState } from "react";

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState(""); // 🔍 NEW

  useEffect(() => {
    fetch("http://localhost:5000/api/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  // 🔍 FILTER LOGIC (NEW)
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase()) ||
    food.description.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (food) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === food._id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        _id: food._id,
        name: food.name,
        price: food.price,
        image: food.image,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div style={page}>
      <h1 style={title}>🍽 Our Menu</h1>

      {/* 🔍 SEARCH BOX (NEW FEATURE) */}
      <input
        type="text"
        placeholder="🔍 Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchBox}
      />

      <div style={grid}>
        {filteredFoods.length === 0 ? (
          <p>No food found</p>
        ) : (
          filteredFoods.map((food) => (
            <div key={food._id} style={card}>
              <img
                src={`http://localhost:5000/uploads/${food.image}`}
                alt={food.name}
                style={img}
              />

              <div style={content}>
                <h3 style={name}>{food.name}</h3>
                <p style={desc}>{food.description}</p>

                <div style={bottom}>
                  <span style={price}>₹{food.price}</span>
                  <button style={btn} onClick={() => addToCart(food)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
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
  marginBottom: 20,
  color: "#0f172a",
};

/* 🔍 SEARCH BOX STYLE (MINIMAL – UI SAME) */
const searchBox = {
  width: "100%",
  maxWidth: 350,
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  marginBottom: 30,
  fontSize: 15,
  outline: "none",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};

const card = {
  background: "#ffffff",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow:
    "rgba(0, 0, 0, 0.12) 0px 10px 25px, rgba(0, 0, 0, 0.06) 0px 5px 10px",
  display: "flex",
  flexDirection: "column",
};

const img = {
  width: "100%",
  height: 160,
  objectFit: "cover",
};

const content = {
  padding: 16,
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const name = {
  margin: "0 0 6px",
  color: "#0f172a",
};

const desc = {
  flex: 1,
  fontSize: 14,
  color: "#64748b",
  marginBottom: 12,
};

const bottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const price = {
  fontSize: 16,
  fontWeight: 700,
  color: "#14532d",
};

const btn = {
  padding: "8px 14px",
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  background: "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#ffffff",
};
