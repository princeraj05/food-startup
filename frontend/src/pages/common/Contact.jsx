// ================= FRONTEND =================
// ✅ src/pages/common/Contact.jsx
// (PROFESSIONAL CONTACT PAGE – INLINE STYLES + ANIMATIONS)

import { useEffect, useState } from "react";

export default function Contact() {
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
        <h2 style={title}>📞 Contact FoodStartup</h2>

        <p style={subtitle}>
          We’re here to help you with orders, delivery, and support
        </p>

        <p style={desc}>
          Have a question or need assistance? Our support team is always
          ready to help you. Reach out to us anytime and we’ll get back
          to you as soon as possible.
        </p>

        {/* CONTACT INFO */}
        <div style={infoGrid}>
          <InfoBox
            icon="📧"
            title="Email Support"
            text="support@foodstartup.com"
          />
          <InfoBox
            icon="📞"
            title="Phone Support"
            text="+91 98765 43210"
          />
          <InfoBox
            icon="📍"
            title="Office Location"
            text="India · Serving Nationwide"
          />
        </div>

        {/* NOTE */}
        <p style={note}>
          ⏰ Support available: <b>9 AM – 9 PM (Mon–Sun)</b>
        </p>
      </div>
    </div>
  );
}

/* ===== INFO BOX COMPONENT ===== */

function InfoBox({ icon, title, text }) {
  return (
    <div
      style={infoCard}
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
      <div style={iconStyle}>{icon}</div>
      <h4 style={infoTitle}>{title}</h4>
      <p style={infoText}>{text}</p>
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

const subtitle = {
  fontSize: 16,
  color: "#16a34a",
  fontWeight: 600,
  marginBottom: 18,
};

const desc = {
  fontSize: 15,
  color: "#475569",
  maxWidth: 650,
  margin: "0 auto 40px",
  lineHeight: 1.6,
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 24,
  marginBottom: 30,
};

const infoCard = {
  padding: 26,
  borderRadius: 18,
  background: "#f8fafc",
  transition: "all 0.35s ease",
  boxShadow: "rgba(0,0,0,0.12) 0px 12px 25px",
};

const iconStyle = {
  fontSize: 34,
  marginBottom: 10,
};

const infoTitle = {
  marginBottom: 8,
  fontSize: 17,
  color: "#0f172a",
};

const infoText = {
  fontSize: 14,
  color: "#64748b",
};

const note = {
  marginTop: 10,
  fontSize: 14,
  color: "#334155",
};
