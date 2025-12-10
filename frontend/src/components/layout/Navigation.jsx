import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../../public/manovaidya-logo.png";

const Navigation = ({ isLoggedIn = false }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = isLoggedIn
        ? [
            { label: "Home", path: "/" },
            { label: "My Courses", path: "/my-courses" },
            { label: "My Journey", path: "/my-journey" },
            { label: "Community", path: "/community" },
            { label: "Library", path: "/courses" },
        ]
        : [
            { label: "Home", path: "/" },
            { label: "Courses", path: "/courses" },
            { label: "Free Resources", path: "/resources" },
            { label: "Community", path: "/community" },
            { label: "About Doctors", path: "/about" },
        ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur border-b">
            <div className="w-[85%] mx-auto px-4">
                
                {/* === 3 COLUMN FLEX GRID === */}
                <div className="flex h-16 items-center justify-between">

                    {/* LEFT — LOGO */}
                    <div className="flex items-center flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src={logo}
                                alt="Manovaidya Logo"
                                className="w-36 h-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* CENTER — NAV LINKS (Always centered) */}
                    <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={
                                    isActive(link.path)
                                        ? "px-4 py-2 rounded-lg text-sm font-medium transition bg-indigo-100 text-indigo-700"
                                        : "px-4 py-2 rounded-lg text-sm font-medium transition text-gray-800 hover:bg-gray-100"
                                }
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT — AUTH BUTTONS */}
                    <div className="hidden md:flex items-center space-x-3">
                        {isLoggedIn ? (
                            <Link to="/profile">
                                <button className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
                                    Profile
                                </button>
                            </Link>
                        ) : (
                            <>
                                <Link to="/auth">
                                    <button className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/auth">
                                    <button className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 text-white hover:bg-purple-700">
                                        Get Started Free
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* MOBILE — TOGGLE */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>

                </div>

                {/* === MOBILE MENU === */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-2 animate-fade-in">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={
                                    isActive(link.path)
                                        ? "block px-4 py-2 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-700"
                                        : "block px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100"
                                }
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="pt-4 space-y-2">
                            {isLoggedIn ? (
                                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
                                        Profile
                                    </button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                                        <button className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                                            Get Started Free
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
