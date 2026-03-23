import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/axios"; // ✅ SAME AS LOGIN

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ AXIOS CALL
      const res = await API.post("/api/users/register", {
        name,
        email,
        password,
      });

      const data = res.data;

      alert(data.message || "Registration successful!");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 px-4 py-10">

      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-300 opacity-20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400 opacity-20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg mb-3">
            <h1 className="text-white font-bold">🍔</h1>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800">FreshBite</h1>
          <p className="text-sm text-gray-500 mt-1">Create your account — it's free!</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Create Account</h2>

          <form onSubmit={handleRegister} className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border bg-gray-50"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold"
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="text-center text-sm mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}