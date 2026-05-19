const categories = [
  'Kanjivaram',
  'Banarasi',
  'Silk Sarees',
  'Cotton Sarees',
  'Wedding Sarees',
];

const colors = [
  'Red',
  'Gold',
  'Green',
  'Blue',
  'Pink',
];

export default function Filter() {
  return (
    <div className="rounded-[30px] border border-[#eadfce] bg-white p-8 shadow-sm">
      
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#2b0d0d]">
          Filters
        </h2>
      </div>

      {/* Categories */}
      <div className="border-b border-[#eadfce] pb-8">
        
        <h3 className="mb-5 text-lg font-semibold text-[#2b0d0d]">
          Categories
        </h3>

        <div className="space-y-4">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 text-gray-600"
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#8b1e1e]"
              />

              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-[#eadfce] py-8">
        
        <h3 className="mb-5 text-lg font-semibold text-[#2b0d0d]">
          Price Range
        </h3>

        <input
          type="range"
          min="1000"
          max="50000"
          className="w-full accent-[#8b1e1e]"
        />

        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>₹1,000</span>
          <span>₹50,000</span>
        </div>
      </div>

      {/* Colors */}
      <div className="py-8">
        
        <h3 className="mb-5 text-lg font-semibold text-[#2b0d0d]">
          Colors
        </h3>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              className="rounded-full border border-[#eadfce] px-4 py-2 text-sm text-gray-600 transition hover:bg-[#8b1e1e] hover:text-white"
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Button */}
      <button className="mt-6 w-full rounded-xl bg-[#2b0d0d] py-4 text-sm font-semibold text-white transition hover:bg-[#8b1e1e]">
        Apply Filters
      </button>
    </div>
  )
}
