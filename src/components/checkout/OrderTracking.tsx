import { CheckCircle2, Circle, PackageCheck, Truck, ShoppingBag } from "lucide-react";

const trackSteps = [
  { label: "Order confirmed", time: "Today, 3:42 PM", done: true, active: false },
  { label: "Being packed", time: "In progress", done: false, active: true },
  { label: "Shipped", time: "Expected tomorrow", done: false, active: false },
  { label: "Delivered", time: "25 – 27 June 2026", done: false, active: false },
];

export default function OrderTracking() {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-5">
      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
        <Truck className="w-4 h-4 text-[#7A1F3D]" />
        Order tracking
      </h3>

      <div className="flex flex-col">
        {trackSteps.map((step, i) => (
          <div key={step.label} className="flex gap-4">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full mt-0.5 flex-shrink-0
                  ${step.done ? "bg-[#7A1F3D]" : ""}
                  ${step.active ? "bg-[#7A1F3D] ring-4 ring-rose-100" : ""}
                  ${!step.done && !step.active ? "bg-stone-200 border border-stone-300" : ""}
                `}
              />
              {i < trackSteps.length - 1 && (
                <div className={`w-px flex-1 my-1 ${step.done ? "bg-rose-200" : "bg-stone-200"}`} />
              )}
            </div>

            {/* Content */}
            <div className="pb-5">
              <p
                className={`text-sm font-medium ${
                  step.done || step.active ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{step.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}