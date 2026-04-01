import { useRef } from "react";

export default function Home() {

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={page}>

      {/* ── HERO ── */}
      <section id="home" style={section}>
        <h1 style={title}>
          Welcome to <span style={brand}>FoodStartup</span> 🍕
        </h1>
        <p style={subtitle}>Fresh food • Fast delivery • Trusted by customers</p>
        <p style={desc}>
          FoodStartup is a modern food ordering platform where you can explore
          menus, place orders and track delivery easily.
        </p>

        <div style={features}>
          <div style={card}><h3>🍔 Quality Food</h3><p>Fresh & hygienic meals</p></div>
          <div style={card}><h3>⚡ Fast Delivery</h3><p>On-time delivery</p></div>
          <div style={card}><h3>📦 Easy Ordering</h3><p>Simple checkout</p></div>
        </div>

        <div style={buttons}>
          <button style={primary} onClick={() => scrollTo("about")}>About Us</button>
          <button style={secondary} onClick={() => scrollTo("contact")}>Contact</button>
        </div>

        <div style={loginBox} onClick={() => scrollTo("login")}>
          <h3>🚀 Get Started</h3>
          <p>Login to explore menu and order food</p>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={section}>
        <h1 style={title}>
          About <span style={brand}>FoodStartup</span> 🍔
        </h1>
        <p style={subtitle}>Delivering happiness through food</p>
        <p style={desc}>
          FoodStartup connects customers with delicious meals and fast delivery services.
        </p>
        <div style={features}>
          <div style={card}><h3>🥗 Quality First</h3><p>Fresh ingredients & hygienic preparation</p></div>
          <div style={card}><h3>🚀 Fast Service</h3><p>Quick delivery with tracking</p></div>
          <div style={card}><h3>❤️ Customer Trust</h3><p>Thousands of happy customers</p></div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={section}>
        <h1 style={title}>📞 Contact FoodStartup</h1>
        <p style={subtitle}>We're here to help you anytime</p>
        <div style={features}>
          <div style={card}><div style={icon}>📧</div><h3>Email Support</h3><p>support@foodstartup.com</p></div>
          <div style={card}><div style={icon}>📞</div><h3>Phone Support</h3><p>+91 98765 43210</p></div>
          <div style={card}><div style={icon}>📍</div><h3>Office Location</h3><p>India · Serving Nationwide</p></div>
        </div>
      </section>

      {/* ── LOGIN ── */}
      <section id="login" style={{ ...section, maxWidth: 420 }}>
        <h1 style={title}>🔐 Login</h1>
        <p style={subtitle}>Access your FoodStartup account</p>
        <div style={loginForm}>
          <input style={input} type="email" placeholder="Email address" />
          <input style={input} type="password" placeholder="Password" />
          <button style={{ ...primary, width: "100%", padding: "12px" }}>
            Login
          </button>
          <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", marginTop: 10 }}>
            Don't have an account?{" "}
            <span style={{ color: "#16a34a", cursor: "pointer", fontWeight: 600 }}>
              Sign Up
            </span>
          </p>
        </div>
      </section>

    </div>
  );
}

/* ── styles ── */

const page = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const section = {
  width: "100%",
  maxWidth: 900,
  textAlign: "center",
  padding: "60px 20px",
  borderBottom: "1px solid #e5e7eb",
};

const title  = { fontSize: 32, marginBottom: 10 };
const brand  = { color: "#16a34a", fontWeight: 800 };
const subtitle = { color: "#16a34a", marginBottom: 20 };
const desc   = { fontSize: 14, color: "#6b7280", marginBottom: 30 };

const features = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: 16,
  marginBottom: 30,
};

const card = {
  padding: 20,
  background: "#ffffff",
  borderRadius: 10,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const icon = { fontSize: 28, marginBottom: 8 };

const buttons = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: 10,
  marginBottom: 30,
};

const primary = {
  padding: "10px 20px",
  borderRadius: 20,
  border: "none",
  background: "#16a34a",
  color: "#fff",
  cursor: "pointer",
};

const secondary = {
  padding: "10px 20px",
  borderRadius: 20,
  border: "2px solid #16a34a",
  background: "transparent",
  color: "#16a34a",
  cursor: "pointer",
};

const loginBox = {
  padding: 20,
  borderRadius: 10,
  background: "#ecfdf5",
  cursor: "pointer",
};

const loginForm = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  textAlign: "left",
};

const input = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1.5px solid #d1fae5",
  fontSize: 14,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};