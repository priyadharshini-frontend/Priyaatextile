'use client';

import { useState } from 'react';

export const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: '#ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: '₹2,499',
      items: 1,
      status: 'Completed',
      date: '2024-01-15',
      paymentMethod: 'Credit Card',
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: '₹5,299',
      items: 2,
      status: 'Processing',
      date: '2024-01-15',
      paymentMethod: 'UPI',
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      amount: '₹1,899',
      items: 1,
      status: 'Pending',
      date: '2024-01-14',
      paymentMethod: 'Debit Card',
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Williams',
      email: 'sarah@example.com',
      amount: '₹3,599',
      items: 3,
      status: 'Shipped',
      date: '2024-01-14',
      paymentMethod: 'Credit Card',
    },
    {
      id: '#ORD-005',
      customer: 'Robert Brown',
      email: 'robert@example.com',
      amount: '₹4,199',
      items: 2,
      status: 'Delivered',
      date: '2024-01-13',
      paymentMethod: 'UPI',
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-purple-100 text-purple-800',
    Completed: 'bg-green-100 text-green-800',
    Delivered: 'bg-emerald-100 text-emerald-800',
  };

  const statuses = ['Pending', 'Processing', 'Shipped', 'Completed', 'Delivered'];

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage and track your orders.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by Order ID, Customer name, or email..."
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
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orders List - 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`hover:bg-blue-50 transition-colors cursor-pointer ${
                        selectedOrder?.id === order.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.customer}</p>
                          <p className="text-xs text-gray-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-500 font-medium">No orders found</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Details */}
        {selectedOrder ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Order Info */}
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Order ID</p>
                <p className="text-lg font-bold text-gray-900">{selectedOrder.id}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Customer</p>
                <p className="font-medium text-gray-900">{selectedOrder.customer}</p>
                <p className="text-sm text-gray-600">{selectedOrder.email}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Amount</p>
                <p className="text-2xl font-bold text-gray-900">{selectedOrder.amount}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2">Status</p>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-sm font-medium focus:outline-none focus:border-blue-500 ${
                    statusColors[selectedOrder.status]
                  }`}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-600 mb-2">Items</p>
                <p className="text-sm text-gray-700">{selectedOrder.items} item(s)</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Payment Method</p>
                <p className="text-sm text-gray-700">{selectedOrder.paymentMethod}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Order Date</p>
                <p className="text-sm text-gray-700">{selectedOrder.date}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm">
                  📧 Send Email
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                  📄 Invoice
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">Select an order to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
