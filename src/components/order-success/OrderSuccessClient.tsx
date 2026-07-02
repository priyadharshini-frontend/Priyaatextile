"use client";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderSuccessClient() {
  const [confetti, setConfetti] = useState<{ id: number; left: number; delay: number; color: string }[]>([]);
const searchParams = useSearchParams();

const orderId = searchParams.get("orderId");
  useEffect(() => {
    const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899", "#8b5cf6"];
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="success-wrapper">
      {confetti.map((c) => (
        <span
          key={c.id}
          className="confetti-piece"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            backgroundColor: c.color,
          }}
        />
      ))}

      <div className="success-card">
        <div className="check-circle">
          <svg viewBox="0 0 52 52" className="check-svg">
            <circle className="check-circle-bg" cx="26" cy="26" r="24" />
            <path className="check-mark" fill="none" d="M14 27l7 7 16-16" />
          </svg>
        </div>

        <h1 className="success-title">Order Placed Successfully</h1>
        <p className="success-sub">Thank you for your purchase — we're getting it ready for you.</p>

        <div className="order-id-badge">
          Order ID: <span>#{orderId?.slice(-8).toUpperCase()}</span>
        </div>

        <Link href="/product" className="continue-btn">
          Continue Shopping
        </Link>
      </div>

      <style jsx>{`
        .success-wrapper {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%);
          padding: 1.5rem;
        }

        .success-card {
          position: relative;
          z-index: 2;
          background: #fff;
          border-radius: 1.25rem;
          padding: 3rem 2.5rem;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.15);
          animation: cardPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        @keyframes cardPop {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .check-circle {
          width: 96px;
          height: 96px;
          margin: 0 auto 1.5rem;
        }

        .check-svg {
          width: 100%;
          height: 100%;
        }

        .check-circle-bg {
          stroke: #22c55e;
          stroke-width: 2.5;
          fill: rgba(34, 197, 94, 0.08);
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: circleDraw 0.6s ease-out 0.1s forwards;
        }

        .check-mark {
          stroke: #22c55e;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: checkDraw 0.4s ease-out 0.7s forwards;
        }

        @keyframes circleDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes checkDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .success-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.5rem;
          opacity: 0;
          animation: fadeUp 0.5s ease-out 0.9s forwards;
        }

        .success-sub {
          color: #6b7280;
          margin: 0 0 1.5rem;
          font-size: 0.95rem;
          opacity: 0;
          animation: fadeUp 0.5s ease-out 1.05s forwards;
        }

        .order-id-badge {
          display: inline-block;
          background: #f3f4f6;
          color: #374151;
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          margin-bottom: 1.75rem;
          opacity: 0;
          animation: fadeUp 0.5s ease-out 1.2s forwards;
        }

        .order-id-badge span {
          font-weight: 700;
          color: #111827;
          letter-spacing: 0.02em;
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .continue-btn {
          display: inline-block;
          background: #16a34a;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          padding: 0.75rem 1.75rem;
          border-radius: 0.75rem;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
          opacity: 0;
          animation: fadeUp 0.5s ease-out 1.35s forwards;
        }

        .continue-btn:hover {
          background: #15803d;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -6px rgba(22, 163, 74, 0.5);
        }

        .confetti-piece {
          position: absolute;
          top: -10px;
          width: 8px;
          height: 14px;
          opacity: 0.9;
          border-radius: 2px;
          z-index: 1;
          animation: confettiFall 2.6s ease-in forwards;
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(540deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}