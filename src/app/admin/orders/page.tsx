import db from "@/lib/db";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!orders.length) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-semibold">
          No Orders Found
        </h1>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Orders
            </h1>

            <p className="text-gray-500 mt-2">
              Manage customer orders
            </p>
          </div>

          <button className="bg-[#7A1F3D] text-white px-6 py-3 rounded-xl hover:bg-[#651633] transition">
            Export Orders
          </button>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-2xl shadow-sm border p-5 mb-6">

          <div className="grid md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Search Order ID..."
              className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#7A1F3D]"
            />

            <select className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#7A1F3D]">
              <option>All Status</option>
              <option>PENDING</option>
              <option>PAID</option>
              <option>CONFIRMED</option>
              <option>PACKED</option>
              <option>SHIPPED</option>
              <option>DELIVERED</option>
              <option>CANCELLED</option>
            </select>

            <button className="bg-[#7A1F3D] text-white rounded-xl">
              Search
            </button>

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left p-4">Order ID</th>

                <th className="text-left p-4">Customer</th>

                <th className="text-left p-4">Amount</th>

                <th className="text-left p-4">Status</th>

                <th className="text-left p-4">Date</th>

                <th className="text-center p-4">Action</th>

              </tr>

            </thead>

        <tbody>
  {orders.map((order: any) => (
    <tr
      key={order.id}
      className="border-t hover:bg-gray-50"
    >
      <td className="p-4 font-medium">
        #{order.id.slice(-8).toUpperCase()}
      </td>

      <td className="p-4">
        <p className="font-semibold">
          {order.shippingName}
        </p>

        <p className="text-sm text-gray-500">
          {order.user.email}
        </p>
      </td>

      <td className="p-4 font-semibold">
        ₹{order.totalAmount.toLocaleString("en-IN")}
      </td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              order.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "PAID"
                ? "bg-green-100 text-green-700"
                : order.status === "CONFIRMED"
                ? "bg-blue-100 text-blue-700"
                : order.status === "PACKED"
                ? "bg-purple-100 text-purple-700"
                : order.status === "SHIPPED"
                ? "bg-orange-100 text-orange-700"
                : order.status === "DELIVERED"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {order.status}
        </span>
      </td>

      <td className="p-4">
        {new Date(order.createdAt).toLocaleDateString("en-IN")}
      </td>

      <td className="p-4 text-center">
        <Link
          href={`/admin/orders/${order.id}`}
          className="bg-[#7A1F3D] text-white px-4 py-2 rounded-lg hover:bg-[#651633]"
        >
          View
        </Link>
      </td>
    </tr>
  ))}
</tbody>

          </table>

        </div>

      </div>
    </div>
  );
}