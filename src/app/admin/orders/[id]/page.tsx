import db from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import ExportAddressButton from "@/components/Admin/ExportAdressButton";
import OrderStatusSelect from "@/components/Admin/OrderStatusSelect";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const statusStyles: Record<string, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-700",

  PAID:
    "bg-green-100 text-green-700",

  SHIPPED:
    "bg-blue-100 text-blue-700",

  DELIVERED:
    "bg-emerald-100 text-emerald-700",

  CANCELLED:
    "bg-red-100 text-red-700",
};

export default async function AdminOrderDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const order = await db.order.findUnique({
    where: {
      id,
    },

    include: {
      user: true,

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

  const subtotal = order.items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const shipping = Math.max(
    0,
    order.totalAmount - subtotal
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <Link
              href="/admin/orders"
              className="inline-flex items-center text-sm text-gray-500 hover:text-[#7A1F3D] mb-3"
            >
              ← Back to Orders
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Order #{order.id.slice(-8).toUpperCase()}
            </h1>

            <p className="text-gray-500 mt-1">
              Placed on{" "}
              {new Date(
                order.createdAt
              ).toLocaleString("en-IN")}
            </p>
          </div>

          {/* Status */}

          {/* <div>
            <span
              className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                statusStyles[order.status] ||
                "bg-gray-100 text-gray-600"
              }`}
            >
              {order.status}
            </span>
          </div> */}
          <div>
  <OrderStatusSelect
    orderId={order.id}
    initialStatus={order.status}
  />
</div>

        </div>


        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="lg:col-span-2 space-y-6">


            {/* ===============================================
                ORDER ITEMS
            =============================================== */}

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

              <div className="px-5 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Items
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {order.items.length}{" "}
                  {order.items.length === 1
                    ? "product"
                    : "products"}
                </p>
              </div>


              <div className="divide-y">

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 flex gap-4"
                  >

                    {/* Product Image */}

                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">

                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}

                    </div>


                    {/* Product Information */}

                    <div className="flex-1 min-w-0">

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                        <div>

                          <h3 className="font-semibold text-gray-900">
                            {item.product.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            PTC:{" "}
                            {item.product.productCode}
                          </p>

                        </div>


                        <p className="font-semibold text-[#7A1F3D]">
                          ₹
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>


                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-gray-500">

                        <span>
                          Price: ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span>
                          Quantity:{" "}
                          {item.quantity}
                        </span>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>


            {/* ===============================================
                SHIPPING ADDRESS
            =============================================== */}

            <div className="bg-white rounded-2xl border shadow-sm">

            
                <div className="px-5 py-4 border-b flex items-center justify-between">
  <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
  <ExportAddressButton order={order} />
</div>
             

              <div className="p-5">

                <p className="font-semibold text-gray-900">
                  {order.shippingName}
                </p>

                <div className="text-sm text-gray-600 mt-2 space-y-1">

                  <p>
                    {order.shippingAddressLine1}
                  </p>

                  {order.shippingAddressLine2 && (
                    <p>
                      {order.shippingAddressLine2}
                    </p>
                  )}

                  <p>
                    {order.shippingCity},{" "}
                    {order.shippingState}
                  </p>

                  <p>
                    {order.shippingPostalCode}
                  </p>

                  <p>
                    {order.shippingCountry}
                  </p>

                </div>


                <div className="border-t mt-4 pt-4">

                  <p className="text-sm text-gray-500">
                    Phone
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {order.shippingPhone}
                  </p>

                </div>

              </div>

            </div>


            {/* ===============================================
                PAYMENT INFORMATION
            =============================================== */}

            <div className="bg-white rounded-2xl border shadow-sm">

              <div className="px-5 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment Information
                </h2>
              </div>

              <div className="p-5 space-y-4">

                <div className="flex justify-between gap-4 text-sm">

                  <span className="text-gray-500">
                    Payment Status
                  </span>

                  <span
                    className={`font-semibold ${
                      order.paymentId
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.paymentId
                      ? "Paid"
                      : "Pending"}
                  </span>

                </div>


                <div className="flex justify-between gap-4 text-sm">

                  <span className="text-gray-500">
                    Razorpay Order ID
                  </span>

                  <span className="font-medium text-gray-900 break-all text-right">
                    {order.razorpayOrderId ||
                      "-"}
                  </span>

                </div>


                <div className="flex justify-between gap-4 text-sm">

                  <span className="text-gray-500">
                    Payment ID
                  </span>

                  <span className="font-medium text-gray-900 break-all text-right">
                    {order.paymentId || "-"}
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="space-y-6">


            {/* ===============================================
                CUSTOMER
            =============================================== */}

            <div className="bg-white rounded-2xl border shadow-sm">

              <div className="px-5 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Customer
                </h2>
              </div>

              <div className="p-5">

                <p className="font-semibold text-gray-900">
                  {order.user.name ||
                    order.shippingName}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {order.user.email || "-"}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {order.user.mobile}
                </p>

              </div>

            </div>


            {/* ===============================================
                ORDER SUMMARY
            =============================================== */}

            <div className="bg-white rounded-2xl border shadow-sm">

              <div className="px-5 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="p-5 space-y-4">

                {/* Subtotal */}

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>


                {/* Shipping */}

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium">
                    ₹
                    {shipping.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>


                {/* Total */}

                <div className="border-t pt-4 flex justify-between">

                  <span className="font-semibold text-gray-900">
                    Total
                  </span>

                  <span className="text-xl font-bold text-[#7A1F3D]">
                    ₹
                    {order.totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

            </div>


            {/* ===============================================
                ORDER INFORMATION
            =============================================== */}

            <div className="bg-white rounded-2xl border shadow-sm">

              <div className="px-5 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Information
                </h2>
              </div>

              <div className="p-5 space-y-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Order ID
                  </p>

                  <p className="text-sm font-medium text-gray-900 break-all mt-1">
                    {order.id}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-gray-500">
                    Created
                  </p>

                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {new Date(
                      order.createdAt
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>


                <div>
                  <p className="text-xs text-gray-500">
                    Last Updated
                  </p>

                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {new Date(
                      order.updatedAt
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}