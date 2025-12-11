import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext"; // <-- ADD THIS
import logo from "../../../public/manovaidya-logo.png";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout } = useAuth();  // <-- logged-in user + logout function

  const handleLogout = () => {
    logout();             // 1) clear user + token
    navigate("/auth");    // 2) redirect to login
  };

  const navLinks = user
    ? [
        { label: "Home", path: "/" },
        { label: "Courses", path: "/courses" },
        { label: "My Journey", path: "/my-journey" },
        { label: "Community", path: "/community" }
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Courses", path: "/courses" },
        { label: "Free Resources", path: "/resources" },
        { label: "Community", path: "/community" },
        { label: "About Doctors", path: "/about" }
      ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur border-b">
      <div className="w-[85%] mx-auto px-4">

        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link to="/">
            <img src={logo} className="w-36" alt="Logo" />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={
                  isActive(link.path)
                    ? "px-4 py-2 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-700"
                    : "px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP RIGHT SIDE */}
          {/* DESKTOP RIGHT SIDE */}
<div className="hidden md:flex items-center space-x-4">
  {user ? (
    <>
      {/* USER NAME */}
      <span className="text-sm font-medium text-gray-700">
        Hi, {user.name}
      </span>

      {/* PROFILE BUTTON */}
      <Link to="/profile">
        <button className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg">
          Profile
        </button>
      </Link>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium flex items-center gap-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        <FiLogOut size={18} /> Logout
      </button>
    </>
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


          {/* MOBILE MENU TOGGLE */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  isActive(link.path)
                    ? "block px-4 py-2 rounded-lg text-sm bg-indigo-100 text-indigo-700"
                    : "block px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
                }
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 space-y-2">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-2 text-sm hover:bg-gray-100 rounded-lg">
                      Profile
                    </button>
                  </Link>

                  {/* MOBILE LOGOUT BUTTON */}
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
                    <button className="w-full px-4 py-2 text-sm hover:bg-gray-100 rounded-lg">
                      Login
                    </button>
                  </Link>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
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
