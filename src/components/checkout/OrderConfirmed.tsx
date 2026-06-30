import { FileText, Home, Headphones } from "lucide-react";
import OrderTracking from "./OrderTracking";
import { CartItem } from "@/types/cart";

interface Props {
  items: CartItem[];
  orderId: string;
  total: number;
  address: string;
}

export default function OrderConfirmed({ items, orderId, total, address }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
      {/* Left */}
      <div className="bg-white border border-stone-200 rounded-2xl p-7">
        {/* Success icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Order placed successfully!</h2>
          <p className="text-sm text-gray-400">
            A confirmation has been sent to your email
          </p>
        </div>

        {/* Order details */}
        <div className="bg-stone-50 rounded-2xl p-5 mb-5">
          {[
            { label: "Order ID", value: orderId },
            { label: "Payment", value: "UPI · ₹" + total.toLocaleString("en-IN") },
            { label: "Expected delivery", value: "25 – 27 June 2026" },
            { label: "Delivering to", value: address },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-2 text-sm">
              <span className="text-gray-400">{label}</span>
              <span className="text-gray-800 font-medium">{value}</span>
            </div>
          ))}
        </div>

        <OrderTracking />

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button className="relative overflow-hidden h-11 rounded-xl border-[1.5px] border-[#7A1F3D] text-[#7A1F3D] font-medium text-sm group/btn transition-colors duration-300">
            <span className="absolute inset-0 bg-[#7A1F3D] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-white transition-colors duration-300">
              <FileText size={15} /> Download invoice
            </span>
          </button>
          
          <button className="relative overflow-hidden h-11 rounded-xl bg-[#7A1F3D] text-white font-medium text-sm group/btn transition-colors duration-300">
           <a href="/product">
            <span className="absolute inset-0 bg-white -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-[#7A1F3D] transition-colors duration-300">
              <Home size={15} /> Continue shopping
            </span>
              </a>
          </button>
        
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-4">
        {/* Items */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Items ordered</h3>
          <div className="flex flex-col divide-y divide-stone-100">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#7A1F3D] flex-shrink-0">
                  🛍
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.size} · Qty {item.qty}</p>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  ₹{(item.price * item.qty).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-semibold text-gray-900 pt-4 border-t border-stone-100 mt-1">
            <span>Total paid</span>
            <span className="text-[#7A1F3D]">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5">
          <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            <Headphones className="w-4 h-4 text-[#7A1F3D]" />
            Need help?
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            For any issues with your order, contact us at{" "}
            <span className="text-[#7A1F3D] font-medium">support@ramyacollections.com</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Or call <span className="text-gray-700 font-medium">+91 98765 00000</span>
          </p>
        </div>
      </div>
    </div>
  );
}