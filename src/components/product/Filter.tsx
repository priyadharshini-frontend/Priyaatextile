'use client';

interface FilterSidebarProps {
  onClearFilters?: () => void;
}

const categories = [
  'Kanjivaram',
  'Banarasi',
  'Cotton',
  'Wedding',
];



const materials = [
  'Pure Silk',
  'Soft Silk',
  'Linen',
  'Cotton',
];

export default function Filter({
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <aside className="rounded-3xl bg-white p-6 shadow-sm border border-[#eadfce] w-72">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#3d1f1f]">
          Filters
        </h2>

        <button
          onClick={onClearFilters}
          className="text-sm text-[#8b1e1e] hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-[#3d1f1f]">
          Categories
        </h3>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#8b1e1e]"
              />

              <span className="text-gray-700">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-[#3d1f1f]">
          Price Range
        </h3>

        <input
          type="range"
          min={1000}
          max={50000}
          className="w-full accent-[#8b1e1e]"
        />

        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>₹1,000</span>
          <span>₹50,000</span>
        </div>
      </div>
    </aside>
  );
}