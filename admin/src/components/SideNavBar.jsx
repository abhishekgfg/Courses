import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const SideNavBar = ({ activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const navigate = useNavigate();
  const adminAuth = JSON.parse(localStorage.getItem("adminAuth"));

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/login");
  };

  const handleNavigation = (tab, route) => {
    setActiveTab(tab);
    navigate(route);
  };
  const ContactIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 10a8.38 8.38 0 01-.9 3.8l-1.35 2.7a2 2 0 01-1.78 1.1H7.03a2 2 0 01-1.78-1.1l-1.35-2.7A8.38 8.38 0 013 10a8.38 8.38 0 01.9-3.8L5.25 3.5A2 2 0 017.03 2h9.94a2 2 0 011.78 1.5l1.35 2.7A8.38 8.38 0 0121 10zM8 10h.01M16 10h.01"
    />
  </svg>
);
const BootcampIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l3 3 3-3"
    />
  </svg>
);


  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-gradient-to-b from-blue-900 to-blue-950 text-white transition-all duration-300 flex flex-col h-full shadow-lg`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-blue-800">
        {sidebarOpen ? (
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">
                <span className="text-white">Coures</span>{" "}
                <span className="text-yellow-400">Panel</span>
              </h1>
              <p className="text-xs text-blue-300 mt-1">Admin Panel</p>
            </div>
            {/* <button
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:text-yellow-400 hover:bg-blue-800 p-1 rounded transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button> */}
          </div>
        ) : (
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-full flex justify-center text-yellow-400 hover:text-yellow-300 hover:bg-blue-800 p-2 rounded transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        <NavItem
          icon={<DashboardIcon />}
          label="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => handleNavigation("dashboard", "/admin/dashboard")}
          collapsed={!sidebarOpen}
        />
         {/* <NavItem
          icon={<DashboardIcon />}
          label="Courses"
          active={activeTab === "Courses"}
          onClick={() => handleNavigation("dashboard", "/admin/courses")}
          collapsed={!sidebarOpen}
        /> */}
        <NavItem
          icon={<DashboardIcon />}
          label="Courses"
          active={activeTab === "Course Data"}
          onClick={() => handleNavigation("dashboard", "/admin/course")}
          collapsed={!sidebarOpen}
        />
        <NavItem
          icon={<ClientsIcon />}
          label="Patients Profile"
          active={activeTab === "clients"}
          onClick={() => handleNavigation("clients", "/admin/profile")}
          collapsed={!sidebarOpen}
        />

        {/* Resources Dropdown */}
        {sidebarOpen ? (
          <div className="space-y-1">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                ["blog", "casestudies", "freetools"].includes(activeTab)
                  ? "bg-yellow-500 text-blue-900 font-semibold shadow-md"
                  : "text-blue-100 hover:bg-blue-800"
              }`}
            >
              <div className="flex items-center space-x-3">
                <ResourcesIcon />
                <span>Resources</span>
              </div>
              {resourcesOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Resources Submenu */}
            {resourcesOpen && (
              <div className="ml-4 space-y-1 border-l-2 border-blue-700 pl-4">
                <SubNavItem
                  icon={<BlogIcon />}
                  label="Blog Posts"
                  active={activeTab === "blog"}
                  onClick={() => handleNavigation("blog", "/admin/blogs")}
                />
                <SubNavItem
                  icon={<FileTextIcon />}
                  label="Case Studies"
                  active={activeTab === "casestudies"}
                  onClick={() => handleNavigation("casestudies", "/admin/casestudies")}
                />
                <SubNavItem
                  icon={<ToolsIcon />}
                  label="Free Tools"
                  active={activeTab === "freetools"}
                  onClick={() => handleNavigation("freetools", "/admin/freetools")}
                />
              </div>
            )}
          </div>
        ) : (
          <NavItem
            icon={<ResourcesIcon />}
            label="Resources"
            active={["blog", "casestudies", "freetools"].includes(activeTab)}
            onClick={() => setSidebarOpen(true)}
            collapsed={true}
          />
        )}

        <NavItem
          icon={<AnalyticsIcon />}
          label="Analytics"
          active={activeTab === "analytics"}
          onClick={() => handleNavigation("analytics", "/admin/analytics")}
          collapsed={!sidebarOpen}
        />
        <NavItem
          icon={<RevenueIcon />}
          label="Revenue"
          active={activeTab === "revenue"}
          onClick={() => handleNavigation("revenue", "/admin/revenue")}
          collapsed={!sidebarOpen}
        />
        <NavItem
  icon={<ContactIcon />}
  label="Contact"
  active={activeTab === "contact"}
  onClick={() => handleNavigation("contact", "/admin/contact")}
  collapsed={!sidebarOpen}
/>
<NavItem
  icon={<BootcampIcon />}
  label="Bootcamp"
  active={activeTab === "bootcamp"}
  onClick={() => handleNavigation("bootcamp", "/admin/bootcamp")}
  collapsed={!sidebarOpen}
/>

        <NavItem
          icon={<SettingsIcon />}
          label="Settings"
          active={activeTab === "settings"}
          onClick={() => handleNavigation("settings", "/admin/settings")}
          collapsed={!sidebarOpen}
        />
      </nav>
      

      {/* User Section */}
      <div className="p-4 border-t border-blue-800">
        {sidebarOpen ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center font-bold text-blue-900 shadow-md">
                {adminAuth?.user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {adminAuth?.user?.name || "Admin"}
                </p>
                <p className="text-xs text-blue-300">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-400 hover:bg-blue-800 p-2 rounded transition-colors"
              title="Logout"
            >
              <LogoutIcon />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full flex justify-center text-white hover:text-red-400 hover:bg-blue-800 p-2 rounded transition-colors"
          >
            <LogoutIcon />
          </button>
        )}
      </div>
    </aside>
  );
};

// Navigation Item Component
const NavItem = ({ icon, label, active, onClick, collapsed }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
      active
        ? "bg-yellow-500 text-blue-900 font-semibold shadow-md"
        : "text-blue-100 hover:bg-blue-800"
    } ${collapsed ? "justify-center px-2" : ""}`}
    title={collapsed ? label : ""}
  >
    <span className="flex-shrink-0">{icon}</span>
    {!collapsed && <span className="text-sm">{label}</span>}
  </button>
);

// Sub Navigation Item Component
const SubNavItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all text-sm ${
      active
        ? "bg-yellow-500 text-blue-900 font-semibold shadow-md"
        : "text-blue-200 hover:bg-blue-800 hover:text-white"
    }`}
  >
    <span className="flex-shrink-0">{icon}</span>
    <span>{label}</span>
  </button>
);

// Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ClientsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ResourcesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const BlogIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ToolsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const RevenueIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default SideNavBar;
