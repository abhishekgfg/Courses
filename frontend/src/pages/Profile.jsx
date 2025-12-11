import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { FaUser, FaEnvelope, FaPhone, FaPlus, FaEdit, FaTrash, FaComments } from "react-icons/fa";

const Profile = () => {
    const [whatsappEnabled, setWhatsappEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(true);

    // 👉 User State
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // Static Child Profiles (as in your UI)
    const childProfiles = [
        {
            id: "1",
            nickname: "Aarav",
            age: 7,
            grade: "Grade 2",
            concern: "Autism & Sensory Issues",
        },
    ];

    // 👉 Fetch Profile
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get("http://localhost:5000/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error("Profile fetch error:", err);
            });
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1">

                {/* Header */}
                <section className="bg-gray-100 py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl font-bold mb-2">Profile & Settings</h1>
                            <p className="text-gray-500">Manage your account and child profiles</p>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto space-y-8">

                        {/* Parent Info */}
                        <div className="p-6 bg-white rounded-xl shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <FaUser className="text-blue-600 text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Your Information</h2>
                                    <p className="text-gray-500 text-sm">Manage your personal details</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Full Name</label>
                                       <input
    className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
    value={user.name}
    readOnly
/>

                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Email</label>
                                        <input
    type="email"
    className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
    value={user.email}
    readOnly
/>

                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Phone Number</label>
                                   <input
    type="tel"
    className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
    value={user.phone}
    readOnly
/>

                                </div>

                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* Child Profiles */}
                        <div className="p-6 bg-white rounded-xl shadow">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                        <FaUser className="text-purple-600 text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">Child Profiles</h2>
                                        <p className="text-gray-500 text-sm">Personalize your experience</p>
                                    </div>
                                </div>

                                <button className="flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white">
                                    <FaPlus className="mr-2" /> Add Child
                                </button>
                            </div>

                            <div className="space-y-4">
                                {childProfiles.map((child) => (
                                    <div
                                        key={child.id}
                                        className="p-4 border rounded-xl hover:bg-gray-50 transition"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold">{child.nickname}</h3>
                                                    <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                                                        {child.age} years
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">Grade: {child.grade}</p>
                                                <p className="text-sm text-gray-600">
                                                    Concern: {child.concern}
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="p-2 rounded hover:bg-gray-200">
                                                    <FaEdit />
                                                </button>
                                                <button className="p-2 rounded hover:bg-gray-200">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Communication */}
                        <div className="p-6 bg-white rounded-xl shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <FaComments className="text-green-600 text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Communication Channels</h2>
                                    <p className="text-gray-500 text-sm">Manage how we contact you</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* WhatsApp */}
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <FaComments className="text-green-600" />
                                            <h3 className="font-semibold">WhatsApp Updates</h3>
                                            {whatsappEnabled && (
                                                <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                                                    Connected
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Receive course updates & reminders
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={whatsappEnabled}
                                        onChange={(e) => setWhatsappEnabled(e.target.checked)}
                                        className="w-5 h-5"
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <FaEnvelope className="text-blue-600" />
                                            <h3 className="font-semibold">Email Updates</h3>
                                            {emailEnabled && (
                                                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                                    Connected
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Receive announcements & newsletters
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={emailEnabled}
                                        onChange={(e) => setEmailEnabled(e.target.checked)}
                                        className="w-5 h-5"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="p-6 bg-white rounded-xl shadow border border-red-300">
                            <h2 className="text-xl font-bold text-red-600 mb-2">Danger Zone</h2>
                            <p className="text-sm text-gray-500 mb-4">Irreversible action</p>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
                                Delete Account
                            </button>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
};

export default Profile;
