import { CreditCard, Smartphone, Building2, Wallet } from "lucide-react";

const methods = [
  { icon: CreditCard, label: "Cards" },
  { icon: Smartphone, label: "UPI" },
  { icon: Building2, label: "Net banking" },
  { icon: Wallet, label: "Wallets" },
];

export default function PaymentMethods() {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl px-5 py-4">
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">
        Accepted payment methods
      </p>
      <div className="flex flex-wrap gap-2">
        {methods.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 text-xs text-gray-500 border border-stone-200 rounded-lg px-3 py-1.5"
          >
            <Icon size={13} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}