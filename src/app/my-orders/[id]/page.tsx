import db from "@/lib/db";
import { getCurrentUser } from "@/lib/curentUser";
import { notFound } from "next/navigation";
import Navbar from "@/components/common/navbar/Navbar";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({ params }: Props) {

     
  const { id } = await params;

  const user = await getCurrentUser();

  if (!user) {
    notFound();
  }

  const order = await db.order.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }
  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen bg-gray-100 py-10 mt-24">
        <div className="max-w-5xl mx-auto px-4">
          {/* Heading */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>

            <p className="text-gray-500 mt-2">
              Thank you for shopping with us.
            </p>
          </div>

          {/* Order Information */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6">Order Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm">Order ID</p>
                <p className="font-semibold mt-1">
                  #{order.id.slice(-8).toUpperCase()}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  {order.status}
                </span>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Order Date</p>
                <p className="font-semibold mt-1">
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Payment ID</p>
                <p className="font-semibold mt-1">{order.paymentId}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}

          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

            <div className="space-y-2 text-gray-700">
              <p className="font-semibold">{order.shippingName}</p>

              <p>{order.shippingPhone}</p>

              <p>{order.shippingAddressLine1}</p>

              {order.shippingAddressLine2 && (
                <p>{order.shippingAddressLine2}</p>
              )}

              <p>{order.shippingCity}</p>

              <p>
                {order.shippingState} - {order.shippingPostalCode}
              </p>

              <p>{order.shippingCountry}</p>
            </div>
          </div>

          {/* Ordered Products */}

          <div className="space-y-5">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border rounded-xl p-4"
              >
                <img
                  src={item.product.image}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>

                  <p className="text-gray-500 mt-1">
                    Quantity : {item.quantity}
                  </p>

                  <p className="text-[#7A1F3D] font-semibold mt-2">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Amount</p>

                <h2 className="text-3xl font-bold text-[#7A1F3D] mt-2">
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </h2>
              </div>

              <a
                href="/product"
                className="bg-[#7A1F3D] text-white px-8 py-3 rounded-xl hover:bg-[#651633] transition"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
