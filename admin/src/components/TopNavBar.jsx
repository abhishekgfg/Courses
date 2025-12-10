import { Bell, LogOut, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TopNavBar = ({ activeTab, handleLogout, onMenuToggle, isSidebarOpen }) => {
  const adminAuth = JSON.parse(localStorage.getItem("adminAuth"));
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        
        {/* Left Side */}
        <div className="flex items-center space-x-3 md:space-x-0 flex-1">
          
          {/* Menu Toggle - Mobile Only */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Mobile View - Avatar + Name */}
          <div className="md:hidden flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
              {adminAuth?.user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {adminAuth?.user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-600">Administrator</p>
            </div>
          </div>

          {/* Desktop View - Title + Subtitle */}
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab?.charAt(0).toUpperCase() + activeTab?.slice(1) || "Dashboard"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Welcome back, {adminAuth?.user?.name || "Admin"}
            </p>
          </div>
        </div>

        {/* Right Side - Search + Notification + Logout */}
        <div className="flex items-center space-x-2 md:space-x-4">
          
          {/* Desktop Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notification Bell */}
          <button className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Notifications">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Logout - Desktop Text + Icon */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-semibold">Logout</span>
          </button>

          {/* Logout - Mobile Icon Only */}
          <button
            onClick={handleLogout}
            className="md:hidden p-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Search Expandable */}
      {showSearch && (
        <div className="md:hidden px-4 pb-4 border-t border-gray-200">
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </header>
  );
};

export default TopNavBar;
