import { useEffect, useState, useRef } from "react";
import { Trash2, Mail, Phone, Loader2, Search, Bell } from "lucide-react";
import axios from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({ total: 0 });
  const [deleting, setDeleting] = useState(null);
  const [newContact, setNewContact] = useState(null);
  const firstLoad = useRef(true);

  // Fetch contacts
  const fetchContacts = async (showToast = false) => {
    try {
      const res = await axios.get("/contact"); // ✅ no baseURL needed
      if (res.data.success) {
        const newData = res.data.data;

        // 🟢 Detect new contact
        if (!firstLoad.current && newData.length > contacts.length) {
          const latest = newData[0];
          setNewContact(latest);
          if (showToast) toast.success(`🔔 New contact received: ${latest.fullName}`);
        }

        setContacts(newData);
        setStats({ total: newData.length });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
      firstLoad.current = false;
    }
  };

  useEffect(() => {
    fetchContacts();

    // Auto refresh every 10s
    const interval = setInterval(() => fetchContacts(true), 10000);
    return () => clearInterval(interval);
  }, []);

  // Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      setDeleting(id);
      await axios.delete(`/contact/${id}`); // ✅ use relative URL
      toast.success("Contact deleted successfully");
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      toast.error("Error deleting contact");
      console.error(error);
    } finally {
      setDeleting(null);
    }
  };

  // Search filter
  const filteredContacts = contacts.filter((c) =>
    [c.fullName, c.email, c.phone, c.companyName]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900 flex items-center space-x-2">
          <span>📞 Contact Submissions</span>
          {newContact && (
            <span className="ml-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
              <Bell className="w-4 h-4" /> New!
            </span>
          )}
        </h1>

        <div className="flex items-center space-x-3 mt-3 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <button
            onClick={() => fetchContacts(true)}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-all text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <p className="text-gray-700 text-sm">Total Contacts</p>
          <h2 className="text-2xl font-bold text-blue-900">{stats.total}</h2>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <p className="text-gray-700 text-sm">Recent Contact</p>
          <h2 className="text-lg font-semibold text-green-800 flex items-center gap-2">
            {contacts[0]?.fullName || "N/A"}
            {newContact?.fullName === contacts[0]?.fullName && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce">
                New
              </span>
            )}
          </h2>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <p className="text-gray-700 text-sm">Last Updated</p>
          <h2 className="text-lg font-semibold text-blue-800">
            {contacts[0]?.createdAt
              ? new Date(contacts[0].createdAt).toLocaleDateString()
              : "N/A"}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          </div>
        ) : filteredContacts.length > 0 ? (
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Turnover</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((c) => (
                <tr
                  key={c._id}
                  className={`border-b hover:bg-blue-50 transition-all ${
                    newContact?._id === c._id ? "bg-green-50" : ""
                  }`}
                >
                  <td className="p-3 font-semibold text-gray-800 align-middle">
                    {c.fullName || "-"}
                  </td>
                  <td className="p-3 text-gray-600 align-middle">
                    <div className="inline-flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <a href={`mailto:${c.email}`} className="hover:underline">
                        {c.email}
                      </a>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600 align-middle">
                    <div className="inline-flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-green-600" />
                      <a href={`tel:${c.phone}`} className="hover:underline">
                        {c.phone}
                      </a>
                    </div>
                  </td>
                  <td className="p-3 align-middle">{c.companyName || "-"}</td>
                  <td className="p-3 align-middle">{c.annualTurnover || "-"}</td>
                  <td className="p-3 max-w-xs truncate align-middle">
                    {c.message || "-"}
                  </td>
                  <td className="p-3 text-center align-middle">
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-500 hover:text-red-700 transition-all"
                      disabled={deleting === c._id}
                    >
                      {deleting === c._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 py-8">
            No contact submissions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
