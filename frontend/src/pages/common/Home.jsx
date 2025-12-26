// ================= FRONTEND =================
// ✅ src/pages/common/Home.jsx
// (PROFESSIONAL LANDING PAGE – LINKS + CTA)

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

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
        {/* TITLE */}
        <h1 style={title}>
          Welcome to <span style={brand}>FoodStartup</span> 🍕
        </h1>

        <p style={tagline}>
          Fresh food • Fast delivery • Trusted by customers
        </p>

        <p style={desc}>
          FoodStartup is a modern online food ordering platform.
          Enjoy hygienic meals, quick delivery, easy ordering,
          and real-time order tracking — all in one place.
        </p>

        {/* FEATURES */}
        <div style={features}>
          <Feature title="🍔 Quality Food" text="Fresh, hygienic & tasty meals" />
          <Feature title="⚡ Fast Delivery" text="On-time & reliable service" />
          <Feature title="📦 Easy Ordering" text="Smooth & secure checkout" />
        </div>

        {/* CTA BUTTONS */}
        <div style={ctaRow}>
          <button
            style={primaryBtn}
            onClick={() => navigate("/about")}
          >
            About Us
          </button>

          <button
            style={secondaryBtn}
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>
        </div>

        {/* GET STARTED BOX */}
        <div
          style={getStarted}
          onClick={() => navigate("/login")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow =
              "rgba(34,197,94,0.35) 0px 20px 40px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "rgba(0,0,0,0.12) 0px 12px 25px";
          }}
        >
          <h3 style={getTitle}>🚀 Get Started</h3>
          <p style={getText}>
            Login to explore menu, place orders and track delivery
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===== FEATURE COMPONENT ===== */

function Feature({ title, text }) {
  return (
    <div
      style={featureCard}
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
      <h3 style={featureTitle}>{title}</h3>
      <p style={featureText}>{text}</p>
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
  maxWidth: 950,
  boxShadow:
    "rgba(0,0,0,0.14) 0px 30px 60px, rgba(0,0,0,0.08) 0px 12px 30px",
};

const title = {
  fontSize: 34,
  marginBottom: 10,
  color: "#0f172a",
};

const brand = {
  background: "linear-gradient(90deg,#22c55e,#38bdf8)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 900,
};

const tagline = {
  fontSize: 16,
  color: "#16a34a",
  fontWeight: 600,
  marginBottom: 18,
};

const desc = {
  fontSize: 15,
  color: "#475569",
  maxWidth: 700,
  margin: "0 auto 40px",
  lineHeight: 1.6,
};

const features = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 24,
  marginBottom: 40,
};

const featureCard = {
  padding: 26,
  borderRadius: 18,
  background: "#f8fafc",
  transition: "all 0.35s ease",
  boxShadow: "rgba(0,0,0,0.12) 0px 12px 25px",
};

const featureTitle = {
  marginBottom: 10,
  fontSize: 18,
  color: "#0f172a",
};

const featureText = {
  fontSize: 14,
  color: "#64748b",
};

const ctaRow = {
  display: "flex",
  justifyContent: "center",
  gap: 20,
  flexWrap: "wrap",
  marginBottom: 40,
};

const primaryBtn = {
  padding: "14px 30px",
  borderRadius: 30,
  border: "none",
  fontWeight: 700,
  cursor: "pointer",
  color: "#fff",
  background: "linear-gradient(135deg,#22c55e,#16a34a)",
  boxShadow: "rgba(34,197,94,0.4) 0px 10px 25px",
};

const secondaryBtn = {
  padding: "14px 30px",
  borderRadius: 30,
  border: "2px solid #22c55e",
  fontWeight: 700,
  cursor: "pointer",
  color: "#16a34a",
  background: "transparent",
};

const getStarted = {
  marginTop: 20,
  padding: 26,
  borderRadius: 18,
  cursor: "pointer",
  background: "linear-gradient(135deg,#ecfeff,#f0fdf4)",
  transition: "all 0.35s ease",
  boxShadow: "rgba(0,0,0,0.12) 0px 12px 25px",
};

const getTitle = {
  fontSize: 20,
  fontWeight: 800,
  marginBottom: 8,
  color: "#0f172a",
};

const getText = {
  fontSize: 14,
  color: "#475569",
};
