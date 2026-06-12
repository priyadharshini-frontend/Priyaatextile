
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
    accent: "#c9a84c",
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
    accent: "#c9a84c",
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
    accent: "#c9a84c",
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
    accent: "#c9a84c",
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

        .pp-root {
          min-height: 100vh;
          background:#1A0608;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,168,76,0.08) 0%, transparent 70%);
          padding: 56px 20px 80px;
          font-family: 'DM Sans', sans-serif;
          color: #e8e2d4;
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
          border: 1px solid rgba(201,168,76,0.18);
          background:#220C0E;
          padding: 52px 40px 40px;
          display: flex;
          align-items: flex-end;
          gap: 32px;
          margin-bottom: 28px;
        }

        .pp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 55%),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 24px,
              rgba(201,168,76,0.025) 24px,
              rgba(201,168,76,0.025) 25px
            );
          pointer-events: none;
        }

        .pp-badge {
          position: absolute;
          top: 24px;
          right: 24px;
          background: rgba(201,168,76,0.12);
          border: 1px solid rgba(201,168,76,0.35);
          color: #c9a84c;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
        }

        .pp-avatar {
          position: relative;
          flex-shrink: 0;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c 0%, #e5c97e 50%, #a8862e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 700;
          color: #0d0d0d;
          box-shadow: 0 0 0 4px #141414, 0 0 0 5px rgba(201,168,76,0.4);
        }

        .pp-avatar-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px dashed rgba(201,168,76,0.3);
          animation: spin 18s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .pp-hero-info { flex: 1; min-width: 0; }

        .pp-eyebrow {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c9a84c;
          margin: 0 0 8px;
          font-weight: 500;
        }

        .pp-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 700;
          line-height: 1.1;
          color: #f0ead8;
          margin: 0 0 6px;
        }

        .pp-email {
          font-size: 14px;
          color: #7a7063;
          margin: 0;
        }

        /* ── Stats row ─────────────────────────────────────────────────── */
        .pp-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          background: #3A1215;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 28px;
          border: 1px solid rgba(201,168,76,0.12);
        }

        .pp-stat {
          background:#3A1215;
          padding: 22px 20px;
          text-align: center;
        }

        .pp-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px;
          font-weight: 700;
          color: #c9a84c;
          line-height: 1;
          display: block;
          margin-bottom: 6px;
        }

        .pp-stat-label {
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #5a534a;
        }

        /* ── Grid cards ────────────────────────────────────────────────── */
        .pp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .pp-card {
          background: #3A1215;  
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 28px 24px;
          text-decoration: none;
          color: inherit;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }

        .pp-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c9a84c, transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }

        .pp-card:hover {
          border-color: rgba(201,168,76,0.3);
          background:#6A4A20;
          transform: translateY(-2px);
        }

        .pp-card:hover::after { opacity: 1; }

        .pp-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(201,168,76,0.08);
          border: 1px solid rgba(201,168,76,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9a84c;
          flex-shrink: 0;
        }

        .pp-card-body { flex: 1; min-width: 0; }

        .pp-card-title {
          font-weight: 500;
          font-size: 15px;
          color: #ede7d9;
          margin: 0 0 4px;
        }

        .pp-card-desc {
          font-size: 13px;
          color: #56504a;
          margin: 0;
        }

        .pp-card-arrow {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(201,168,76,0.4);
          font-size: 18px;
          transition: right 0.2s, color 0.2s;
        }

        .pp-card:hover .pp-card-arrow {
          right: 16px;
          color: #c9a84c;
        }

        /* ── Footer row ────────────────────────────────────────────────── */
        .pp-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          background: #3A1215;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 14px;
        }

        .pp-footer-text {
          font-size: 13px;
          color: #3d3830;
        }

        .pp-footer-text strong {
          color: #5a534a;
          font-weight: 500;
        }

        .pp-logout {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 8px;
          border: 1px solid rgba(201,168,76,0.35);
          background: transparent;
          color: #c9a84c;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }

        .pp-logout:hover {
          background: rgba(201,168,76,0.1);
          border-color: #c9a84c;
          color: #e5c97e;
        }

        @media (max-width: 600px) {
          .pp-hero { flex-direction: column; align-items: flex-start; padding: 36px 24px 28px; }
          .pp-grid { grid-template-columns: 1fr; }
          .pp-name { font-size: 30px; }
          .pp-stats { grid-template-columns: repeat(3, 1fr); }
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
          <div className="pp-stats">
            {STATS.map((s) => (
              <div className="pp-stat" key={s.label}>
                <span className="pp-stat-val">{s.value}</span>
                <span className="pp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Card grid ────────────────────────────────────── */}
          <div className="pp-grid">
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
          </div>

          {/* ── Footer ───────────────────────────────────────── */}
          <div className="pp-footer">
            <p className="pp-footer-text">
              Member since <strong>March 2022</strong>
            </p>
            {/* <Link href="/logout" className="pp-logout">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </Link> */}

            <Logoutbutton/>
          </div>

        </div>
      </div>
    </>
  );
}
