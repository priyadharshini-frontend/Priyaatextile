import { useState } from "react";
import { ShoppingBag } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  size: string;
  qty: number;
  price: number;
}

interface Props {
  items: CartItem[];
}

export default function OrderSummary({ items }: Props) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "RAMYA10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      alert("Invalid coupon code");
    }
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-5">Order summary</h3>

      {/* Items */}
      <div className="flex flex-col divide-y divide-stone-100">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-[#7A1F3D] flex-shrink-0">
              <ShoppingBag size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {item.size} · Qty: {item.qty}
              </p>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              ₹{(item.price * item.qty).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex flex-col gap-2.5 mt-5">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Shipping</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">
            Free
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>− ₹{discount.toLocaleString("en-IN")}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-semibold text-gray-900 pt-3 border-t border-stone-100">
          <span>Total</span>
          <span className="text-[#7A1F3D]">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}