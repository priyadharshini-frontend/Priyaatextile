
export default function NewsLetter() {
  return (
  <section className="bg-[#2b0d0d] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">

        <span className="text-sm uppercase tracking-[4px] text-[#d4af37]">
          Stay Updated
        </span>

        <h2 className="mt-6 text-5xl font-bold leading-tight text-white">
          Get Exclusive Offers & New Arrivals
        </h2>

        <p className="mt-6 text-lg text-gray-300">
          Subscribe to receive luxury collection updates and festive offers.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-14 flex-1 rounded-xl border border-white/20 bg-white/10 px-5 text-white outline-none backdrop-blur-md"
          />

          <button className="rounded-xl bg-[#d4af37] px-8 py-4 font-semibold text-black transition hover:scale-105">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}
