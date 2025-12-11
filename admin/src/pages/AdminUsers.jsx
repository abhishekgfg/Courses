import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const statusColors = {
  Purchased: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  "Not Done": "bg-red-100 text-red-800",
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users + course status
  useEffect(() => {
    axios
      .get("/admin/course-status", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = (userId, newStatus) => {
    axios
      .post(
        "/admin/course-status/update",
        { userId, status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        setUsers((prev) =>
          prev.map((u) =>
            u.userId._id === userId ? { ...u, status: newStatus } : u
          )
        );
      })
      .catch((err) => console.error(err));
  };

  if (loading)
    return (
      <p className="p-6 text-center text-lg text-gray-600">Loading users...</p>
    );

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        All Registered Users
      </h1>

      {/* Table view */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Course Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Created At
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr
                key={u.userId._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-medium">
                  {u.userId.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {u.userId.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {u.userId.phone}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <select
                    value={u.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(u.userId._id, e.target.value)
                    }
                    className={`border rounded px-2 py-1 font-semibold ${statusColors[u.status]}`}
                  >
                    <option value="Purchased">Purchased</option>
                    <option value="Pending">Pending</option>
                    <option value="Not Done">Not Done</option>
                  </select>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500 text-sm">
                  {new Date(u.userId.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden mt-6 space-y-4">
        {users.map((u) => (
          <div
            key={u.userId._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2"
          >
            <p className="text-gray-700 font-semibold">{u.userId.name}</p>
            <p className="text-gray-500 text-sm">{u.userId.email}</p>
            <p className="text-gray-500 text-sm">{u.userId.phone}</p>
            <select
              value={u.status || "Pending"}
              onChange={(e) => handleStatusChange(u.userId._id, e.target.value)}
              className={`border rounded px-2 py-1 font-semibold ${statusColors[u.status]}`}
            >
              <option value="Purchased">Purchased</option>
              <option value="Pending">Pending</option>
              <option value="Not Done">Not Done</option>
            </select>
            <p className="text-gray-400 text-xs">
              {new Date(u.userId.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
