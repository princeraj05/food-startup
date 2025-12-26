// ================= FRONTEND =================
// ✅ src/pages/common/About.jsx
// (PROFESSIONAL ABOUT PAGE – INLINE STYLES + ANIMATIONS)

import { useEffect, useState } from "react";

export default function About() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div style={page}>
      <div
        style={{
          ...card,
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.9s ease",
        }}
      >
        <h2 style={title}>
          About <span style={brand}>FoodStartup</span> 🍔
        </h2>

        <p style={subtitle}>
          Delivering happiness through food
        </p>

        <p style={text}>
          FoodStartup is a modern online food ordering platform built to
          connect hungry customers with delicious meals. We focus on quality,
          speed, and customer satisfaction, making food delivery simple,
          reliable, and enjoyable.
        </p>

        {/* VALUES */}
        <div style={values}>
          <Value
            title="🥗 Quality First"
            text="Fresh ingredients & hygienic preparation"
          />
          <Value
            title="🚀 Fast Service"
            text="Quick delivery with real-time tracking"
          />
          <Value
            title="❤️ Customer Trust"
            text="Thousands of happy food lovers"
          />
        </div>

        {/* FOOTER TEXT */}
        <p style={footerText}>
          Our mission is to bring great food to your doorstep with
          transparency, reliability, and care.
        </p>
      </div>
    </div>
  );
}

/* ===== VALUE CARD ===== */

function Value({ title, text }) {
  return (
    <div
      style={valueCard}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "rgba(0,0,0,0.18) 0px 20px 40px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "rgba(0,0,0,0.12) 0px 12px 25px";
      }}
    >
      <h4 style={valueTitle}>{title}</h4>
      <p style={valueText}>{text}</p>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "calc(100vh - 120px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg,#f0fdf4,#ecfeff,#eef2ff)",
  padding: 30,
};

const card = {
  background: "#ffffff",
  padding: "60px 50px",
  borderRadius: 24,
  textAlign: "center",
  width: "100%",
  maxWidth: 900,
  boxShadow:
    "rgba(0,0,0,0.14) 0px 30px 60px, rgba(0,0,0,0.08) 0px 12px 30px",
};

const title = {
  fontSize: 32,
  marginBottom: 10,
  color: "#0f172a",
};

const brand = {
  background: "linear-gradient(90deg,#22c55e,#38bdf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 900,
};

const subtitle = {
  fontSize: 16,
  color: "#16a34a",
  fontWeight: 600,
  marginBottom: 24,
};

const text = {
  fontSize: 15,
  color: "#475569",
  maxWidth: 700,
  margin: "0 auto 40px",
  lineHeight: 1.6,
};

const values = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 24,
  marginBottom: 40,
};

const valueCard = {
  padding: 26,
  borderRadius: 18,
  background: "#f8fafc",
  transition: "all 0.35s ease",
  boxShadow:
    "rgba(0,0,0,0.12) 0px 12px 25px",
};

const valueTitle = {
  marginBottom: 10,
  fontSize: 18,
  color: "#0f172a",
};

const valueText = {
  fontSize: 14,
  color: "#64748b",
};

const footerText = {
  fontSize: 14,
  color: "#64748b",
};
