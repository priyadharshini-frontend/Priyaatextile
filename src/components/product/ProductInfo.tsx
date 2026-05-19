import React from 'react'

export default function ProductInfo() {
  return (
      <div>
      
      <span className="text-sm uppercase tracking-[4px] text-[#8b1e1e]">
        Premium Collection
      </span>

      <h1 className="mt-4 text-5xl font-bold text-[#2b0d0d]">
        Royal Kanjivaram Silk Saree
      </h1>

      {/* Rating */}
      <div className="mt-6 flex items-center gap-3">
        <div className="text-[#d4af37]">
          ★★★★★
        </div>

        <span className="text-gray-500">
          (128 Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="mt-8 flex items-center gap-4">
        
        <span className="text-4xl font-bold text-[#8b1e1e]">
          ₹24,999
        </span>

        <span className="text-xl text-gray-400 line-through">
          ₹29,999
        </span>
      </div>

      {/* Description */}
      <p className="mt-8 text-lg leading-8 text-gray-600">
        Crafted with luxurious silk and intricate zari weaving,
        this saree embodies timeless elegance and heritage artistry.
      </p>

      {/* Sizes */}
      <div className="mt-10">
        
        <h3 className="mb-4 text-lg font-semibold">
          Select Size
        </h3>

        <div className="flex gap-4">
          {['S', 'M', 'L'].map((size) => (
            <button
              key={size}
              className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#eadfce] transition hover:bg-[#8b1e1e] hover:text-white"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-10">
        
        <h3 className="mb-4 text-lg font-semibold">
          Quantity
        </h3>

        <div className="flex w-[140px] items-center justify-between rounded-xl border border-[#eadfce] px-5 py-4">
          <button>-</button>

          <span>1</span>

          <button>+</button>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex gap-4">
        
        <button className="flex-1 rounded-xl bg-[#2b0d0d] py-5 text-sm font-semibold text-white transition hover:bg-[#8b1e1e]">
          Add To Cart
        </button>

        <button className="flex-1 rounded-xl border border-[#2b0d0d] py-5 text-sm font-semibold text-[#2b0d0d] transition hover:bg-[#2b0d0d] hover:text-white">
          Buy Now
        </button>
      </div>
    </div>
  )
}
