import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPassword() {
  const query = useQuery();
  const navigate = useNavigate();

  const token = query.get("token");
  const email = query.get("email");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm)
      return setError("Passwords do not match");

    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token, password }),
    });

    const data = await res.json();

    if (!res.ok) return setError(data.message);

    setMsg(data.message);
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}
        {msg && <p className="text-green-600 mb-3">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>New Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-3 bg-indigo-600 text-white rounded-lg">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
