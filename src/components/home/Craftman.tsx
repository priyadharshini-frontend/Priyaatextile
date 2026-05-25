import Image from 'next/image';

export const Craftman = () => {
  return (
        <section className="bg-[#f8f3eb] py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        
        <div className="relative h-[550px] overflow-hidden rounded-[40px]">
          {/* <Image
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000"
            alt="Craftsmanship"
            fill
            className="object-cover"
          /> */}
        </div>

        <div>
          <span className="text-sm font-semibold uppercase tracking-[4px] text-[#8b1e1e]">
            Our Heritage
          </span>

          <h2 className="mt-6 text-5xl font-bold leading-tight text-[#2b0d0d]">
            Handwoven Traditions Passed Through Generations
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-600">
            Every saree is crafted by skilled artisans who preserve
            centuries of weaving traditions, combining timeless artistry
            with modern elegance.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-4xl font-bold text-[#8b1e1e]">25+</h3>
              <p className="mt-2 text-gray-600">Years of Heritage</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#8b1e1e]">10k+</h3>
              <p className="mt-2 text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
