"use client";

import { useEffect, useRef, useState } from "react";
import { Package, ShoppingCart, IndianRupee, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCard {
  label: string;
  value: number;
  prefix?: string;
  delta: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  sparkline?: number[];
}

interface RecentOrder {
  id: string;
  customer: string;
  amount: string;
  status: "Delivered" | "Processing" | "Pending";
}

const stats: StatCard[] = [
  { label: "Products", value: 120, icon: Package, accent: "bg-[#12141C] text-[#E8E4D9]", delta: 4.2 },
  { label: "Orders", value: 45, icon: ShoppingCart, accent: "bg-[#C99A3B]/15 text-[#C99A3B]", delta: -2.1 },
  {
    label: "Revenue",
    value: 25000,
    prefix: "₹",
    icon: IndianRupee,
    accent: "bg-emerald-50 text-emerald-600",
    delta: 8.6,
    sparkline: [4, 7, 5, 9, 8, 12, 10, 15, 13, 18],
  },
];

const recentOrders: RecentOrder[] = [
  { id: "#3021", customer: "Aditi Rao", amount: "₹1,899", status: "Delivered" },
  { id: "#3020", customer: "Rahul Menon", amount: "₹3,450", status: "Processing" },
  { id: "#3019", customer: "Sneha Patil", amount: "₹899", status: "Pending" },
  { id: "#3018", customer: "Karan Shah", amount: "₹2,120", status: "Delivered" },
];

const statusStyle: Record<RecentOrder["status"], string> = {
  Delivered: "bg-emerald-50 text-emerald-600",
  Processing: "bg-[#C99A3B]/15 text-[#C99A3B]",
  Pending: "bg-gray-100 text-gray-500",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

/** Counts up from 0 to `value` once, respecting reduced-motion. */
function useCountUp(value: number, durationMs = 900) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, durationMs]);

  return display;
}

function Sparkline({ points }: { points: number[] }) {
  const width = 64;
  const height = 24;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / (max - min || 1)) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const path = `M${coords.join(" L")}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-500 [stroke-dasharray:120] [stroke-dashoffset:120] animate-[draw_1.1s_ease-out_0.3s_forwards] motion-reduce:[stroke-dashoffset:0] motion-reduce:animate-none"
      />
    </svg>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <style>{`
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rise-in { animation: rise 0.5s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .rise-in { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* Header */}
      <div className="rise-in">
        <h1 className="text-2xl font-bold text-[#12141C]">{getGreeting()} 👋</h1>
        <p className="text-gray-500 mt-1">Here's how the store is doing today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const up = stat.delta >= 0;
          const count = useCountUp(stat.value);
          const formatted =
            stat.prefix === "₹"
              ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(count)
              : count.toLocaleString("en-IN");

          return (
            <div
              key={stat.label}
              style={{ animationDelay: `${i * 90}ms` }}
              className="rise-in bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.accent}`}>
                  <Icon size={18} />
                </span>
                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    up ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {Math.abs(stat.delta)}%
                </span>
              </div>
              <div className="flex items-end justify-between mt-4">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#12141C] mt-0.5 tabular-nums">{formatted}</p>
                </div>
                {stat.sparkline && <Sparkline points={stat.sparkline} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="rise-in bg-white rounded-xl border border-gray-100 shadow-sm" style={{ animationDelay: "180ms" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-[#12141C]">Recent Orders</h2>
          <a href="/admin/orders" className="text-sm text-[#C99A3B] font-medium hover:underline">
            View all
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {recentOrders.map((order, i) => (
            <div
              key={order.id}
              style={{ animationDelay: `${240 + i * 60}ms` }}
              className="rise-in flex items-center justify-between px-5 py-3 hover:bg-gray-50/60 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-[#12141C]">{order.customer}</p>
                <p className="text-xs text-gray-400">{order.id}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[#12141C]">{order.amount}</span>
                <span
                  className={`relative flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle[order.status]}`}
                >
                  {order.status === "Pending" && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75 animate-ping motion-reduce:animate-none" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gray-400" />
                    </span>
                  )}
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}