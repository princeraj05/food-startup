import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) return setAllowed(false);

      const token = await user.getIdToken();

      const res = await fetch("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setAllowed(data.role === "admin");
    };

    checkAdmin();
  }, []);

  if (allowed === null) return null;
  return allowed ? children : <Navigate to="/user" />;
}
