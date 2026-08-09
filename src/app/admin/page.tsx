"use client";

import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

/**
 * FONT SETUP
 * This redesign pairs Fraunces (a warm, slightly editorial serif — used
 * sparingly for numerals and section titles, echoing a bookkeeping ledger)
 * with Inter (for labels, body copy, and UI chrome).
 *
 * For production, load these via next/font instead of the CSS @import
 * below (which is here only so this file works as a drop-in):
 *
 *   import { Fraunces, Inter } from "next/font/google";
 *   const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
 *   const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
 *
 * ...and swap the font-['Fraunces'] / font-['Inter'] classes below for
 * font-[family-name:var(--font-fraunces)] etc.
 */

interface StatCard {
  label: string;
  value: number;
  prefix?: string;
  delta: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  sparkline?: number[];
}

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

interface RecentOrder {
  id: string;
  shippingName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

interface DashboardData {
  products: number;
  orders: number;
  revenue: number;
  recentOrders: RecentOrder[];
}

// ======================================================
// TOKENS
// ======================================================
// Ink   #12141C  — primary text / dark surfaces
// Gold  #B8863E  — accent, rules, links (deepened from brand #C99A3B for AA contrast on light)
// Parch #F8F5EE  — page wash
// Paper #FFFFFF  — card surface
// Line  #E8E1D1  — hairline borders (warm, not cool gray)
// Muted #8A8D99  — secondary text
// Good  #1F6F54  — paid / delivered
// Info  #2E5C8A  — shipped
// Bad   #B3492F  — cancelled

const statusStyle: Record<OrderStatus, string> = {
  PENDING: "bg-[#F1EEE6] text-[#6B6E7A]",
  PAID: "bg-[#EAF3EE] text-[#1F6F54]",
  SHIPPED: "bg-[#EAF0F7] text-[#2E5C8A]",
  DELIVERED: "bg-[#EAF3EE] text-[#1F6F54]",
  CANCELLED: "bg-[#F7EAE6] text-[#B3492F]",
};

// ======================================================
// GREETING
// ======================================================

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getToday() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

// ======================================================
// COUNT UP HOOK
// ======================================================

function useCountUp(value: number, durationMs = 900) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let animationFrame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, durationMs]);

  return display;
}

// ======================================================
// SPARKLINE
// ======================================================

function Sparkline({ points }: { points: number[] }) {
  if (!points || points.length < 2) return null;

  const width = 72;
  const height = 26;
  const max = Math.max(...points);
  const min = Math.min(...points);

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / (max - min || 1)) * height;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const path = `M${coords.join(" L")}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" className="overflow-visible">
      <path
        d={path}
        stroke="#C99A3B"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ======================================================
// STAT CARD — ledger-style: thin gold rule crowns each card,
// eyebrow label carries the icon, numeral set in Fraunces.
// ======================================================

function StatCardComponent({ stat, index }: { stat: StatCard; index: number }) {
  const Icon = stat.icon;
  const up = stat.delta >= 0;
  const count = useCountUp(stat.value);

  const formatted =
    stat.prefix === "₹"
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(count)
      : count.toLocaleString("en-IN");

  return (
    <div
      style={{ animationDelay: `${index * 90}ms` }}
      className="rise-in relative bg-white rounded-lg border border-[#E8E1D1] px-5 pt-5 pb-4 transition-all duration-200 hover:shadow-[0_10px_28px_-14px_rgba(18,20,28,0.25)] hover:-translate-y-0.5"
    >
      <span className="absolute top-0 left-5 right-5 h-[2px] bg-[#C99A3B]" aria-hidden />

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#8A8D99] font-['Inter'] font-semibold">
          <Icon size={14} className="text-[#B8863E]" />
          {stat.label}
        </span>

        {stat.delta !== 0 && (
          <span
            className={`flex items-center gap-0.5 text-xs font-medium font-['Inter'] ${
              up ? "text-[#1F6F54]" : "text-[#B3492F]"
            }`}
          >
            {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {Math.abs(stat.delta)}%
          </span>
        )}
      </div>

      <div className="flex items-end justify-between mt-3">
        <p className="font-['Fraunces'] text-[28px] leading-none text-[#12141C] tabular-nums">
          {formatted}
        </p>

        {stat.sparkline && stat.sparkline.length > 0 && (
          <Sparkline points={stat.sparkline} />
        )}
      </div>
    </div>
  );
}

// ======================================================
// SKELETONS
// ======================================================

function StatSkeleton() {
  return (
    <div className="relative bg-white rounded-lg border border-[#E8E1D1] px-5 pt-5 pb-4">
      <span className="absolute top-0 left-5 right-5 h-[2px] bg-[#EDE6D6]" aria-hidden />
      <div className="flex items-center justify-between">
        <div className="w-16 h-3 rounded bg-[#F1EEE6] animate-pulse" />
        <div className="w-8 h-3 rounded bg-[#F1EEE6] animate-pulse" />
      </div>
      <div className="mt-4">
        <div className="w-28 h-7 rounded bg-[#F1EEE6] animate-pulse" />
      </div>
    </div>
  );
}

function OrderSkeleton() {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div>
        <div className="w-28 h-4 rounded bg-[#F1EEE6] animate-pulse" />
        <div className="w-32 h-3 rounded bg-[#F1EEE6] animate-pulse mt-2" />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 h-4 rounded bg-[#F1EEE6] animate-pulse" />
        <div className="w-20 h-6 rounded-full bg-[#F1EEE6] animate-pulse" />
      </div>
    </div>
  );
}

// ======================================================
// MAIN DASHBOARD
// ======================================================

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    products: 0,
    orders: 0,
    revenue: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load dashboard");
      }

      setDashboard(result.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const stats: StatCard[] = [
    { label: "Products", value: dashboard.products, icon: Package, delta: 0 },
    { label: "Orders", value: dashboard.orders, icon: ShoppingCart, delta: 0 },
    { label: "Revenue", value: dashboard.revenue, prefix: "₹", icon: IndianRupee, delta: 0 },
  ];

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="space-y-6 font-['Inter']">
      {/* ================= FONTS + ANIMATION ================= */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap");

        @keyframes rise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .rise-in { animation: rise 0.5s ease-out both; }

        @media (prefers-reduced-motion: reduce) {
          .rise-in { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* ================= HEADER (ledger heading) ================= */}
      <div className="rise-in">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#B8863E] font-semibold">
              {getToday()}
            </p>
            <h1 className="font-['Fraunces'] italic text-[28px] text-[#12141C] mt-1">
              {getGreeting()}
            </h1>
          </div>
          <p className="text-sm text-[#8A8D99]">Here's how the store is doing today.</p>
        </div>

        {/* signature double rule */}
        <div className="mt-4 h-[2px] bg-[#C99A3B]" />
        <div className="mt-[3px] h-px bg-[#E8E1D1]" />
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="flex items-center justify-between bg-[#F7EAE6] border border-[#EAD3CB] text-[#B3492F] rounded-lg px-4 py-3 text-sm">
          <span>{error}</span>
          <button onClick={fetchDashboard} className="font-semibold underline">
            Retry
          </button>
        </div>
      )}

      {/* ================= STATS ================= */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatSkeleton />
          <StatSkeleton />
          <StatSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <StatCardComponent key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      )}

      {/* ================= RECENT ORDERS ================= */}
      <div
        className="rise-in bg-white rounded-lg border border-[#E8E1D1] overflow-hidden"
        style={{ animationDelay: "180ms" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E1D1]">
          <h2 className="font-['Fraunces'] text-lg text-[#12141C]">Recent Orders</h2>
          <a
            href="/admin/orders"
            className="text-[11px] uppercase tracking-[0.12em] text-[#B8863E] font-semibold hover:underline"
          >
            View all →
          </a>
        </div>

        {loading ? (
          <div className="divide-y divide-[#F1EEE6]">
            <OrderSkeleton />
            <OrderSkeleton />
            <OrderSkeleton />
            <OrderSkeleton />
            <OrderSkeleton />
          </div>
        ) : dashboard.recentOrders.length === 0 ? (
          <div className="py-14 text-center">
            <ShoppingCart size={32} className="mx-auto text-[#D8D2C0]" />
            <p className="font-['Fraunces'] text-[#12141C] mt-3">No orders yet</p>
            <p className="text-sm text-[#8A8D99] mt-1">New orders will appear here as they come in.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1EEE6]">
            {dashboard.recentOrders.map((order, i) => (
              <div
                key={order.id}
                style={{ animationDelay: `${240 + i * 60}ms` }}
                className="rise-in flex items-center justify-between gap-4 px-5 py-4 border-l-2 border-transparent hover:border-[#C99A3B] hover:bg-[#FBF9F3] transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#12141C] truncate">
                    {order.shippingName || "Customer"}
                  </p>
                  <p className="text-xs text-[#8A8D99] mt-0.5">
                    #{order.id.slice(-6)} · {formatDate(order.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="font-['Fraunces'] text-sm text-[#12141C] tabular-nums">
                    ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                  </span>

                  <span
                    className={`relative flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle[order.status]}`}
                  >
                    {order.status === "PENDING" && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#6B6E7A] opacity-75 animate-ping motion-reduce:animate-none" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#6B6E7A]" />
                      </span>
                    )}
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
