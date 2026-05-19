import Image from 'next/image';

export const PromoBanner = () => {
  return (
     <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[40px] bg-[#2b0d0d]">
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="grid items-center lg:grid-cols-2">
            <div className="relative z-10 p-10 lg:p-20">
              <span className="inline-block rounded-full border border-[#d4af37] px-4 py-2 text-sm text-[#d4af37]">
                Premium Wedding Collection
              </span>

              <h2 className="mt-6 text-5xl font-bold leading-tight text-white">
                Celebrate Tradition, Celebrate You
              </h2>

              <p className="mt-6 max-w-lg text-lg text-gray-300">
                Discover handcrafted sarees made for weddings,
                festivals, and timeless memories.
              </p>

              <button className="mt-8 rounded-xl bg-[#d4af37] px-8 py-4 text-sm font-semibold text-black transition hover:scale-105">
                Shop Now
              </button>
            </div>

            <div className="relative h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000"
                alt="Wedding Saree"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
