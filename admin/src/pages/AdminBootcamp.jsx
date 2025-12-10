import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import {
  Calendar, Clock, MapPin, Users, IndianRupee, FileText, Link, Upload, Image as ImageIcon, Type,
  CheckCircle, XCircle, Trash2, Edit
} from "lucide-react";

const AdminBootcamp = () => {
  const [form, setForm] = useState({
    title: "", subtitle: "", nextBatch: "", schedule: "", location: "",
    limit: "", price: "", regularPrice: "", buttonText: "", buttonLink: ""
  });
  const [image, setImage] = useState(null);
  const [bootcampId, setBootcampId] = useState(null);
  const [bootcamps, setBootcamps] = useState([]);

  const icons = {
    title: <Type size={18} />, subtitle: <FileText size={18} />, nextBatch: <Calendar size={18} />,
    schedule: <Clock size={18} />, location: <MapPin size={18} />, limit: <Users size={18} />,
    price: <IndianRupee size={18} />, regularPrice: <IndianRupee size={18} />,
    buttonText: <FileText size={18} />, buttonLink: <Link size={18} />
  };

  const fetchBootcamps = async () => {
    try {
      const res = await axios.get("/bootcamp");
      setBootcamps(res.data || []);
    } catch {
      toast.error("Failed to load bootcamps");
    }
  };

  useEffect(() => { fetchBootcamps(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (image) formData.append("image", image);

    try {
      if (bootcampId) await axios.put(`/bootcamp/${bootcampId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      else await axios.post("/bootcamp", formData, { headers: { "Content-Type": "multipart/form-data" } });

      toast.success("✅ Bootcamp saved");
      setForm({ title:"", subtitle:"", nextBatch:"", schedule:"", location:"", limit:"", price:"", regularPrice:"", buttonText:"", buttonLink:"" });
      setImage(null); setBootcampId(null);
      fetchBootcamps();
    } catch {
      toast.error("Failed to save bootcamp");
    }
  };

  const toggleStatus = async (id, status) => {
    try {
      await axios.put(`/bootcamp/${id}`, { isActive: !status });
      toast.success(status ? "Deactivated" : "Activated");
      fetchBootcamps();
    } catch { toast.error("Failed to update status"); }
  };

  // ✅ Delete bootcamp
  const deleteBootcamp = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bootcamp?")) return;
    try {
      await axios.delete(`/bootcamp/${id}`);
      toast.success("Bootcamp deleted");
      fetchBootcamps();
    } catch {
      toast.error("Failed to delete bootcamp");
    }
  };

  // ✅ Load bootcamp into form for update
  const editBootcamp = (b) => {
    setForm({
      title: b.title, subtitle: b.subtitle, nextBatch: b.nextBatch, schedule: b.schedule,
      location: b.location, limit: b.limit, price: b.price, regularPrice: b.regularPrice,
      buttonText: b.buttonText, buttonLink: b.buttonLink
    });
    setImage(null); // optionally load old image
    setBootcampId(b._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto   rounded-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">🚀 Manage Bootcamp</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(form).map((key) => (
            <div key={key}>
              <label className="block font-semibold mb-1 capitalize text-gray-700">{key.replace(/([A-Z])/g," $1")}</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 hover:border-blue-400">
                {icons[key] && <span className="text-gray-500 mr-2">{icons[key]}</span>}
                <input type="text" value={form[key]} onChange={(e)=>setForm({...form,[key]:e.target.value})} className="w-full bg-transparent outline-none text-gray-800" placeholder={`Enter ${key}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-2 border-dashed border-gray-300 p-6 rounded-xl text-center hover:border-blue-400">
          <label className="block text-lg font-semibold mb-2 text-gray-700"><ImageIcon className="inline-block mr-2"/> Upload Image</label>
          <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} className="hidden" id="bootcamp-image"/>
          <label htmlFor="bootcamp-image" className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-all">
            <Upload className="mr-2" size={18}/> Choose File
          </label>
          <div className="mt-4 flex justify-center">
            {image ? <img src={URL.createObjectURL(image)} alt="Preview" className="w-60 h-40 object-cover rounded-lg shadow-md"/> :
            <p className="text-gray-500 mt-2">No image selected</p>}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-md">
            💾 {bootcampId ? "Update Bootcamp" : "Save Bootcamp"}
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Bootcamp List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Title</th>
                <th className="border p-3">Batch</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Status</th>
                <th className="border p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bootcamps.length > 0 ? bootcamps.map((b)=>(
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="border p-3">{b.title}</td>
                  <td className="border p-3">{b.nextBatch}</td>
                  <td className="border p-3">₹{b.price}</td>
                  <td className="border p-3">
                    {b.isActive ? <span className="text-green-600 font-semibold flex items-center gap-1"><CheckCircle size={16}/> Active</span> :
                    <span className="text-red-600 font-semibold flex items-center gap-1"><XCircle size={16}/> Inactive</span>}
                  </td>
                  <td className="border p-3 text-center flex justify-center gap-2">
                    <button onClick={()=>editBootcamp(b)} className="text-blue-600 hover:text-blue-800"><Edit size={20}/></button>
                    <button onClick={()=>deleteBootcamp(b._id)} className="text-red-600 hover:text-red-800"><Trash2 size={20}/></button>
                    <button onClick={()=>toggleStatus(b._id, b.isActive)} className={`px-3 py-1 rounded-md text-white ${b.isActive ? "bg-red-500" : "bg-green-500"}`}>
                      {b.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              )) : <tr><td colSpan="5" className="text-center text-gray-500 p-4">No bootcamps found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBootcamp;
