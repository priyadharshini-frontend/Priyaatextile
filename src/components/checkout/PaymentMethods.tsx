"use client";

import { useState } from "react";
import { Smartphone, CreditCard, Building2, Banknote } from "lucide-react";

type Method = "upi" | "card" | "netbanking" | "cod";

interface Props {
  onPay: () => void;
}

const methods = [
  { id: "upi" as Method, icon: Smartphone, label: "UPI", sub: "Pay via any UPI app" },
  { id: "card" as Method, icon: CreditCard, label: "Debit / Credit card", sub: "Visa, Mastercard, Rupay" },
  { id: "netbanking" as Method, icon: Building2, label: "Net banking", sub: "All major banks supported" },
  { id: "cod" as Method, icon: Banknote, label: "Cash on delivery", sub: "Pay when you receive" },
];

export default function PaymentMethod({ onPay }: Props) {
  const [selected, setSelected] = useState<Method>("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });

  return (
    <div>
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
        <CreditCard className="w-4 h-4 text-[#7A1F3D]" />
        Choose payment method
      </h2>

      <div className="flex flex-col gap-3 mb-6">
        {methods.map(({ id, icon: Icon, label, sub }) => (
          <div key={id}>
            <div
              onClick={() => setSelected(id)}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200
                ${selected === id
                  ? "border-[#7A1F3D] bg-rose-50"
                  : "border-stone-200 hover:border-stone-300"
                }`}
            >
              {/* Radio */}
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                  ${selected === id ? "border-[#7A1F3D]" : "border-stone-300"}`}
              >
                {selected === id && (
                  <div className="w-2 h-2 rounded-full bg-[#7A1F3D]" />
                )}
              </div>

              {/* Icon */}
              <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-[#7A1F3D] flex-shrink-0">
                <Icon size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>

            {/* UPI input */}
            {selected === "upi" && id === "upi" && (
              <div className="flex gap-2 mt-2 px-2">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="flex-1 h-9 rounded-xl border border-stone-200 text-sm px-3 outline-none focus:border-[#7A1F3D] focus:ring-2 focus:ring-[#7A1F3D]/10 placeholder:text-gray-300 transition"
                />
                <button className="h-9 px-4 rounded-xl bg-stone-100 text-sm text-gray-600 border border-stone-200 hover:bg-stone-200 transition">
                  Verify
                </button>
              </div>
            )}

            {/* Card fields */}
            {selected === "card" && id === "card" && (
              <div className="flex flex-col gap-3 mt-2 px-2">
                <Field label="Card number">
                  <input
                    type="text"
                    maxLength={19}
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    className={inputClass}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry">
                    <input
                      type="text"
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                      placeholder="MM / YY"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="CVV">
                    <input
                      type="password"
                      maxLength={4}
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                      placeholder="•••"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="Name on card">
                  <input
                    type="text"
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                    placeholder="Priya Sharma"
                    className={inputClass}
                  />
                </Field>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pay button */}
      <button
        onClick={onPay}
        className="relative overflow-hidden w-full h-12 rounded-xl bg-[#7A1F3D] text-white font-semibold text-sm group/btn transition-colors duration-300"
      >
        <span className="absolute inset-0 bg-white -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-in-out" />
        <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-[#7A1F3D] transition-colors duration-300">
          🔒 Pay ₹3,000 securely
        </span>
      </button>

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 mt-3">
        🛡 256-bit SSL encrypted payment
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest font-medium text-gray-400">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "h-10 rounded-xl border border-stone-200 bg-white text-sm text-gray-800 px-3 outline-none focus:border-[#7A1F3D] focus:ring-2 focus:ring-[#7A1F3D]/10 placeholder:text-gray-300 transition";