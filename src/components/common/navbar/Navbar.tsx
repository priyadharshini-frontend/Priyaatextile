'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {  Bars3Icon,  XMarkIcon,  MagnifyingGlassIcon,  HeartIcon,  ShoppingBagIcon,  UserIcon,} from '@heroicons/react/24/outline';const navigation = [  { name: 'Home', href: '/' },  { name: 'Collection', href: '/collection' },  { name: 'Sarees', href: '/products' },  { name: 'About Us', href: '/about' },  { name: 'Our Story', href: '/story' },  { name: 'Contact', href: '/contact' },];


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return(
       <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#2b0d0d]/95 backdrop-blur-md">
      
      {/* Top Strip */}
      <div className="border-b border-white/10 bg-[#3d1212] py-2 text-center text-xs tracking-wide text-[#d4af37]">
        ✨ Free Shipping on all orders above ₹1999
      </div>

      {/* Main Navbar */}
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-lg font-bold text-black">
            H
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Heritage
            </h2>

            <p className="text-xs tracking-[3px] text-[#d4af37]">
              SAREE BOUTIQUE
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-10 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-white transition hover:text-[#d4af37]"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Icons */}
        <div className="hidden items-center gap-5 lg:flex">
          
          <button className="text-white transition hover:text-[#d4af37]">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          <button className="text-white transition hover:text-[#d4af37]">
            <HeartIcon className="h-5 w-5" />
          </button>

          <button className="relative text-white transition hover:text-[#d4af37]">
            <ShoppingBagIcon className="h-5 w-5" />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-bold text-black">
              2
            </span>
          </button>

          <button className="text-white transition hover:text-[#d4af37]">
            <UserIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-white lg:hidden"
        >
          <Bars3Icon className="h-7 w-7" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden">
          
          <div className="absolute right-0 top-0 h-full w-[80%] bg-[#2b0d0d] p-6 shadow-2xl">
            
            {/* Mobile Header */}
            <div className="mb-10 flex items-center justify-between">
              
              <h2 className="text-2xl font-bold text-[#d4af37]">
                Heritage
              </h2>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white"
              >
                <XMarkIcon className="h-7 w-7" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex flex-col gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-white/10 pb-4 text-lg text-white transition hover:text-[#d4af37]"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Icons */}
            <div className="mt-12 flex items-center gap-6">
              
              <button className="text-white transition hover:text-[#d4af37]">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>

              <button className="text-white transition hover:text-[#d4af37]">
                <HeartIcon className="h-6 w-6" />
              </button>

              <button className="text-white transition hover:text-[#d4af37]">
                <ShoppingBagIcon className="h-6 w-6" />
              </button>

              <button className="text-white transition hover:text-[#d4af37]">
                <UserIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>

  );
}