import { useState, useEffect } from "react";

const DashboardContent = () => {
  const [stats] = useState([
    { title: "Total Clients", value: "1,234", change: "+12.5%", icon: "👥", color: "blue" },
    { title: "Active Projects", value: "456", change: "+8.2%", icon: "💼", color: "green" },
    { title: "Revenue (₹ Cr)", value: "12.5", change: "+23.1%", icon: "💰", color: "yellow" },
    { title: "Downloads", value: "5,678", change: "+15.3%", icon: "📥", color: "purple" },
  ]);

  const [clients] = useState([
    { id: 1, name: "ABC Industries", email: "contact@abc.com", status: "Active" },
    { id: 2, name: "XYZ Corp", email: "info@xyz.com", status: "Pending" },
    { id: 3, name: "Tech Solutions", email: "hello@tech.com", status: "Active" },
  ]);

  const [actions] = useState([
    { id: 1, title: "Add Client", icon: "➕" },
    { id: 2, title: "New Blog Post", icon: "📝" },
    { id: 3, title: "Generate Report", icon: "📊" },
    { id: 4, title: "View Analytics", icon: "📈" },
  ]);

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Clients */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Clients</h3>
          <div className="space-y-4">
            {clients.map((client) => (
              <ClientRow
                key={client.id}
                name={client.name}
                email={client.email}
                status={client.status}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {actions.map((action) => (
              <ActionButton
                key={action.id}
                title={action.title}
                icon={action.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, change, icon, color }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    yellow: "from-yellow-500 to-yellow-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <span className="text-sm font-semibold text-green-600">{change}</span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

// Client Row Component
const ClientRow = ({ name, email, status }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
        status === "Active"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {status}
    </span>
  </div>
);

// Action Button Component
const ActionButton = ({ title, icon }) => (
  <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-left transition-colors">
    <div className="text-2xl mb-2">{icon}</div>
    <p className="text-sm font-semibold text-gray-900">{title}</p>
  </button>
);

export default DashboardContent;
