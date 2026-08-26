"use client";

interface CartItem {
  id: string;
  name: string;
  size: string;
  qty: number;
  price: number;
  image: string;
}

interface Props {
  items: CartItem[];
  shipping: number;
  isFirstOrder: boolean | null;
}

export default function OrderSummary({
  items,
  shipping,
  isFirstOrder,
}: Props) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const total = subtotal + shipping;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6">
      {/* Heading */}
      <h3 className="text-base font-semibold text-gray-900 mb-5">
        Order summary
      </h3>

      {/* Products */}
      <div className="flex flex-col divide-y divide-stone-100">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 py-3"
            >
              {/* Product Image */}
              <div className="w-12 h-12 rounded-xl bg-rose-50 overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {item.name}
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  {item.size ? `${item.size} · ` : ""}
                  Qty: {item.qty}
                </p>
              </div>

              {/* Product Price */}
              <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                ₹
                {(item.price * item.qty).toLocaleString("en-IN")}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Price Details */}
      <div className="flex flex-col gap-3 mt-5">

        {/* Subtotal */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>

          <span>
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Shipping</span>

          {/* Still checking */}
          {isFirstOrder === null ? (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-500">
              Checking...
            </span>
          ) : isFirstOrder ? (
            /* First order */
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
              FREE
            </span>
          ) : shipping === 0 ? (
            /* No shipping */
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700">
              FREE
            </span>
          ) : (
            /* Normal shipping */
            <span className="text-sm font-medium text-gray-700">
              ₹{shipping.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center text-base font-semibold text-gray-900 pt-3 border-t border-stone-100">
          <span>Total</span>

          <span className="text-[#7A1F3D]">
            ₹{total.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* First Order Offer */}
      {isFirstOrder === true && (
        <div className="mt-4 rounded-xl bg-green-50 border border-green-100 px-4 py-3">
          <p className="text-xs font-medium text-green-700 text-center">
            🎉 First order offer — Free shipping!
          </p>
        </div>
      )}
    </div>
  );
}