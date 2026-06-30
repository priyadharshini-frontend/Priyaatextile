"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface Props {
  onSuccess: () => void;
}

const steps = [
  "Verifying payment details",
  "Contacting payment gateway",
  "Confirming with bank",
  "Placing your order",
];

export default function ProcessingScreen({ onSuccess }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => {
        setCurrentStep(i + 1);
        if (i === steps.length - 1) {
          setTimeout(onSuccess, 600);
        }
      }, (i + 1) * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [onSuccess]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] py-16">
      {/* Spinner */}
      <div className="w-16 h-16 rounded-full border-4 border-rose-100 border-t-[#7A1F3D] animate-spin mb-6" />

      <h2 className="text-lg font-semibold text-gray-900 mb-2">Processing your payment</h2>
      <p className="text-sm text-gray-400 mb-10">Please don't close or refresh this page</p>

      {/* Steps */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {steps.map((step, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={step} className="flex items-center gap-3 text-sm">
              {done ? (
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              ) : active ? (
                <Loader2 className="w-4 h-4 text-[#7A1F3D] animate-spin flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
              )}
              <span
                className={
                  done ? "text-green-600" :
                  active ? "text-[#7A1F3D] font-medium" :
                  "text-gray-300"
                }
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}