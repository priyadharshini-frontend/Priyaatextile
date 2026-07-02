"use client";

import { useState } from "react";
import ProductCard from "../product/ProductCard";
import { useProductStore } from "@/store/ProductStore";
import { useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";

export const Collection = () => {
  useProducts();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const categories = [
    {
      id: 1,
      name: "Silk Saree",
      image: "images/category/saree.jpeg",
    },
    {
      id: 2,
      name: "Cotton Saree",
      image: "images/category/women.jpeg",
    },
    {
      id: 3,
      name: "New Arrivals",
      image: "images/category/men.jpeg",
    },
    {
      id: 4,
      name: "Best Seller",
      image: "images/category/girl.jpeg",
    },
  ];

  return (
    <section
      className="relative py-10 overflow-hidden bg-[#F6F2EA]"
    
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* Left Content */}
            <div className="space-y-4 flex-1">
              {/* Badge */}

              <div className="flex flex-col items-center">
                <div className="w-30 ">
                  <img src="/design.webp" alt="" className="w-full" />
                </div>

                <h2
                  className="text-4xl font-bold text-center"
                  style={{ color: "#3d1f1f" }}
                >
                  Our Exclusive Collection
                </h2>
                <div className="w-30 ">
                  <img src="/design.webp" alt="" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="  flex gap-6 overflow-x-auto
  md:grid md:grid-cols-3 md:gap-8
  lg:grid-cols-4 lg:gap-50
  md:overflow-visible
  pb-2 
"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex-shrink-0 group text-center flex flex-col items-center"
            >
              <div
                className="w-30 h-30 md:w-55 md:h-55 rounded-full overflow-hidden border transition duration-300 group-hover:shadow-xl group-hover:scale-105"
                style={{ border: "2px solid #d4af37" }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-3 font-medium text-gray-800 group-hover:text-black">
                {category.name}
              </p>
            </button>
          ))}
        </div>

        <div className="flex gap-4 flex-col md:flex-row md:items-center justify-center mt-5">
          <button
            className="group relative px-4 py-2 font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 rounded-2xl overflow-hidden text-red-800"
            style={{
              border: "#8b1e1e",
              boxShadow: "0 8px 24px rgba(139, 30, 30, 0.2)",
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
          </button>
        </div>
      </div>

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
