"use client";

const testimonials = [
  {
    id: 1,
    image: "/images/review/r1.jpeg",
    caption: "Genuine Heart",
  },
  {
    id: 2,
    image: "/images/review/r2.jpeg",
    caption: "Down to earth our queen ",
  },
  {
    id: 3,
     image: "/images/review/r3.jpeg",
    caption: "Online orders",
  },
  {
    id: 4,
     image: "/images/review/r4.jpeg",
    caption: "Successful delivery",
  },
   {
    id: 5,
     image: "/images/review/r5.jpeg",
    caption: "Custom saree review",
  },
];

function StarRating() {
  return (
    <div className="flex items-center justify-center gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="#E8B93F"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonial() {
  return (
    <section className="bg-[#F6F2EA] py-16 px-4 sm:px-8">
      <div className="space-y-4 flex-1">
        <div className="flex flex-col items-center">
          <div className="w-30 ">
            <img src="/design.webp" alt="" className="w-full" />
          </div>

          <h2
            className="text-4xl font-bold text-center"
            style={{ color: "#3d1f1f" }}
          >
            Happy Customers
          </h2>
          <div className="w-30 ">
            <img src="/design.webp" alt="" className="w-full" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden mt-10">
        <div className="flex w-max animate-marquee gap-8">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="w-[280px] flex-shrink-0 bg-[#F3EEE2] rounded-[28px] shadow-lg p-5 flex flex-col items-center"
            >
              <StarRating />

              <div className="w-full aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-4 text-center text-base text-[#2b2b2b] font-serif italic">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
