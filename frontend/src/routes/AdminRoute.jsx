import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminRoute({ children }) {

  const token = localStorage.getItem("token");

  // Agar token nahi hai → login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {

    const decoded = jwtDecode(token);

    // Agar role admin nahi hai → user dashboard
    if (decoded?.role !== "admin") {
      return <Navigate to="/user" replace />;
    }

    // Admin hai → page access
    return children;

  } catch (error) {

    // Invalid token → login page
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;

  }

}