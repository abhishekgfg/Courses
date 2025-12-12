// Updated Navigation Component with icons added to all links + profile dropdown

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiUser, FiHome, FiBook, FiTrendingUp, FiUsers, FiInfo } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import logo from "../../../public/manovaidya-logo.png";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const navLinks = user
    ? [
        { label: "Home", path: "/", icon: <FiHome size={16} /> },
        { label: "Courses", path: "/courses", icon: <FiBook size={16} /> },
        { label: "My Journey", path: "/my-journey", icon: <FiTrendingUp size={16} /> },
        { label: "Community", path: "/community", icon: <FiUsers size={16} /> },
        { label: "About Doctors", path: "/about-doctor", icon: <FiInfo size={16} /> },
           { label: "About Doctors", path: "/courses/:courseId/lesson/:lessonId", icon: <FiInfo size={16} /> },
      ]
    : [
        { label: "Home", path: "/", icon: <FiHome size={16} /> },
        { label: "Courses", path: "/courses", icon: <FiBook size={16} /> },
        { label: "Free Resources", path: "/resources", icon: <FiBook size={16} /> },
        { label: "Community", path: "/community", icon: <FiUsers size={16} /> },
        { label: "About Doctors", path: "/about-doctor", icon: <FiInfo size={16} /> },
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur border-b">
      <div className="w-[85%] mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/"><img src={logo} className="w-36" alt="Logo" /></Link>

          {/* DESKTOP NAV LINKS WITH ICONS */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={
                  isActive(link.path)
                    ? "px-3 py-2 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-700 flex items-center gap-2"
                    : "px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100 flex items-center gap-2"
                }
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP USER DROPDOWN WITH ICON */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <FiUser size={16} /> Hi, {user.name}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border shadow-md rounded-lg p-2 animate-fade-in">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-lg flex items-center gap-2"
                    >
                      <FiUser size={16} /> Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 flex items-center gap-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 mt-1"
                    >
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/auth"><button className="px-4 py-2 text-sm hover:bg-gray-100 rounded-lg">Login</button></Link>
                <Link to="/auth"><button className="px-4 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700">Get Started Free</button></Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU WITH ICONS */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  isActive(link.path)
                    ? "flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-indigo-100 text-indigo-700"
                    : "flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
                }
              >
                {link.icon} {link.label}
              </Link>
            ))}

            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-2 text-sm hover:bg-gray-100 rounded-lg flex items-center gap-2">
                      <FiUser size={16} /> Profile
                    </button>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 flex items-center justify-center gap-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FiLogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-2 text-sm hover:bg-gray-100 rounded-lg">Login</button>
                  </Link>

                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Get Started Free</button>
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
