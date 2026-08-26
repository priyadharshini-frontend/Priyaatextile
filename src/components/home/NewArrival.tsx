"use client";

import { useState } from "react";
import ProductCard from "../product/ProductCard";
import { useProductStore } from "@/store/ProductStore";

export const NewArrival = () => {
  const products = useProductStore((state) => state.products);

  // Only products marked as Featured / New Arrival
  const features = products.filter((p) => p.isFeatured === true);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // If there are no New Arrival products,
  // don't render the section at all.
  if (features.length === 0) {
    return null;
  }

  return (
    <section className="relative py-10 overflow-hidden bg-[#F6F2EA]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

            {/* Left Content */}
            <div className="space-y-4 flex-1">
              <div className="flex flex-col items-center">

                {/* Top Design */}
                <div className="w-30">
                  <img
                    src="/design.webp"
                    alt=""
                    className="w-full"
                  />
                </div>

                {/* Heading */}
                <h2
                  className="text-4xl font-bold text-center"
                  style={{ color: "#3d1f1f" }}
                >
                  New Arrival
                </h2>

                {/* Bottom Design */}
                <div className="w-30">
                  <img
                    src="/design.webp"
                    alt=""
                    className="w-full"
                  />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
          {features.map((product, index) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animation: `slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                  index * 0.1
                }s both`,
              }}
            >
              {/* Product Number */}
              <div
                className="mb-3 inline-block px-3 py-1 rounded-full text-xs font-bold text-white transition-all duration-500"
                style={{
                  backgroundColor: "#8b1e1e",
                  opacity: hoveredIndex === index ? 1 : 0.5,
                  transform:
                    hoveredIndex === index
                      ? "scale(1.1)"
                      : "scale(1)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Product */}
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex gap-4 flex-col md:flex-row md:items-center justify-center mt-5">
          <a
            href="/product"
            className="group relative px-4 py-2 font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 rounded-2xl overflow-hidden text-red-800"
            style={{
              border: "1px solid #8b1e1e",
              boxShadow:
                "0 8px 24px rgba(139, 30, 30, 0.2)",
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
              View All Collection

              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};