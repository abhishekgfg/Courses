import { useState } from "react";
import { FiAlertCircle } from "react-icons/fi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const sendResetLink = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) return setError(data.message);

    setMsg(data.message);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg flex gap-2">
            <FiAlertCircle /> {error}
          </div>
        )}

        {msg && (
          <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
            {msg}
          </div>
        )}

        <form onSubmit={sendResetLink} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="w-full px-3 py-2 border rounded-lg mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-3 bg-indigo-600 text-white rounded-lg">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
