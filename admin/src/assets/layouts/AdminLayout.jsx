import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNavBar from "../../components/SideNavBar";
import TopNavBar from "../../components/TopNavBar";

const AdminLayout = ({ children, activeTab }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/login");
  };

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 h-screen w-64 bg-blue-900 transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <SideNavBar activeTab={activeTab} setActiveTab={() => {}} />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Top Navbar - Fixed */}
        <header className="sticky top-0 z-20 bg-white shadow-sm">
          <TopNavBar 
            activeTab={activeTab} 
            handleLogout={handleLogout}
            onMenuToggle={handleMenuToggle}
            isSidebarOpen={isSidebarOpen}
          />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
