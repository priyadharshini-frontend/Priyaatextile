"use client";

import { Mail, ArrowRight } from "lucide-react";

export default function NewsLetter() {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Soft gold ambient glow */}
      <div className="absolute -top-32 left-10 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-[#d4af37]/5 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-[#b08b2d]">
              Join the Heritage Circle
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-[#2b0d0d] md:text-6xl">
              Be the first to
              <span className="block text-[#d4af37]">
                discover new drops
              </span>
            </h2>

            <p className="mt-6 max-w-md text-lg leading-8 text-gray-600">
              Exclusive saree collections, festive launches, and artisan stories — delivered directly to you.
            </p>

            {/* Stats */}
            <div className="mt-10 flex items-center gap-8 text-sm text-gray-500">
              <p>
                <span className="font-semibold text-[#2b0d0d]">12K+</span> Members
              </p>
              <p>Early Access Drops</p>
            </div>
          </div>

          {/* RIGHT FORM CARD */}
          <div className="relative">
            {/* soft frame glow */}
            <div className="absolute -inset-2 rounded-3xl bg-[#d4af37]/10 blur-2xl" />

            <div className="relative rounded-3xl border border-[#eadfce] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">

              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#d4af37]/10 p-3">
                  <Mail className="h-5 w-5 text-[#d4af37]" />
                </div>

                <p className="text-xs uppercase tracking-[0.25em] text-[#b08b2d]">
                  Subscribe
                </p>
              </div>

              {/* Input */}
              <div className="mt-8 space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-14 w-full rounded-2xl border border-[#eadfce] bg-[#faf7f2] px-5 text-[#2b0d0d] placeholder:text-gray-400 outline-none focus:border-[#d4af37]/60"
                />

                {/* Button */}
                <button className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#d4af37] font-semibold text-[#2b0d0d] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  Subscribe Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <p className="mt-5 text-xs text-gray-500">
                No spam. Only curated heritage collections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}