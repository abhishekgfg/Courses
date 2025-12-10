import DashboardContent from "../components/DashboardContent";

const Dashboard = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to your admin panel</p>
      </div>

      {/* Dashboard Content */}
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
