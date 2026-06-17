"use client";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div>
      <p className="mb-2 text-sm text-gray-600">Size</p>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={`min-w-[44px] rounded-md px-3 py-2 text-sm transition ${
              selectedSize === size
                ? "border-2 border-[#8B1538] text-[#8B1538] font-medium"
                : "border border-gray-300 text-gray-700 hover:border-[#8B1538]/50"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}