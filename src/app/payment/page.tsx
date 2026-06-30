"use client";

import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import PaymentMethod from "@/components/checkout/PaymentMethods";
import ProcessingScreen from "@/components/checkout/ProcessingScreen";
import OrderConfirmed from "@/components/checkout/OrderConfirmed";
import OrderSummary from "@/components/checkout/OrderSummary";
import Navbar from "@/components/common/navbar/Navbar";

type Screen = "payment" | "processing" | "confirmed";

const mockItems = [
  { id: "1", name: "Kanjivaram Silk Saree", size: "Free size", qty: 1, price: 1999 },
  { id: "2", name: "Cotton Casual Saree", size: "M", qty: 1, price: 1001 },
];

export default function PaymentPage() {
  const [screen, setScreen] = useState<Screen>("payment");

  return (
    <>
      <Navbar/>
    <div className="max-w-5xl mx-auto px-4 py-10 mt-25">
      {/* Steps — hidden on processing screen */}
      {screen !== "processing" && (
        <CheckoutSteps currentStep={screen === "confirmed" ? 3 : 2} />
      )}

      {/* Payment screen */}
      {screen === "payment" && (
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-7">
            <PaymentMethod onPay={() => setScreen("processing")} />
          </div>
          <div className="flex flex-col gap-4">
            <OrderSummary items={mockItems} />
            {/* Delivery address recap */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Delivering to
              </h3>
              <p className="text-sm font-medium text-gray-800">Priya Sharma</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                12, Anna Nagar, 3rd Cross,<br />
                Chennai, Tamil Nadu — 600040
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Processing screen */}
      {screen === "processing" && (
        <div className="bg-white border border-stone-200 rounded-2xl">
          <ProcessingScreen onSuccess={() => setScreen("confirmed")} />
        </div>
      )}

      {/* Confirmed screen */}
      {screen === "confirmed" && (
        <OrderConfirmed
          items={mockItems}
          orderId="#RC-20240622-8841"
          total={3000}
          address="Chennai, Tamil Nadu — 600040"
        />
      )}
    </div>
    </>
  
  );
}