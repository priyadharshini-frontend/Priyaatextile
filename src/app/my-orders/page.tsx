import Navbar from "@/components/common/navbar/Navbar";
import { getCurrentUser } from "@/lib/curentUser";
import Link from "next/link";
import db from "@/lib/db";
import { redirect } from "next/navigation";


export default async function MyOrdersPage() {
     const user=await getCurrentUser();
     if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Please login to view your orders.</h1>
    </div>
  );
}

  const orders = await db.order.findMany({
  where: {
    userId: user.id,
  },
  include: {
    items: {
      include: {
        product: true,
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
});

if (!user) {
  redirect("/register");
}

  return (
    <>

     <Navbar user={user} />

    <div className="min-h-screen bg-gray-50 py-10 pt-30">
      <div className="max-w-5xl mx-auto px-4">
        {orders.length === 0 ? (
  <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
    <h2 className="text-2xl font-semibold text-gray-800">
      No Orders Yet
    </h2>

    <p className="text-gray-500 mt-2">
      You haven't placed any orders yet.
    </p>

    <Link
      href="/product"
      className="inline-block mt-6 px-6 py-3 rounded-xl bg-[#7A1F3D] text-white hover:bg-[#641731] transition"
    >
      Continue Shopping
    </Link>
  </div>
) : (
  orders.map((order: any) => (
           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10 " key={order.id}
>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-3 border-b">

            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <h2 className="font-semibold text-lg">
                #{order.id.slice(-8).toUpperCase()}
              </h2>
            </div>

            <div>
              <p className="text-sm text-gray-500">Placed On</p>
              <p className="font-medium">
               {new Date(order.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>

            <div>
              <span className="inline-flex px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
               {order.status}
              </span>
            </div>

          </div>

          {/* Products */}

         <div className="divide-y ">
  {order.items.map((item: any) => (
    <div
      key={item.id}
      className="flex items-center gap-4 p-3"
    >
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-20 h-20 rounded-xl object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">
          {item.product.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Quantity : {item.quantity}
        </p>
      </div>

      <div className="font-semibold text-lg">
        ₹{item.price}
      </div>
    </div>
  ))}
</div>

          {/* Footer */}

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-gray-50">

            <div>

              <p className="text-gray-500 text-sm">
                Total Amount
              </p>

              <h2 className="text-2xl font-bold text-[#7A1F3D]">
              ₹{order.totalAmount.toLocaleString("en-IN")}
              </h2>

            </div>

            <div className="flex gap-3">

              <Link
  href={`/my-orders/${order.id}`}
  className="px-6 py-3 rounded-xl border border-[#7A1F3D] text-[#7A1F3D] font-medium hover:bg-[#7A1F3D] hover:text-white transition"
>
  View Details
</Link>

              <button className="px-6 py-3 rounded-xl bg-[#7A1F3D] text-white font-medium hover:bg-[#641731] transition">
                Buy Again
              </button>

            </div>

          </div>

        </div>
  ))
)}

         

            

       
    

      </div >
    </div>
    </>
   
  );
}