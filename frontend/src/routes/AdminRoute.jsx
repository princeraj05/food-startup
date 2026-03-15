import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function AdminRoute({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {

    const decoded = jwt_decode(token);

    if (decoded.role !== "admin") {
      return <Navigate to="/user" />;
    }

    return children;

  } catch {

    return <Navigate to="/login" />;

  }

}
