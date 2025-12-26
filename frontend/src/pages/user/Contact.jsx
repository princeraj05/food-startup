// ================= FRONTEND =================
// ✅ src/pages/user/Contact.jsx
// (PROFESSIONAL UI + HOVER + TRANSITION)

import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [msg, setMsg] = useState("");
  const [contacts, setContacts] = useState([]);
  const [hoverId, setHoverId] = useState(null);

  useEffect(() => {
    loadMyContacts();
  }, []);

  const loadMyContacts = async () => {
    const token = await getToken();
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/contact/my", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setContacts(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getToken();
    if (!token) return alert("Login required");

    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMsg(data.message);

    if (data.success) {
      setForm({ name: "", email: "", message: "" });
      loadMyContacts();
    }
  };

  return (
    <div style={page}>
      <h2 style={title}>📩 Contact Support</h2>
      <p style={subtitle}>
        Send us your query and track admin replies below
      </p>

      {msg && <p style={success}>{msg}</p>}

      {/* CONTACT FORM */}
      <form onSubmit={handleSubmit} style={card}>
        <input
          style={input}
          placeholder="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          style={input}
          placeholder="Your Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          style={{ ...input, height: 120, resize: "vertical" }}
          placeholder="Your Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button style={btn}>Send Message</button>
      </form>

      {/* ADMIN REPLY SECTION */}
      <h3 style={sectionTitle}>📨 Your Messages</h3>

      {contacts.map((c) => (
        <div
          key={c._id}
          style={{
            ...msgCard,
            transform:
              hoverId === c._id ? "translateY(-4px)" : "translateY(0)",
            boxShadow:
              hoverId === c._id
                ? "0 18px 35px rgba(0,0,0,0.15)"
                : msgCard.boxShadow,
          }}
          onMouseEnter={() => setHoverId(c._id)}
          onMouseLeave={() => setHoverId(null)}
        >
          <p style={userMsg}>
            <b>You:</b> {c.message}
          </p>

          {c.reply ? (
            <div style={replyBox}>
              <p style={replyLabel}>Admin Reply</p>
              <p style={replyText}>{c.reply}</p>
            </div>
          ) : (
            <p style={pending}>⏳ Waiting for admin reply</p>
          )}
        </div>
      ))}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  maxWidth: 750,
};

const title = {
  fontSize: 24,
  fontWeight: 800,
  color: "#0f172a",
};

const subtitle = {
  marginBottom: 20,
  color: "#64748b",
};

const success = {
  color: "#16a34a",
  fontWeight: 600,
};

const card = {
  marginTop: 20,
  padding: 26,
  background: "linear-gradient(180deg,#ffffff,#f8fafc)",
  borderRadius: 18,
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  transition: "all 0.3s ease",
};

const input = {
  width: "100%",
  padding: 13,
  marginBottom: 14,
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  fontSize: 14,
  outline: "none",
};

const btn = {
  width: "100%",
  padding: 15,
  borderRadius: 14,
  border: "none",
  background: "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const sectionTitle = {
  marginTop: 36,
  fontSize: 18,
  fontWeight: 700,
  color: "#020617",
};

const msgCard = {
  marginTop: 16,
  padding: 18,
  background: "#ffffff",
  borderRadius: 16,
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
};

const userMsg = {
  fontSize: 14,
  color: "#0f172a",
};

const replyBox = {
  marginTop: 10,
  padding: 14,
  borderRadius: 12,
  background: "#ecfdf5",
  border: "1px solid #86efac",
};

const replyLabel = {
  fontSize: 12,
  fontWeight: 700,
  color: "#166534",
  marginBottom: 4,
};

const replyText = {
  fontSize: 14,
  color: "#065f46",
};

const pending = {
  marginTop: 8,
  color: "#94a3b8",
  fontSize: 13,
};
