import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/curentUser";
import Link from "next/link";
import Logoutbutton from "@/components/ui/Logoutbutton";

// ─── Static data (replace with real API calls) ────────────────────────────
const STATS = [
  { label: "Orders", value: "24" },
  { label: "Wishlist", value: "12" },
];

const CARDS = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    title: "Personal Info",
    desc: "Update name, email & password",
    href: "/account/personal",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: "My Orders",
    desc: "Track, return & reorder",
    href: "/account/orders",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Wishlist",
    desc: "Your saved favourites",
    href: "/account/wishlist",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Addresses",
    desc: "Manage delivery locations",
    href: "/account/addresses",
  },
];

// ─── Component ────────────────────────────────────────────────────────────
export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const initials = (user.name ?? "U")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmerSweep {
          0%   { background-position: -140% 0; }
          100% { background-position: 240% 0; }
        }

        .pp-root {
          min-height: 100vh;
          background: #FBF6EC;
          background-image:
            radial-gradient(ellipse 70% 40% at 50% -10%, rgba(184,134,11,0.08) 0%, transparent 70%),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 26px,
              rgba(91,26,26,0.015) 26px,
              rgba(91,26,26,0.015) 27px
            );
          padding: 56px 20px 80px;
          font-family: 'DM Sans', sans-serif;
          color: #3B2A1E;
        }

        .pp-shell {
          max-width: 860px;
          margin: 0 auto;
        }

        /* ── Hero card ─────────────────────────────────────────────────── */
        .pp-hero {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(184,134,11,0.22);
          background: #FFFDF7;
          box-shadow: 0 10px 40px rgba(91,26,26,0.06);
          padding: 52px 40px 40px;
          display: flex;
          align-items: flex-end;
          gap: 32px;
          margin-bottom: 28px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards;
        }

        .pp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(184,134,11,0.06) 0%, transparent 55%);
          pointer-events: none;
        }

        .pp-badge {
          position: absolute;
          top: 24px;
          right: 24px;
          background: rgba(184,134,11,0.1);
          border: 1px solid rgba(184,134,11,0.4);
          color: #9A6B0C;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          font-weight: 500;
        }

        .pp-avatar {
          position: relative;
          flex-shrink: 0;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: linear-gradient(135deg, #C9A84C 0%, #EAD9A0 50%, #B8860B 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 700;
          color: #4A2E0A;
          box-shadow: 0 0 0 4px #FFFDF7, 0 0 0 5px rgba(184,134,11,0.35), 0 8px 20px rgba(184,134,11,0.25);
        }

        .pp-avatar-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px dashed rgba(184,134,11,0.4);
          animation: spin 18s linear infinite;
        }

        .pp-hero-info { flex: 1; min-width: 0; }

        .pp-eyebrow {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #9A6B0C;
          margin: 0 0 8px;
          font-weight: 500;
        }

        .pp-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 700;
          line-height: 1.1;
          color: #3B1A1A;
          margin: 0 0 6px;
        }

        .pp-email {
          font-size: 14px;
          color: #9B8A76;
          margin: 0;
        }

        /* ── Stats row ─────────────────────────────────────────────────── */
        .pp-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          background: rgba(184,134,11,0.18);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 28px;
          border: 1px solid rgba(184,134,11,0.18);
          opacity: 0;
          animation: fadeUp 0.6s ease 0.1s forwards;
        }

        .pp-stat {
          background: #FFFDF7;
          padding: 22px 20px;
          text-align: center;
        }

        .pp-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 700;
          color: #9A6B0C;
          line-height: 1;
          display: block;
          margin-bottom: 6px;
        }

        .pp-stat-label {
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9B8A76;
        }

        /* ── Grid cards ────────────────────────────────────────────────── */
        .pp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .pp-card {
          background: #FFFDF7;
          border: 1px solid rgba(91,26,26,0.08);
          border-radius: 16px;
          padding: 28px 24px;
          text-decoration: none;
          color: inherit;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          transition: border-color 0.25s, background 0.25s, transform 0.2s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards;
        }

        .pp-grid .pp-card:nth-child(1) { animation-delay: 0.15s; }
        .pp-grid .pp-card:nth-child(2) { animation-delay: 0.22s; }
        .pp-grid .pp-card:nth-child(3) { animation-delay: 0.29s; }
        .pp-grid .pp-card:nth-child(4) { animation-delay: 0.36s; }

        .pp-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.25s;
        }

        .pp-card:hover {
          border-color: rgba(184,134,11,0.35);
          background: #FFF9EB;
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(184,134,11,0.14);
        }

        .pp-card:hover::after {
          opacity: 1;
          animation: shimmerSweep 1.4s linear infinite;
        }

        .pp-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(184,134,11,0.08);
          border: 1px solid rgba(184,134,11,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9A6B0C;
          flex-shrink: 0;
          transition: background 0.25s, color 0.25s;
        }

        .pp-card:hover .pp-card-icon {
          background: #C9A84C;
          color: #FFFDF7;
        }

        .pp-card-body { flex: 1; min-width: 0; }

        .pp-card-title {
          font-weight: 500;
          font-size: 15px;
          color: #3B2A1E;
          margin: 0 0 4px;
        }

        .pp-card-desc {
          font-size: 13px;
          color: #9B8A76;
          margin: 0;
        }

        .pp-card-arrow {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(184,134,11,0.4);
          font-size: 18px;
          transition: right 0.2s, color 0.2s;
        }

        .pp-card:hover .pp-card-arrow {
          right: 16px;
          color: #9A6B0C;
        }

        /* ── Footer row ────────────────────────────────────────────────── */
        .pp-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          background: #FFFDF7;
          border: 1px solid rgba(91,26,26,0.08);
          border-radius: 14px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.45s forwards;
        }

        .pp-footer-text {
          font-size: 13px;
          color: #9B8A76;
        }

        .pp-footer-text strong {
          color: #5B3A1A;
          font-weight: 500;
        }

        .pp-logout {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 8px;
          border: 1px solid rgba(91,26,26,0.3);
          background: transparent;
          color: #5B1A1A;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }

        .pp-logout:hover {
          background: rgba(91,26,26,0.06);
          border-color: #5B1A1A;
          color: #3B1010;
        }

        @media (prefers-reduced-motion: reduce) {
          .pp-hero, .pp-stats, .pp-card, .pp-footer, .pp-avatar-ring {
            animation: none !important;
            opacity: 1 !important;
          }
        }

        @media (max-width: 600px) {
          .pp-hero { flex-direction: column; align-items: flex-start; padding: 36px 24px 28px; }
          .pp-grid { grid-template-columns: 1fr; }
          .pp-name { font-size: 30px; }
          .pp-stats { grid-template-columns: repeat(2, 1fr); }
          .pp-footer { flex-direction: column; gap: 16px; align-items: flex-start; }
        }
      `}</style>

      <div className="pp-root">
        <div className="pp-shell">

          {/* ── Hero ─────────────────────────────────────────── */}
          <div className="pp-hero">
            <span className="pp-badge">Gold Member</span>

            <div className="pp-avatar">
              <div className="pp-avatar-ring" />
              {initials}
            </div>

            <div className="pp-hero-info">
              <p className="pp-eyebrow">Your Account</p>
              <h1 className="pp-name">{user.name}</h1>
              <p className="pp-email">{user.email}</p>
            </div>
          </div>

          {/* ── Stats ────────────────────────────────────────── */}
          {/* <div className="pp-stats">
            {STATS.map((s) => (
              <div className="pp-stat" key={s.label}>
                <span className="pp-stat-val">{s.value}</span>
                <span className="pp-stat-label">{s.label}</span>
              </div>
            ))}
          </div> */}

          {/* ── Card grid ────────────────────────────────────── */}
          {/* <div className="pp-grid">
            {CARDS.map((c) => (
              <Link href={c.href} className="pp-card" key={c.title}>
                <div className="pp-card-icon">{c.icon}</div>
                <div className="pp-card-body">
                  <p className="pp-card-title">{c.title}</p>
                  <p className="pp-card-desc">{c.desc}</p>
                </div>
                <span className="pp-card-arrow">›</span>
              </Link>
            ))}
          </div> */}

          {/* ── Footer ───────────────────────────────────────── */}
          <div className="pp-footer">
            <p className="pp-footer-text">
              Member since <strong>March 2022</strong>
            </p>
            <Logoutbutton/>
          </div>

        </div>
      </div>
    </>
  );
}
