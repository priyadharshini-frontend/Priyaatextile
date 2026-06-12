export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back 👋</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Products</h2>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-2xl font-bold">45</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold">₹25,000</p>
        </div>
      </div>
    </div>
  );
}