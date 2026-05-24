import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-6 grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-500">Total Employees</h3>
            <p className="text-2xl font-bold">120</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-500">Active Users</h3>
            <p className="text-2xl font-bold">45</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-gray-500">Departments</h3>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

            <ul className="space-y-3">
              <li>New employee added</li>
              <li>User profile updated</li>
              <li>Admin logged in</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
