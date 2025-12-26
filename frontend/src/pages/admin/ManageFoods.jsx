// ================= FRONTEND =================
// ✅ src/pages/admin/ManageFoods.jsx (ONLY UI / STYLING UPDATED)

import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    const res = await fetch("http://localhost:5000/api/foods");
    const data = await res.json();
    setFoods(data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addFood = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.description || !form.image) {
      return alert("All fields required");
    }

    const token = await getToken();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("description", form.description);
    fd.append("image", form.image);

    await fetch("http://localhost:5000/api/foods", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });

    setForm({ name: "", price: "", description: "", image: null });
    loadFoods();
  };

  const deleteFood = async (id) => {
    const token = await getToken();
    if (!window.confirm("Delete this food?")) return;

    await fetch(`http://localhost:5000/api/foods/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadFoods();
  };

  return (
    <div style={page}>
      <h1 style={title}>🍔 Manage Foods</h1>

      {/* ADD FOOD */}
      <form style={card} onSubmit={addFood}>
        <h3 style={cardTitle}>Add New Food</h3>

        <input
          style={input}
          name="name"
          placeholder="Food name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          style={input}
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <textarea
          style={{ ...input, height: 80 }}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input style={input} name="image" type="file" onChange={handleChange} />

        <button style={btn} type="submit">
          ➕ Add Food
        </button>
      </form>

      {/* FOOD LIST */}
      <div style={list}>
        {foods.map((f) => (
          <div key={f._id} style={row}>
            <img
              src={`http://localhost:5000/uploads/${f.image}`}
              alt={f.name}
              style={img}
            />

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{f.name}</h3>
              <p style={{ margin: "6px 0", color: "#475569" }}>
                {f.description}
              </p>
              <b style={{ color: "#14532d" }}>₹{f.price}</b>
            </div>

            <button style={delBtn} onClick={() => deleteFood(f._id)}>
              ❌ Delete
            </button>
          </div>
        ))}
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
  marginBottom: 30,
  color: "#0f172a",
};

const card = {
  background: "#ffffff",
  padding: 24,
  borderRadius: 18,
  maxWidth: 420,
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 10px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
};

const cardTitle = {
  marginBottom: 16,
  color: "#14532d",
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  fontSize: 14,
};

const btn = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  background: "#16a34a",
  color: "#ffffff",
};

const list = {
  marginTop: 40,
  maxWidth: 900,
};

const row = {
  display: "flex",
  gap: 16,
  alignItems: "center",
  marginBottom: 20,
  background: "#ffffff",
  padding: 18,
  borderRadius: 18,
  boxShadow:
    "rgba(0, 0, 0, 0.08) 0px 8px 20px, rgba(0, 0, 0, 0.04) 0px 4px 10px",
};

const img = {
  width: 90,
  height: 90,
  borderRadius: 14,
  objectFit: "cover",
};

const delBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
};
