'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Sarees',
    href: '/',
    mega: [
      {
        title: 'Saree',
        links: ['Pure Silk', 'Semi Slik', 'Cotton Silk','Trending Sarees','Chiffon Sarees','Georgette Sarees','Organza Sarees','Crepe Sarees','Tissue Sarees','Linen Sarees'],
      },
     
    ],
    banner: '/banners/sarees.jpg',
    highlight: 'New Silk Collection',
  },
  {
    name: 'Women',
    href: '/collection',
    mega: [
      {
        title: 'Ethnic',
        links: ['Kurti','Co-ord-set','3 piece set','Bottom wear', 'Skirt','Dupatta','Maternity Wear','Night Wear','Readymade Blouse','Salwarset'],
      },
     
    ],
    banner: '/banners/women.jpg',
    highlight: 'Festive Wear 2026',
  },
  
   {
    name: 'Kids',
    href: '/collection',
    mega: [
      {
        title: 'Ethnic',
        links:['Shirt','T-Shirt','Denim','Kurta Set','Shirt & Dhoti Combo','Boys Casual Combo'],
      },
     
    ],
    banner: '/banners/women.jpg',
    highlight: 'Festive Wear 2026',
  },
   {
    name: 'Girls',
    href: '/collection',
    mega: [
      {
        title: 'Ethnic',
        links: ['Choli','Frock','Kids Pattu Pavadai','Western Dress','Girls TShirt','Kids Dharvaset','Kids Jean'],
      },
    
     
    ],
    banner: '/banners/women.jpg',
    highlight: 'Festive Wear 2026',
  },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(null);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#2b0d0d]/95 backdrop-blur-md">

      {/* TOP STRIP */}
      <div className="border-b border-white/10 bg-[#3d1212] py-2 text-center text-xs text-[#d4af37]">
        ✨ Free Shipping on all orders above ₹1999
      </div>

      {/* NAVBAR */}
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-black font-bold">
            H
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Heritage</h2>
            <p className="text-xs tracking-[3px] text-[#d4af37]">
              Saree Boutique
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-10">

          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => {
                if (hoverTimeout) clearTimeout(hoverTimeout);
                setActiveMenu(item.name);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => {
                  setActiveMenu(null);
                }, 200);
                setHoverTimeout(timeout);
              }}
            >

              {/* LINK */}
              <Link
                href={item.href}
                className="text-sm font-medium text-white hover:text-[#d4af37]"
              >
                {item.name}
              </Link>

              {/* MEGA MENU */}
              {activeMenu === item.name && item.mega && (
                <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[900px] h-[fit-content] bg-[#2b0d0d] border border-white/10 shadow-2xl p-6 grid grid-cols-4 gap-6 z-50">

                  {/* LINKS */}
                  <div className="col-span-3 grid grid-cols-3 gap-6">
                    {item.mega.map((col) => (
                      <div key={col.title}>
                        <h3 className="text-[#d4af37] font-semibold mb-3">
                          {col.title}
                        </h3>

                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link}>
                              <a
                                href="#"
                                className="text-sm text-white hover:text-[#d4af37]"
                              >
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* IMAGE BANNER */}
                  <div className="col-span-1 relative">
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                      <Image
                        src={item.banner}
                        alt={item.name}
                        fill
                        className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-black/40" />

                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-xs text-[#d4af37]">Featured</p>
                        <p className="text-sm font-semibold">
                          {item.highlight}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          ))}

        </div>

        {/* ICONS */}
        <div className="hidden lg:flex items-center gap-5 text-white">
          <MagnifyingGlassIcon className="h-5 w-5 hover:text-[#d4af37]" />
          <a href="/wishlist">
          <HeartIcon className="h-5 w-5 hover:text-[#d4af37]" /></a>
          <ShoppingBagIcon className="h-5 w-5 hover:text-[#d4af37]" />
          <a href="/login"> <UserIcon className="h-5 w-5 hover:text-[#d4af37]" /></a>
         
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden text-white"
        >
          <Bars3Icon className="h-7 w-7" />
        </button>

      </nav>

      {/* MOBILE MENU (UNCHANGED ACCORDION) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 lg:hidden">
          <div className="absolute right-0 top-0 h-screen w-[85%] bg-[#2b0d0d] p-6 overflow-y-auto">

            <div className="flex justify-between mb-8">
              <h2 className="text-[#d4af37] text-xl font-bold">Heritage</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <XMarkIcon className="h-7 w-7 text-white" />
              </button>
            </div>

            <div className="flex flex-col">
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-white/10">

                  <button
                    onClick={() =>
                      setOpenMobileMenu(
                        openMobileMenu === item.name ? null : item.name
                      )
                    }
                    className="w-full flex justify-between items-center py-4 text-white text-lg"
                  >
                    {item.name}
                    <span className="text-[#d4af37]">
                      {openMobileMenu === item.name ? '−' : '+'}
                    </span>
                  </button>

                  {openMobileMenu === item.name && item.mega && (
                    <div className="pb-4 pl-3 space-y-4">
                      {item.mega.map((col) => (
                        <div key={col.title}>
                          <p className="text-[#d4af37] font-semibold text-sm mb-2">
                            {col.title}
                          </p>

                          <div className="flex flex-col gap-1">
                            {col.links.map((link) => (
                              <a
                                key={link}
                                href="#"
                                className="text-sm text-gray-300 hover:text-white"
                              >
                                {link}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </header>
  );
}