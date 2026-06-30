"use client";

import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import ContactForm from "@/components/checkout/ContactForm";
import ShippingForm from "@/components/checkout/ShippingForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import Navbar from "@/components/common/navbar/Navbar";
import { getCurrentUser } from "@/lib/curentUser";

const mockItems = [
  { id: "1", name: "Kanjivaram Silk Saree", size: "Free size", qty: 1, price: 1999 },
  { id: "2", name: "Cotton Casual Saree", size: "M", qty: 1, price: 1001 },
];

export default  function CheckoutClient() {

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    const allFilled = Object.values(formData).every((v) => v.trim() !== "");
    if (!allFilled) {
      alert("Please fill all fields");
      return;
    }
    // Razorpay integration here
    localStorage.setItem(
  "checkoutData",
  JSON.stringify(formData)
);
    console.log(formData);
  };

  return (
    <>
  
      <div className="max-w-5xl mx-auto px-4 py-10 mt-30">
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">

        {/* Left */}
        <div className="bg-white border border-stone-200 rounded-2xl p-7">
          <CheckoutSteps currentStep={1} />
          <ContactForm data={formData} onChange={handleChange} />
          <ShippingForm data={formData} onChange={handleChange} />

          {/* CTA */}
          <button
            onClick={handleContinue}
            className="relative overflow-hidden w-full h-12 rounded-xl bg-[#7A1F3D] text-white font-semibold text-sm group/btn transition-colors duration-300"
          >
            <span className="absolute inset-0 bg-white -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-[#7A1F3D] transition-colors duration-300">
              <Lock size={15} /> Continue to payment
            </span>
          </button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
            <ShieldCheck size={13} /> Your information is encrypted and secure
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          <OrderSummary items={mockItems} />
         
        </div>

      </div>
    </div>
    </>
  
  );
}