'use client';

import { useState } from 'react';

export const DashboardOverview = () => {
  const [timeRange, setTimeRange] = useState('7days');

  // Sample data
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹45,231',
      change: '+12.5%',
      icon: '💰',
      color: 'from-blue-400 to-blue-600',
      trend: 'up',
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      icon: '📦',
      color: 'from-green-400 to-green-600',
      trend: 'up',
    },
    {
      title: 'Total Customers',
      value: '567',
      change: '+5.1%',
      icon: '👥',
      color: 'from-purple-400 to-purple-600',
      trend: 'up',
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.3%',
      icon: '📈',
      color: 'from-orange-400 to-orange-600',
      trend: 'down',
    },
  ];

  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      amount: '₹2,499',
      status: 'Completed',
      date: '2024-01-15',
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      amount: '₹5,299',
      status: 'Processing',
      date: '2024-01-15',
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      amount: '₹1,899',
      status: 'Pending',
      date: '2024-01-14',
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Williams',
      amount: '₹3,599',
      status: 'Shipped',
      date: '2024-01-14',
    },
  ];

  const topProducts = [
    {
      name: 'Premium Kanjivaram Saree',
      sales: 234,
      revenue: '₹58,266',
      stock: 45,
    },
    {
      name: 'Banarasi Silk Saree',
      sales: 189,
      revenue: '₹62,411',
      stock: 32,
    },
    {
      name: 'Cotton Blend Saree',
      sales: 156,
      revenue: '₹20,244',
      stock: 78,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your business overview.</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {['7days', '30days', '90days', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {range === '7days'
                ? 'Last 7 Days'
                : range === '30days'
                  ? 'Last 30 Days'
                  : range === '90days'
                    ? 'Last 90 Days'
                    : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
            style={{
              animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`text-3xl p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <span
                className={`text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
              </span>
            </div>

            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders - 2 columns on lg */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{order.customer}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {order.amount}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                View All Orders →
              </button>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products</h2>

            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <p className="font-medium text-gray-900 text-sm mb-2">{product.name}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Sales: {product.sales}</span>
                      <span className="font-semibold text-gray-900">{product.revenue}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full"
                        style={{ width: `${(product.sales / 250) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Chart Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Trend</h2>

        <div
          className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-600 font-medium">Chart visualization area</p>
            <p className="text-sm text-gray-500">Revenue data over time would display here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
