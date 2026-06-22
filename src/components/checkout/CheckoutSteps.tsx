interface Props {
  currentStep: 1 | 2 | 3;
}

const steps = ["Details", "Payment", "Confirm"];

export default function CheckoutSteps({ currentStep }: Props) {
  return (
    <div className="flex items-center mb-8">
      {steps.map((step, i) => {
        const num = i + 1;
        const isActive = num === currentStep;
        const isDone = num < currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
                  ${isActive ? "bg-[#7A1F3D] text-white" : ""}
                  ${isDone ? "bg-rose-100 text-[#7A1F3D]" : ""}
                  ${!isActive && !isDone ? "bg-stone-100 text-gray-400" : ""}
                `}
              >
                {num}
              </div>
              <span
                className={`text-sm ${isActive ? "text-[#7A1F3D] font-medium" : "text-gray-400"}`}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-12 h-px bg-stone-200 mx-3" />
            )}
          </div>
        );
      })}
    </div>
  );
}