"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    review:
      "Absolutely stunning quality. The saree looked even better in real life.",
  },
  {
    name: "Ananya Rao",
    review:
      "Premium craftsmanship and fast delivery. Perfect wedding collection.",
  },
  {
    name: "Meera Iyer",
    review:
      "Elegant designs with authentic handloom feel. Loved every detail.",
  },
];

export default function Testimonial() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-bold text-[#2b0d0d]">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            Trusted by thousands of saree lovers
          </p>
        </div>

        {/* Layout */}
        <div className="relative mx-auto flex max-w-4xl items-center justify-center">
          {/* Background Cards */}
          <div className="absolute h-[320px] w-full rotate-[-6deg] rounded-[40px] bg-[#f5efe6]" />

          <div className="absolute h-[320px] w-full rotate-[6deg] rounded-[40px] border border-[#eadfce] bg-[#faf7f2]" />

          {/* Main Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full overflow-hidden rounded-[40px] border border-[#eadfce] bg-white p-12 shadow-[0_20px_60px_rgba(43,13,13,0.08)]"
            >
              {/* Top Glow */}
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#d4af37]/10 blur-3xl" />

              {/* Quote + Rating */}
              <div className="flex items-start justify-between gap-8">
                {/* Quote */}
                <div className="text-7xl leading-none text-[#d4af37]/20">
                  “
                </div>

                {/* Premium Rating */}
                <div className="group relative shrink-0">
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-[#d4af37]/20 blur-xl transition-all duration-500 group-hover:scale-110" />

                  <div className="relative overflow-hidden rounded-2xl border border-[#eadfce] bg-[#faf7f2]/90 px-5 py-4 shadow-lg backdrop-blur-md">
                    {/* Shine */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                    {/* Label */}
                    <p className="mb-2 text-center text-[10px] uppercase tracking-[0.3em] text-[#b08b2d]">
                      Customer Rating
                    </p>

                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className="text-xl text-[#d4af37] drop-shadow-sm transition-transform duration-300 hover:-translate-y-1"
                        >
                          ✦
                        </span>
                      ))}
                    </div>

                    {/* Bottom Text */}
                    <p className="mt-2 text-center text-sm font-medium text-[#2b0d0d]">
                      5.0 Excellence
                    </p>
                  </div>
                </div>
              </div>

              {/* Review */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="relative z-10 mt-6 max-w-3xl text-2xl leading-[1.9] text-gray-600"
              >
                {testimonials[current].review}
              </motion.p>

              {/* Divider */}
              <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-[#eadfce] to-transparent" />

              {/* Footer */}
              <div className="flex items-center justify-between">
                {/* User */}
                <div className="flex items-center gap-4">
                  {/* Initial Avatar */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2b0d0d] text-lg font-semibold text-white shadow-lg">
                    {testimonials[current].name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-[#2b0d0d]">
                      {testimonials[current].name}
                    </h3>

                    <p className="mt-1 text-sm uppercase tracking-[0.25em] text-[#b08b2d]">
                      Verified Buyer
                    </p>
                  </div>
                </div>

                {/* Indicators */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        current === index
                          ? "w-10 bg-[#d4af37]"
                          : "w-2 bg-[#d4af37]/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#d4af37] via-[#e7c96b] to-[#d4af37]" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}