import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

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
            { label: "My Journey", path: "/my-journey" },
            { label: "Profile", path: "/profile" },
            { label: "About Doctors", path: "/about" },

        ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur border-b">
            <div className="w-[85%] mx-auto px-4">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" /> */}
                        <div className="flex flex-col leading-none">
                            <span className="font-semibold text-lg">Manovaidya</span>
                            <span className="text-xs text-gray-500">Parent Academy</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1">
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

                    {/* Auth Desktop */}
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

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
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
