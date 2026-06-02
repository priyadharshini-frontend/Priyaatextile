'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { DashboardOverview } from './sections/DashboardOverview';
import { ProductManagement } from './sections/ProductManagement';
import { OrderManagement } from './sections/OrderManagement';
import { CustomerManagement } from './sections/CustomerManagement';
import { ReportsAnalytics } from './sections/ReportsAnalytics';
import { SettingsPanels } from './sections/SettingsPanels';

export const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#f1f3f5]">
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out;
        }

        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }

        .sidebar-transition {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .content-transition {
          transition: all 0.3s ease-out;
        }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden sidebar-transition">
          {/* Header */}
          <AdminHeader
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />

          {/* Content Area */}
          <main className="flex-1 overflow-auto content-transition">
            <div className="p-6 lg:p-8">
              {/* Dashboard Section */}
              {activeSection === 'dashboard' && (
                <div className="animate-fade-in-up">
                  <DashboardOverview />
                </div>
              )}

              {/* Products Section */}
              {activeSection === 'products' && (
                <div className="animate-fade-in-up">
                  <ProductManagement />
                </div>
              )}

              {/* Orders Section */}
              {activeSection === 'orders' && (
                <div className="animate-fade-in-up">
                  <OrderManagement />
                </div>
              )}

              {/* Customers Section */}
              {activeSection === 'customers' && (
                <div className="animate-fade-in-up">
                  <CustomerManagement />
                </div>
              )}

              {/* Reports Section */}
              {activeSection === 'reports' && (
                <div className="animate-fade-in-up">
                  <ReportsAnalytics />
                </div>
              )}

              {/* Settings Section */}
              {activeSection === 'settings' && (
                <div className="animate-fade-in-up">
                  <SettingsPanels />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
