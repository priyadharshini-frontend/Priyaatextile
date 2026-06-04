'use client';

import { useState } from 'react';

export const AdminSidebar = ({ isOpen, activeSection, onSectionChange }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      subsections: [],
    },
    {
      id: 'products',
      label: 'Products',
      icon: '📦',
      subsections: [
        { id: 'products', label: 'All Products' },
        { id: 'products-add', label: 'Add Product' },
        { id: 'products-categories', label: 'Categories' },
      ],
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: '📋',
      subsections: [
        { id: 'orders', label: 'All Orders' },
        { id: 'orders-pending', label: 'Pending' },
        { id: 'orders-shipped', label: 'Shipped' },
      ],
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: '👥',
      subsections: [
        { id: 'customers', label: 'All Customers' },
        { id: 'customers-segments', label: 'Segments' },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📈',
      subsections: [
        { id: 'reports', label: 'Analytics' },
        { id: 'reports-sales', label: 'Sales Report' },
        { id: 'reports-inventory', label: 'Inventory' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      subsections: [
        { id: 'settings', label: 'General' },
        { id: 'settings-payment', label: 'Payment' },
        { id: 'settings-shipping', label: 'Shipping' },
      ],
    },
  ];

  return (
    <aside
      className={`bg-[#3d1212] text-white transition-all duration-300 overflow-hidden flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-center">
        <div className="text-2xl font-bold">💼</div>
        {isOpen && <span className="ml-2 font-bold text-lg">Admin Panel</span>}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Main Menu Item */}
            <button
              onClick={() => {
                onSectionChange(item.id);
                setExpandedMenu(expandedMenu === item.id ? null : item.id);
              }}
              className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 group ${
                activeSection === item.id
                  ? 'bg-[#d4af37] text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {isOpen && (
                <>
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.subsections.length > 0 && (
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedMenu === item.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0L5 14m7-7v12" />
                    </svg>
                  )}
                </>
              )}
            </button>

            {/* Submenu Items */}
            {isOpen && expandedMenu === item.id && item.subsections.length > 0 && (
              <div className="bg-gray-800 max-h-48 overflow-y-auto">
                {item.subsections.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onSectionChange(sub.id)}
                    className={`w-full px-4 py-2 pl-14 text-left text-sm transition-colors ${
                      activeSection === sub.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700 p-4">
        <button
          className="w-full px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm font-medium text-white flex items-center justify-center gap-2"
        >
          🚪
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
