import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const AdminProfile = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err.response?.data || err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6 text-center text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-200 flex justify-center items-center">
            <FaUser className="text-blue-700 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Profile</h1>
            <p className="text-gray-500">View your admin account information</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <FaUser className="text-gray-600 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <FaEnvelope className="text-gray-600 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <FaPhone className="text-gray-600 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-semibold">{user.phone}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;
