'use client';

import { useState } from 'react';

export const ReportsAnalytics = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('30days');

  const reportCards = [
    {
      title: 'Total Sales',
      value: '₹2,45,890',
      change: '+23.5%',
      icon: '💰',
      trend: 'up',
    },
    {
      title: 'Orders',
      value: '234',
      change: '+12.1%',
      icon: '📦',
      trend: 'up',
    },
    {
      title: 'Customers',
      value: '89',
      change: '+8.3%',
      icon: '👥',
      trend: 'up',
    },
    {
      title: 'Avg. Order Value',
      value: '₹1,050',
      change: '-2.1%',
      icon: '📊',
      trend: 'down',
    },
  ];

  const salesByCategory = [
    { category: 'Kanjivaram', sales: 4500, percentage: 35 },
    { category: 'Banarasi', sales: 3200, percentage: 25 },
    { category: 'Cotton', sales: 2800, percentage: 22 },
    { category: 'Georgette', sales: 1900, percentage: 15 },
    { category: 'Wedding', sales: 800, percentage: 6 },
  ];

  const topSellingProducts = [
    {
      name: 'Premium Kanjivaram Saree',
      sales: 234,
      revenue: '₹58,266',
      growth: '+15%',
    },
    {
      name: 'Banarasi Silk Saree',
      sales: 189,
      revenue: '₹62,411',
      growth: '+12%',
    },
    {
      name: 'Cotton Blend Saree',
      sales: 156,
      revenue: '₹20,244',
      growth: '+8%',
    },
    {
      name: 'Wedding Bridal Saree',
      sales: 98,
      revenue: '₹58,702',
      growth: '+25%',
    },
  ];

  const monthlyData = [
    { month: 'Jan', sales: 65000, orders: 45 },
    { month: 'Feb', sales: 78000, orders: 52 },
    { month: 'Mar', sales: 92000, orders: 68 },
    { month: 'Apr', sales: 85000, orders: 61 },
    { month: 'May', sales: 110000, orders: 78 },
    { month: 'Jun', sales: 125000, orders: 89 },
  ];

  const maxSales = Math.max(...monthlyData.map((d) => d.sales));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Analyze your business performance and insights.</p>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="1year">Last 1 Year</option>
        </select>
      </div>

      {/* Report Type Selector */}
      <div className="flex gap-2 bg-white rounded-lg border border-gray-200 p-1 w-fit">
        {['sales', 'inventory', 'customers'].map((type) => (
          <button
            key={type}
            onClick={() => setReportType(type)}
            className={`px-6 py-2 rounded font-medium transition-all ${
              reportType === type
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {type === 'sales' ? 'Sales' : type === 'inventory' ? 'Inventory' : 'Customers'}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
            style={{
              animation: `fadeInUp 0.5s ease-out ${idx * 0.1}s both`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{card.icon}</div>
              <span
                className={`text-sm font-semibold ${
                  card.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {card.trend === 'up' ? '↑' : '↓'} {card.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Sales Trend</h2>

            <div className="space-y-6">
              {monthlyData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{data.month}</span>
                    <div className="flex gap-4">
                      <span className="text-sm text-gray-600">
                        Sales: <span className="font-bold text-gray-900">₹{data.sales.toLocaleString()}</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        Orders: <span className="font-bold text-gray-900">{data.orders}</span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${(data.sales / maxSales) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Category */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Sales by Category</h2>

            <div className="space-y-4">
              {salesByCategory.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm font-bold text-gray-900">₹{item.sales.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-pink-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.percentage}% of total</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Selling Products</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Sales
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topSellingProducts.map((product, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <p className="font-medium text-gray-900">{product.name}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">{product.sales} units</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    {product.revenue}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-green-600">
                    {product.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Report Button */}
      <div className="flex gap-4">
        <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          📊 Export Report (PDF)
        </button>
        <button className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
          📧 Email Report
        </button>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
