'use client';

import { useState } from 'react';

export const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      totalOrders: 5,
      totalSpent: '₹12,495',
      lastOrder: '2024-01-15',
      segment: 'Premium',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 9876543211',
      totalOrders: 3,
      totalSpent: '₹8,597',
      lastOrder: '2024-01-14',
      segment: 'Standard',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 9876543212',
      totalOrders: 1,
      totalSpent: '₹1,899',
      lastOrder: '2024-01-10',
      segment: 'New',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+91 9876543213',
      totalOrders: 8,
      totalSpent: '₹28,792',
      lastOrder: '2024-01-12',
      segment: 'VIP',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert@example.com',
      phone: '+91 9876543214',
      totalOrders: 2,
      totalSpent: '₹5,798',
      lastOrder: '2024-01-08',
      segment: 'Standard',
      status: 'Inactive',
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSegment, setFilterSegment] = useState('all');
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  const segments = ['VIP', 'Premium', 'Standard', 'New'];

  const segmentColors = {
    VIP: 'bg-purple-100 text-purple-800',
    Premium: 'bg-blue-100 text-blue-800',
    Standard: 'bg-gray-100 text-gray-800',
    New: 'bg-green-100 text-green-800',
  };

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = filterSegment === 'all' || customer.segment === filterSegment;
    return matchesSearch && matchesSegment;
  });

  // Customer Statistics
  const stats = [
    {
      title: 'Total Customers',
      value: customers.length,
      icon: '👥',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Active Customers',
      value: customers.filter((c) => c.status === 'Active').length,
      icon: '✓',
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'VIP Members',
      value: customers.filter((c) => c.segment === 'VIP').length,
      icon: '👑',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Total Revenue',
      value: '₹57,581',
      icon: '💰',
      color: 'from-orange-400 to-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">Manage customer data and segments.</p>
      </div>

      {/* Stats */}
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
              <div className={`text-2xl p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <select
          value={filterSegment}
          onChange={(e) => setFilterSegment(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Segments</option>
          {segments.map((seg) => (
            <option key={seg} value={seg}>
              {seg}
            </option>
          ))}
        </select>
      </div>

      {/* Customers Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customers List - 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Segment
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Orders
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Spent
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      onClick={() => setSelectedCustomer(customer)}
                      className={`hover:bg-blue-50 transition-colors cursor-pointer ${
                        selectedCustomer?.id === customer.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{customer.name}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{customer.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            segmentColors[customer.segment]
                          }`}
                        >
                          {customer.segment}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {customer.totalOrders}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {customer.totalSpent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCustomers.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500 font-medium">No customers found</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Details */}
        {selectedCustomer ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Customer Profile</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                {selectedCustomer.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Name</p>
                <p className="font-medium text-gray-900">{selectedCustomer.name}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Email</p>
                <p className="text-sm text-gray-700">{selectedCustomer.email}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Phone</p>
                <p className="text-sm text-gray-700">{selectedCustomer.phone}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Segment</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                    segmentColors[selectedCustomer.segment]
                  }`}
                >
                  {selectedCustomer.segment}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Total Spent</p>
                    <p className="text-xl font-bold text-gray-900">{selectedCustomer.totalSpent}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Last Order</p>
                <p className="text-sm text-gray-700">{selectedCustomer.lastOrder}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm">
                  📧 Email
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                  📋 View Orders
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">Select a customer to view profile</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
