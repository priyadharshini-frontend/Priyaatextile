  import Sidebar from "@/components/Admin/Sidebar";
  import Navbar from "@/components/Admin/Navbar";
  import { requireAdmin } from "@/lib/auth-guard";

  export default async function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
      await requireAdmin();
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
      

          {/* Page content */}
          <main className="flex-1 p-4 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }