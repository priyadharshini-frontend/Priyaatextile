const testimonials = [
  {
    name: 'Priya Sharma',
    review:
      'Absolutely stunning quality. The saree looked even better in real life.',
  },
  {
    name: 'Ananya Rao',
    review:
      'Premium craftsmanship and fast delivery. Perfect wedding collection.',
  },
  {
    name: 'Meera Iyer',
    review:
      'Elegant designs with authentic handloom feel. Loved every detail.',
  },
];

export default function Testimonial() {
  return (
   <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold text-[#2b0d0d]">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Trusted by thousands of saree lovers
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-[30px] border border-[#eadfce] bg-[#faf7f2] p-10 shadow-sm"
            >
              <div className="mb-6 text-4xl text-[#d4af37]">★★★★★</div>

              <p className="text-lg leading-8 text-gray-600">
                {item.review}
              </p>

              <h3 className="mt-8 text-xl font-semibold text-[#2b0d0d]">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
