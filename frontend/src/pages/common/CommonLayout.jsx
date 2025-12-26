import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CommonLayout() {
  return (
    <div style={layout}>
      <Navbar />
      <main style={content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

/* ================= STYLES ================= */

const layout = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "#e5e5e5", // soft grey background
};

const content = {
  flex: 1,

  /* 🔥 REDUCED TOP PADDING (NO EXTRA GAP) */
  padding: "40px 20px 60px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
