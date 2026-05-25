import React from 'react'

export default function ProductHero() {
  return (
     <section className="relative flex h-[500px] items-center justify-center overflow-hidden bg-[#2b0d0d] ">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white py-20">
        
        <span className="text-sm uppercase tracking-[4px] text-[#d4af37]">
          Luxury Collection
        </span>

        <h1 className="mt-6 text-5xl font-bold lg:text-7xl">
          Our Saree Collection
        </h1>

        <p className="mt-6 text-lg text-gray-300">
          Discover timeless elegance crafted with tradition
        </p>
      </div>
    </section>
  )
}
