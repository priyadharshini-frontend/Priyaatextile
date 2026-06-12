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

const colors = [
  '#8B0000',
  '#D4AF37',
  '#2F4F4F',
  '#FF69B4',
  '#000000',
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
    <aside className="rounded-3xl bg-white p-6 shadow-sm border border-[#eadfce]">

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

      {/* Colors */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-[#3d1f1f]">
          Colors
        </h3>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              className="h-8 w-8 rounded-full border-2 border-gray-200 hover:scale-110 transition"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Material */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-[#3d1f1f]">
          Material
        </h3>

        <div className="space-y-3">
          {materials.map((material) => (
            <label
              key={material}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#8b1e1e]"
              />

              <span className="text-gray-700">
                {material}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-4 text-[#3d1f1f]">
          Customer Rating
        </h3>

        <div className="space-y-3">
          {[5, 4, 3].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                className="accent-[#8b1e1e]"
              />

              <span className="text-gray-700">
                {'★'.repeat(rating)}
                {'☆'.repeat(5 - rating)}
                &nbsp;& Up
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}