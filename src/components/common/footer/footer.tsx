'use client'
import { useEffect, useRef, useState } from 'react';
import {  Phone, Mail,ArrowRight,Hash,CircleFadingPlus,ThumbsUp, MapPin} from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  More: [
    { name: 'About us', href: '/about' },
    { name: 'Store location', href: '/location' },
    { name: 'Contact', href: '/contact' },
    { name: 'How to order', href: '/howOrder' },
  ],
  Policies: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Returns', href: '/returns' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Terms & Conditions', href: '/terms' },
  ],
};

const TEMPLE_TEETH = 28;

export default function Footer() {
  const borderRef = useRef(null);
  const [woven, setWoven] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setWoven(true);
      return;
    }

    const el = borderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWoven(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);


  return (
    <footer className="relative bg-[#2b0d0d] text-white overflow-hidden">
      <style>{`
        @keyframes weaveIn {
          from { opacity: 0; transform: scaleY(0.15) translateY(-6px); }
          to   { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        @keyframes threadShimmer {
          0%   { background-position: -150% 0; }
          100% { background-position: 250% 0; }
        }
        @keyframes paisleyFloat {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(-10px) rotate(3deg); }
        }
        .temple-tooth {
          opacity: 0;
          transform-origin: bottom center;
        }
        .temple-tooth.woven {
          animation: weaveIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .thread-line {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212, 175, 55, 0.15) 25%,
            #f3d478 50%,
            rgba(212, 175, 55, 0.15) 75%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: threadShimmer 5s linear infinite;
        }
        .paisley-mark {
          animation: paisleyFloat 7s ease-in-out infinite;
        }
        .thread-link {
          position: relative;
          display: inline-block;
        }
        .thread-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0%;
          height: 1px;
          background: #d4af37;
          transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .thread-link:hover::after {
          width: 100%;
        }
        @media (prefers-reduced-motion: reduce) {
          .temple-tooth, .thread-line, .paisley-mark {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Woven temple border */}
      <div
        ref={borderRef}
        className="flex w-full"
        aria-hidden="true"
      >
        {Array.from({ length: TEMPLE_TEETH }).map((_, i) => (
          <div
            key={i}
            className={`temple-tooth h-3 flex-1 ${woven ? 'woven' : ''}`}
            style={{
              animationDelay: `${i * 30}ms`,
              clipPath:
                i % 2 === 0
                  ? 'polygon(50% 100%, 0 0, 100% 0)'
                  : 'polygon(50% 0, 0 100%, 100% 100%)',
              background:
                'linear-gradient(180deg, #f3d478 0%, #d4af37 60%, #9c7a1f 100%)',
            }}
          />
        ))}
      </div>

      {/* ambient paisley watermark */}
      <svg
        className="paisley-mark pointer-events-none absolute -left-10 top-24 h-40 w-40 opacity-[0.06] lg:h-56 lg:w-56"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M100 20c-44 0-70 34-70 70 0 30 20 50 46 56 14 3 22-8 14-19-10-13-14-24-8-38 7-16 26-20 40-8 16 14 14 38-2 52-20 18-52 10-66-14"
          stroke="#d4af37"
          strokeWidth="3"
        />
      </svg>

      {/* Main content */}
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-4 lg:gap-10 lg:px-8">
        {/* Brand + contact */}
        <div>
           <Link href="/" className="font-bold text-[#8b1e1e] flex items-center gap-4">
          <div className="w-30">
            <img
              src="/images/logo.png"
              alt="Shree Priyaa's Boutique"
              className="w-full h-full object-contain"
            />
             </div>
           
        </Link>
          
          <p className="mt-4 text-sm leading-7 text-[#d8c3a5]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}>
            Your trusted destination for premium sarees, dress materials, readymades, and timeless fashion.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h3
              className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {category}
            </h3>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="thread-link text-sm text-[#d8c3a5] hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter + social */}
        <div>
          <h3
            className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Reach Us
          </h3>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              < MapPin className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <p className="text-sm text-[#d8c3a5]">Vellore, Tamil Nadu, India</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <a href="tel:+919345948849" className="thread-link text-sm text-[#d8c3a5] hover:text-white">
                +91 93459 48849
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-[#d4af37]" />
              <a href="mailto:support@heritage.com" className="thread-link text-sm text-[#d8c3a5] hover:text-white">
                priyaatextile59@gmail.com
              </a>
            </div>
          </div>
          <div className="mt-8 flex items-center ">

            <div className='w-15   hover:-translate-y-0.5'>
              <a href="https://www.instagram.com/priyaatextile_59?igsh=NmZidzVkYWN6dHA3" target='blank'>
              <img src="/images/social/insta.webp" alt="" />
              
              </a>
              
            </div>
            <div className='w-17  hover:-translate-y-0.5'>
              <a href="">
              <img src="/images/social/facebook.png" alt="" />
              </a>
            </div>
            <div className='w-20   hover:-translate-y-0.5'>
              <a href="https://www.youtube.com/@priyaatextile" target='blank'>
              <img src="/images/social/youtube.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* shimmering thread divider */}
      <div className="thread-line h-px w-full" aria-hidden="true" />

      {/* Bottom bar */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-[#a3876c] lg:flex-row lg:px-8">
        <p>© 2026 Shree Priya's boutique. All rights reserved.</p>
        <p className="italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Woven with care, since always.
        </p>
      </div>
    </footer>
  );
}
