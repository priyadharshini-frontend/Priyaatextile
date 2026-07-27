"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useProductStore } from "@/store/ProductStore";
import { useProducts } from "@/hooks/useProducts";

/* ---------------------------------------------------------
   Design tokens (kept local so this file is drop-in safe)
   Ink      #3D1F1F  deep maroon, matches existing headings
   Gold     #C9A227  antique gold (richer than the old #d4af37)
   Shimmer  #F4D374  bright temple-gold for the moving highlight
   Teal     #0B4F4A  peacock teal — the one contrast accent,
                     borrowed from the "attached border" color
                     you actually see woven onto a Kanjivaram pallu
   Rust     #8B3A2F  CTA accent
--------------------------------------------------------- */

const collections = [
  {
    id: 1,
    title: "Silk Saree",
    tagline: "Kanchipuram, hand-loomed",
    category: "sarees",
    subCategory: "kanchipuram-silk-sarees",
    image: "/images/category/saree.jpeg",
  },
  {
    id: 2,
    title: "Cotton Saree",
    tagline: "Everyday handloom cotton",
    category: "sarees",
    subCategory: "cotton-sarees",
    image: "/images/category/women.jpeg",
  },
  {
    id: 3,
    title: "New Arrivals",
    tagline: "Fresh off the loom",
    category: "new-arrivals",
    image: "/images/category/men.jpeg",
  },
  {
    id: 4,
    title: "Best Seller",
    tagline: "Chosen again and again",
    category: "best-seller",
    image: "/images/category/girl.jpeg",
  },
];

const trustStats = [
  { id: "delivered", end: 9200, suffix: "+", label: "Sarees delivered across India" },
  { id: "rating", end: 4.8, decimals: 1, suffix: "/5", label: "Average customer rating" },
  { id: "silkmark", end: 100, suffix: "%", label: "Silk Mark certified weaves" },
];

function useCountUp(target: number, decimals: number, start: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const duration = 1400;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);
  return decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-IN");
}

function StatItem({
  end,
  decimals = 0,
  suffix,
  label,
  start,
}: {
  end: number;
  decimals?: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const display = useCountUp(end, decimals, start);
  return (
    <div className="flex flex-col items-center text-center px-4 py-2 min-w-[140px]">
      <span
        className="font-serif text-3xl md:text-4xl font-semibold tabular-nums"
        style={{ color: "#3D1F1F" }}
      >
        {display}
        <span style={{ color: "#0B4F4A" }}>{suffix}</span>
      </span>
      <span className="mt-1 text-xs md:text-[13px] tracking-wide text-stone-600 uppercase">
        {label}
      </span>
    </div>
  );
}

/* Contra-rotating "temple border" ring — the signature element.
   Outer ring: a beaded (kasu-style) coin border, rotates clockwise, slow.
   Inner ring: a thin gold hairline with a moving shimmer, rotates the
   opposite way, faster — echoing how a Kanjivaram's contrast border
   is woven on at an angle to the body of the saree. */
function TempleRing({ paused }: { paused: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ animationPlayState: paused ? "paused" : "running" }}
    >
      <defs>
        <linearGradient id="shimmerGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C9A227" />
          <stop offset="45%" stopColor="#F4D374" />
          <stop offset="55%" stopColor="#F4D374" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>
      <g className="ring-outer" style={{ animationPlayState: paused ? "paused" : "running" }}>
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="#C9A227"
          strokeWidth="3.2"
          strokeDasharray="2.6 4.2"
          strokeLinecap="round"
        />
      </g>
      <g className="ring-inner" style={{ animationPlayState: paused ? "paused" : "running" }}>
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#shimmerGold)"
          strokeWidth="1.1"
        />
      </g>
    </svg>
  );
}

export const Collection = () => {
  useProducts();
  useProductStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-[#F6F2EA]">
      {/* faint paisley wash, purely atmospheric */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #C9A227 0, transparent 40%), radial-gradient(circle at 80% 70%, #0B4F4A 0, transparent 45%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-4">
          <span
            className="text-xs md:text-sm tracking-[0.25em] uppercase font-medium mb-4"
            style={{ color: "#0B4F4A" }}
          >
            Handloom · Heritage · Handpicked
          </span>

          <h2
            className="font-serif text-4xl md:text-5xl font-semibold text-center"
            style={{ color: "#3D1F1F" }}
          >
            Our Exclusive Collection
          </h2>

          <p className="mt-3 max-w-xl text-center text-stone-600 text-sm md:text-base">
            Four ways into the world of Kanchipuram silk — every piece traced
            back to the loom it came from.
          </p>

          {/* animated zari divider */}
          <svg
            width="220"
            height="18"
            viewBox="0 0 220 18"
            className="mt-6"
            aria-hidden
          >
            <defs>
              <linearGradient id="dividerShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C9A227" stopOpacity="0" />
                <stop offset="50%" stopColor="#F4D374" stopOpacity="1" />
                <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="9" x2="220" y2="9" stroke="#C9A227" strokeWidth="1" />
            <rect
              x="0"
              y="6"
              width="70"
              height="6"
              fill="url(#dividerShimmer)"
              className="divider-sweep"
            />
            <path
              d="M110 2 L114 9 L110 16 L106 9 Z"
              fill="#C9A227"
            />
          </svg>
        </div>

        {/* Trust strip — grounded in real credibility signals for silk sarees */}
        <div
          ref={statsRef}
          className="flex flex-wrap justify-center gap-2 md:gap-6 mt-10 mb-16 py-6 border-y"
          style={{ borderColor: "rgba(201,162,39,0.3)" }}
        >
          {trustStats.map((s) => (
            <StatItem
              key={s.id}
              end={s.end}
              decimals={s.decimals ?? 0}
              suffix={s.suffix}
              label={s.label}
              start={statsVisible}
            />
          ))}
        </div>

        {/* Category rings */}
        <div
          className="flex gap-8 overflow-x-auto md:grid md:grid-cols-4 md:gap-10 md:overflow-visible pb-4"
        >
          {collections.map((item, i) => (
            <Link
              key={item.id}
              href={`/product?category=${item.category}${
                item.subCategory ? `&subcategory=${item.subCategory}` : ""
              }`}
              className="flex-shrink-0 group text-center flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-32 h-32 md:w-52 md:h-52">
                <TempleRing paused={hoveredIndex === i} />
                <div className="absolute inset-[10%] rounded-full overflow-hidden shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <p
                className="mt-4 font-serif text-lg font-medium"
                style={{ color: "#3D1F1F" }}
              >
                {item.title}
              </p>
              <span className="relative text-xs uppercase tracking-wide text-stone-500">
                {item.tagline}
                <span className="tagline-underline" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <Link
            href="/product"
            className="cta-shimmer group relative inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm md:text-base"
            style={{
              color: "#3D1F1F",
              border: "1.5px solid #8b1e1e",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Collection
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin-cw {
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          to { transform: rotate(-360deg); }
        }
        .ring-outer {
          transform-origin: 50% 50%;
          animation: spin-cw 22s linear infinite;
        }
        .ring-inner {
          transform-origin: 50% 50%;
          animation: spin-ccw 14s linear infinite;
        }

        @keyframes sweep {
          0% { transform: translateX(-40px); }
          100% { transform: translateX(240px); }
        }
        .divider-sweep {
          animation: sweep 3.2s ease-in-out infinite;
        }

        .tagline-underline {
          position: absolute;
          left: 50%;
          bottom: -3px;
          width: 0%;
          height: 1px;
          background: #C9A227;
          transition: width 0.3s ease, left 0.3s ease;
        }
        .group:hover .tagline-underline {
          width: 100%;
          left: 0%;
        }

        .cta-shimmer {
          background: linear-gradient(90deg, #F6F2EA 0%, #F6F2EA 100%);
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-shimmer:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(201, 162, 39, 0.25);
        }
        .cta-shimmer::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 20%,
            rgba(244, 211, 116, 0.55) 45%,
            transparent 70%
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .cta-shimmer:hover::before {
          transform: translateX(100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .ring-outer, .ring-inner, .divider-sweep, .cta-shimmer::before {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};