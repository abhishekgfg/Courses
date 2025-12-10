import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import SuccessPopup from "../components/SuccessPopup";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/auth"); // redirect to login after signup
      }, 1500);
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <>
      {success && <SuccessPopup message="Account created successfully!" />}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Create Account</h2>

          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg flex gap-2">
              <FiAlertCircle /> {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                className="w-full px-3 py-2 border rounded-lg mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                className="w-full px-3 py-2 border rounded-lg mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input
                className="w-full px-3 py-2 border rounded-lg mt-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                className="w-full px-3 py-2 border rounded-lg mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>

            <button className="w-full py-3 bg-purple-600 text-white rounded-lg" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?
            <Link className="text-indigo-600 ml-1" to="/auth">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
