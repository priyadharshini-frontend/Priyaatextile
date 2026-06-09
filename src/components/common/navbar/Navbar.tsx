'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Sarees',
    href: '/',
    mega: [
      {
        title: 'By Fabric',
        links: ['Pure Silk', 'Semi Silk', 'Cotton Silk', 'Chiffon Sarees', 'Georgette Sarees'],
      },
      {
        title: 'By Style',
        links: ['Organza Sarees', 'Crepe Sarees', 'Tissue Sarees', 'Linen Sarees', 'Trending Sarees'],
      },
    ],
    banner: '/banners/sarees.jpg',
    highlight: 'New Silk Collection',
    highlightSub: 'Pure Kanjivaram · Just Arrived',
  },
  {
    name: 'Women',
    href: '/collection',
    mega: [
      {
        title: 'Ethnic Wear',
        links: ['Kurti', 'Co-ord Set', '3 Piece Set', 'Salwar Set', 'Maternity Wear'],
      },
      {
        title: 'More',
        links: ['Bottom Wear', 'Skirt', 'Dupatta', 'Night Wear', 'Readymade Blouse'],
      },
    ],
    banner: '/banners/women.jpg',
    highlight: 'Festive Wear 2026',
    highlightSub: 'New Season Arrivals',
  },
  {
    name: 'Kids',
    href: '/collection',
    mega: [
      {
        title: 'Boys',
        links: ['Shirt', 'T-Shirt', 'Denim', 'Kurta Set', 'Shirt & Dhoti Combo', 'Boys Casual Combo'],
      },
    ],
    banner: '/banners/women.jpg',
    highlight: 'Kids Collection',
    highlightSub: 'Fun & Festive Styles',
  },
  {
    name: 'Girls',
    href: '/collection',
    mega: [
      {
        title: 'Girls',
        links: ['Choli', 'Frock', 'Kids Pattu Pavadai', 'Western Dress', 'Girls T-Shirt', 'Kids Dharvaset', 'Kids Jean'],
      },
    ],
    banner: '/banners/women.jpg',
    highlight: 'Girls Collection',
    highlightSub: 'Pretty & Playful',
  },
];
interface NavbarProps {
  user: {
    id: string;
    name: string | null;
    email: string;
  } | null;
}

export default function Navbar({user}:NavbarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(name);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 180);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

        .nb-root { font-family: 'Outfit', sans-serif; }
        .nb-serif { font-family: 'Cormorant Garamond', serif; }

        @keyframes megaIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobileIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes searchIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes underlineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .nb-navlink {
          position: relative;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.25s ease;
        }
        .nb-navlink::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: #d4af37;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .nb-navlink:hover { color: #d4af37; }
        .nb-navlink:hover::after,
        .nb-navlink.active::after { transform: scaleX(1); }

        .nb-mega {
          animation: megaIn 0.28s cubic-bezier(0.22,1,0.36,1) both;
        }

        .nb-icon-btn {
          position: relative;
          color: rgba(255,255,255,0.7);
          transition: color 0.25s;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }
        .nb-icon-btn:hover { color: #d4af37; }

        .nb-search-bar {
          animation: searchIn 0.25s ease both;
        }

        .nb-mega-link {
          font-size: 13px;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 0;
          transition: color 0.2s, padding-left 0.2s;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .nb-mega-link:last-child { border-bottom: none; }
        .nb-mega-link:hover { color: #d4af37; padding-left: 6px; }

        .nb-mobile-panel {
          animation: mobileIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }

        .nb-badge {
          display: inline-block;
          background: #d4af37;
          color: #1a0808;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 2px;
          margin-left: 6px;
          vertical-align: middle;
        }
      `}</style>

      <header className="nb-root" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>

        {/* ── Top strip ── */}
        <div style={{
          background: 'linear-gradient(90deg, #3d1212 0%, #4a1818 50%, #3d1212 100%)',
          borderBottom: '1px solid rgba(212,175,55,0.15)',
          textAlign: 'center',
          padding: '8px 16px',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#d4af37',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <span style={{ opacity: 0.5 }}>✦</span>
          Free Shipping on all orders above ₹1999
          <span style={{ opacity: 0.5 }}>✦</span>
        </div>

        {/* ── Main nav ── */}
        <nav style={{
          background: 'rgba(43,13,13,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212,175,55,0.12)',
          position: 'relative',
        }}>

          {/* Search bar (expanded) */}
          {searchOpen && (
            <div className="nb-search-bar" style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(43,13,13,0.98)',
              zIndex: 60,
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              gap: 16,
            }}>
              <MagnifyingGlassIcon style={{ width: 20, height: 20, color: '#d4af37', flexShrink: 0 }} />
              <input
                autoFocus
                placeholder="Search sarees, fabrics, occasion…"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: 15,
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: '0.02em',
                }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Close
              </button>
            </div>
          )}

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>

            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37, #b8941e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 1px rgba(212,175,55,0.3), 0 4px 20px rgba(212,175,55,0.2)',
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 20, color: '#1a0808' }}>H</span>
              </div>
              <div style={{ display: 'none' }} className="md-logo">
                <div className="nb-serif" style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '0.02em' }}>Heritage</div>
                <div style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#d4af37', marginTop: 2, fontWeight: 400 }}>Saree Boutique</div>
              </div>
              <style>{`.md-logo { display: block !important; } @media (max-width: 600px) { .md-logo { display: none !important; } }`}</style>
            </Link>

            {/* Desktop nav links */}
            <div style={{ alignItems: 'center', gap: 40 }} className="desktop-nav d-none md:d-flex">
              <style>{`.desktop-nav { display: none; } @media (min-width: 1024px) { .desktop-nav { display: flex !important; } }`}</style>

              {navigation.map((item) => (
                <div
                  key={item.name}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => handleEnter(item.name)}
                  onMouseLeave={handleLeave}
                >
                  <Link href={item.href} className={`nb-navlink ${activeMenu === item.name ? 'active' : ''}`}>
                    {item.name}
                  </Link>

                  {/* Mega menu */}
                  {activeMenu === item.name && (
                    <div
                      className="nb-mega"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 20px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 680,
                        background: '#1e0808',
                        border: '1px solid rgba(212,175,55,0.15)',
                        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
                        zIndex: 100,
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 200px',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
                      onMouseLeave={handleLeave}
                    >
                      {/* Top gold accent line */}
                      <div style={{ gridColumn: '1/-1', height: 2, background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />

                      {/* Link columns */}
                      {item.mega.map((col) => (
                        <div key={col.title} style={{ padding: '24px 24px 28px' }}>
                          <div style={{
                            fontSize: 9,
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            color: '#d4af37',
                            marginBottom: 16,
                            fontWeight: 600,
                          }}>
                            {col.title}
                          </div>
                          <div>
                            {col.links.map((link) => (
                              <a key={link} href="#" className="nb-mega-link">
                                <ChevronRightIcon style={{ width: 10, height: 10, color: '#d4af37', opacity: 0.4, flexShrink: 0 }} />
                                {link}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Banner panel */}
                      <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <Image
                          src={item.banner}
                          alt={item.name}
                          fill
                          className="object-cover"
                          style={{ transition: 'transform 0.6s ease' }}
                        />
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(10,3,3,0.9) 0%, rgba(10,3,3,0.3) 60%, transparent 100%)',
                        }} />
                        <div style={{ position: 'absolute', bottom: 20, left: 16, right: 16 }}>
                          <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#d4af37', marginBottom: 4 }}>
                            Featured
                          </div>
                          <div className="nb-serif" style={{ fontSize: 16, fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>
                            {item.highlight}
                          </div>
                          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                            {item.highlightSub}
                          </div>
                          <a href="#" style={{
                            display: 'inline-block',
                            marginTop: 12,
                            fontSize: 10,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: '#d4af37',
                            textDecoration: 'none',
                            borderBottom: '1px solid rgba(212,175,55,0.4)',
                            paddingBottom: 2,
                          }}>
                            Shop Now →
                          </a>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

              <button className="nb-icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
                <MagnifyingGlassIcon style={{ width: 20, height: 20 }} />
              </button>

              <Link href="/wishlist" className="nb-icon-btn">
                <HeartIcon style={{ width: 20, height: 20 }} />
              </Link>

              <Link href="/cart" className="nb-icon-btn" style={{ position: 'relative' }}>
                <ShoppingBagIcon style={{ width: 20, height: 20 }} />
                <span style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  background: '#d4af37',
                  borderRadius: '50%',
                  fontSize: 9,
                  fontWeight: 700,
                  color: '#1a0808',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}>
                  0
                </span>
              </Link>

              {user ? (
  <Link
    href="/profile"
    className="nb-icon-btn"
    style={{
      marginLeft: 4,
      border: "1px solid rgba(212,175,55,0.25)",
      borderRadius: 4,
      padding: "6px 14px",
      color: "#d4af37",
      textDecoration: "none",
    }}
  >
    <UserIcon style={{ width: 15, height: 15 }} />
    <span className="hide-mobile">
      {user.name || user.email}
    </span>
  </Link>
) : (
  <Link
    href="/login"
    className="nb-icon-btn"
    style={{
      marginLeft: 4,
      border: "1px solid rgba(212,175,55,0.25)",
      borderRadius: 4,
      padding: "6px 14px",
      color: "#d4af37",
      textDecoration: "none",
    }}
  >
    <UserIcon style={{ width: 15, height: 15 }} />
    <span className="hide-mobile">Login</span>
  </Link>
)}
              <style>{`.hide-mobile { display: inline; } @media (max-width: 768px) { .hide-mobile { display: none; } }`}</style>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="nb-icon-btn"
                style={{ marginLeft: 8, display: 'none' }}
                id="hamburger"
                aria-label="Open menu"
              >
                <Bars3Icon style={{ width: 26, height: 26 }} />
              </button>
              <style>{`@media (max-width: 1023px) { #hamburger { display: flex !important; } }`}</style>

            </div>
          </div>
        </nav>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }} onClick={() => setMobileOpen(false)}>
            <div
              className="nb-mobile-panel"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '82%',
                maxWidth: 360,
                background: '#1e0808',
                borderLeft: '1px solid rgba(212,175,55,0.15)',
                overflowY: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{
                padding: '24px 24px 20px',
                borderBottom: '1px solid rgba(212,175,55,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div className="nb-serif" style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Heritage</div>
                  <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d4af37', marginTop: 1 }}>Saree Boutique</div>
                </div>
                <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: 4 }}>
                  <XMarkIcon style={{ width: 24, height: 24 }} />
                </button>
              </div>

              {/* Search in mobile */}
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: 4,
                  padding: '10px 14px',
                }}>
                  <MagnifyingGlassIcon style={{ width: 16, height: 16, color: '#d4af37' }} />
                  <input
                    placeholder="Search…"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#fff',
                      fontSize: 13,
                      fontFamily: "'Outfit', sans-serif",
                      width: '100%',
                    }}
                  />
                </div>
              </div>

              {/* Nav accordion */}
              <div style={{ padding: '8px 0' }}>
                {navigation.map((item) => (
                  <div key={item.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <button
                      onClick={() => setOpenMobile(openMobile === item.name ? null : item.name)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 24px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: openMobile === item.name ? '#d4af37' : 'rgba(255,255,255,0.85)',
                        fontSize: 14,
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontFamily: "'Outfit', sans-serif",
                        transition: 'color 0.2s',
                      }}
                    >
                      {item.name}
                      <span style={{
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(212,175,55,0.25)',
                        borderRadius: '50%',
                        color: '#d4af37',
                        fontSize: 14,
                        transition: 'transform 0.3s',
                        transform: openMobile === item.name ? 'rotate(45deg)' : 'rotate(0)',
                      }}>
                        +
                      </span>
                    </button>

                    {openMobile === item.name && (
                      <div style={{ padding: '4px 24px 20px 36px' }}>
                        {item.mega.map((col) => (
                          <div key={col.title} style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#d4af37', marginBottom: 10, opacity: 0.8 }}>
                              {col.title}
                            </div>
                            {col.links.map((link) => (
                              <a key={link} href="#" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '7px 0',
                                fontSize: 13,
                                color: 'rgba(255,255,255,0.55)',
                                textDecoration: 'none',
                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                                transition: 'color 0.2s',
                                fontFamily: "'Outfit', sans-serif",
                              }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                              >
                                <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#d4af37', opacity: 0.4, flexShrink: 0 }} />
                                {link}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom actions */}
              <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(212,175,55,0.1)', display: 'flex', gap: 12 }}>
                <a href="/wishlist" style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: 4,
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  <HeartIcon style={{ width: 16, height: 16 }} />
                  Wishlist
                </a>
                <a href="/login" style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px',
                  background: '#d4af37',
                  borderRadius: 4,
                  color: '#1a0808',
                  textDecoration: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  <UserIcon style={{ width: 16, height: 16 }} />
                  Login
                </a>
              </div>

            </div>
          </div>
        )}

      </header>
    </>
  );
}
