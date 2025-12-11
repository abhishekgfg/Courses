import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import SuccessPopup from "../components/SuccessPopup";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      // Save user + token
     // Save user + token
// Save user + token
localStorage.setItem("token", data.token);  // 🔥🔥 FIX
login(data.user, data.token);

setSuccess(true);

setTimeout(() => {
  navigate("/courses");
}, 1500);

    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <>
      {success && <SuccessPopup message="Login successful!" />}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Login</h2>

          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg flex gap-2">
              <FiAlertCircle /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email or Phone</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mt-1"
              />
            </div>

            <Link to="/Forget-Password" className="text-sm text-indigo-600">
              Forgot Password?
            </Link>

            <button className="w-full py-3 bg-purple-600 text-white rounded-lg" disabled={loading}>
              {loading ? "Please wait..." : "Log In"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?
            <Link className="text-indigo-600 ml-1" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
