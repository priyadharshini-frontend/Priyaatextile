"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sora } from "next/font/google";
import {
  Menu,
  ShoppingCart,
  User,
   Package,
   UserStar
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartCount } from "@/hooks/useCart";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "../cart/CartDrawer";


interface NavbarProps {
  user: {
    role: string;
    id: string;
    name: string | null;
    mobile: string;
  } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories: {
    id: string;
    name: string;
    slug: string;
  }[];
}
const sora = Sora({
  subsets: ["latin"],
  weight: ["700"],
});
export default function Navbar({ user }: NavbarProps) {
  
   
      const cartCount =
    useCartStore((s) => s.cartCount);
    const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] =useState(false);
  const router = useRouter();

    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [activeCategory, setActiveCategory] =
  useState<Category | null>(null);

  const [categories, setCategories] = useState<
    Category[]
  >([]);


  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");

      const data = await res.json();

      setCategories(data.data || []);
    } catch (error) {
      console.error(error);
    }
  }


  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  };


  
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between sm:px-6 px-2 ">

        {/* Logo */}
         <Link href="/" className="font-bold text-[#8b1e1e] flex items-center gap-1">
          <div className="w-20">
            <img
              src="/images/logo.png"
              alt="Shree Priyaa's Boutique"
              className="w-full h-full object-contain"
            />
             </div>
            <div className="leading-tight">
              <h1 className={`${sora.className} text-2xl font-bold text-[#8b1e1e] sm:text-2xl uppercase` }>
                Priyaa
              </h1>
              <p className={`${sora.className}text-sm  uppercase text-black font-bold`}>
                Textile
              </p>
           
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">

          <Link href="/">Home</Link>

          {/* Collections (next we'll make this dynamic) */}
         <div
  className="relative"
   onMouseEnter={() => {
    setShowMegaMenu(true);

    if (!activeCategory && categories.length) {
      setActiveCategory(categories[0]);
    }
  }}
  onMouseLeave={() => setShowMegaMenu(false)}
>
  <button className="flex items-center gap-1 font-medium hover:text-[#8b1e1e] transition"
  
  
  >
    
    Collections
    <svg
      className={`w-4 h-4 transition-transform ${
        showMegaMenu ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

 {showMegaMenu && (
  <div
    className="absolute left-0 top-full w-[650px] rounded-2xl border border-[#eadfce] bg-white shadow-2xl z-50"
     onMouseEnter={() => {
    setShowMegaMenu(true);

    if (!activeCategory && categories.length) {
      setActiveCategory(categories[0]);
    }
  }}
    onMouseLeave={() => setShowMegaMenu(false)}
  >
    <div className="grid grid-cols-2">

      {/* Left */}

      <div className="border-r">

        <h3 className="px-6 py-5 text-lg font-bold text-[#8b1e1e]">
          Collections
        </h3>

        {categories.map((category) => (
 <Link
  key={category.id}
  href={`/product?category=${category.slug}`}
  onMouseEnter={() => setActiveCategory(category)}
  onClick={() => setShowMegaMenu(false)}
  className={`flex w-full items-center justify-between px-6 py-3 transition
  ${
    activeCategory?.id === category.id
      ? "bg-[#faf6f2] text-[#8b1e1e]"
      : "hover:bg-[#faf6f2]"
  }`}
>
  <span>{category.name}</span>
  <span>›</span>
</Link>
        ))}
      </div>

      {/* Right */}

      <div className="p-6">

        <h3 className="mb-5 text-lg font-bold text-[#8b1e1e]">
          {activeCategory?.name}
        </h3>

        <div className="space-y-3">

          {activeCategory?.subCategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/product?category=${activeCategory.slug}&subcategory=${sub.slug}`}
              className="block text-gray-600 hover:text-[#8b1e1e]"
            >
              {sub.name}
            </Link>
          ))}

        </div>

        <Link
          href={`/product?category=${activeCategory?.slug}`}
          className="mt-6 inline-block font-semibold text-[#8b1e1e]"
        >
          View All →
        </Link>

      </div>

    </div>
  </div>
)}
</div>

          <Link href="/product?type=new">
            New Arrival
          </Link>

          <Link href="/product?type=bestseller">
            Best Seller
          </Link>

          <Link
            href="/product?sale=true"
            className="text-red-600 font-semibold"
          >
            Sale 🔥
          </Link>

        </nav>

        {/* Right */}
        <div className="flex items-center gap-5">

           {user?.role=="ADMIN"?(
      <div>
         <button className="relative">
            <Link href="/admin">
            < UserStar size={22} />
            </Link>
          </button>
      </div>
         ):(
        <></>
      )
      
    }
          <button className="relative">
            <Link href="/my-orders">
            < Package size={22} />
            </Link>
          </button>

          
   

          <button className="relative" onClick={() => setCartOpen(true)}>
            
           
            <ShoppingCart size={22} />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#8b1e1e] text-xs text-white">
              {cartCount}
            </span>
         
          </button>
          <CartDrawer
  isOpen={cartOpen}
  onClose={() => setCartOpen(false)}
/>
          

         {user ? (
  <div className="relative hidden lg:block group">

    {/* Profile Button */}
    <button className="flex items-center gap-2">
      <User size={20} />
      <span>{user.name}</span>
    </button>

    {/* Dropdown */}
    <div
      className="
        absolute
        right-0
        top-full
        mt-3
        w-64
        rounded-2xl
        border
        bg-white
        shadow-xl
        opacity-0
        invisible
        group-hover:opacity-100
        group-hover:visible
        transition-all
        duration-200
        z-50
      "
    >
      {/* User Info */}
      <div className="border-b p-4">
        <h3 className="font-semibold text-gray-900">
          {user.name}
        </h3>

        <p className="text-sm text-gray-500">
          {user.mobile}
        </p>
      </div>

      {/* Menu */}
      <div className="p-2">
      

       

       
          <button onClick={handleLogout}
            className="w-full rounded-lg px-4 py-2 text-left text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
     
      </div>
    </div>
  </div>
) : (
  <Link href="/login">
    Login
  </Link>
)}

          <button
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="lg:hidden"
          >
            <Menu size={24} />
          </button>

        </div>

      </div>
      {mobileMenuOpen && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/40 z-40 lg:hidden"
      onClick={() => setMobileMenuOpen(false)}
    />

    {/* Drawer */}
    <div className="fixed top-0 left-0 h-full w-80 max-w-[85%] bg-white z-50 shadow-xl lg:hidden overflow-y-auto">

      <div className="flex items-center justify-between p-5 border-b">
        <h2 className="text-xl font-bold text-[#8b1e1e]">
          Menu
        </h2>

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="text-3xl"
        >
          ×
        </button>
      </div>

      <nav className="flex flex-col p-5 gap-2">

        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="py-3 border-b"
        >
          Home
        </Link>

        <div className="border-b py-3">
  <p className="font-semibold text-[#8b1e1e] mb-3">
    Collections
  </p>

  <div className="space-y-2">
    {categories.map((category) => (
      <details
        key={category.id}
        className="group"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-2 py-2 hover:bg-[#faf6f2]">
          <span>{category.name}</span>

          <svg
            className="h-4 w-4 transition group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>

        <div className="ml-4 mt-2 flex flex-col gap-2">
          {/* View All */}
          <Link
            href={`/product?category=${category.slug}`}
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#8b1e1e]"
          >
            View All {category.name}
          </Link>

          {/* Subcategories */}
          {category.subCategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/product?category=${category.slug}&subcategory=${sub.slug}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-gray-600 hover:text-[#8b1e1e]"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      </details>
    ))}
  </div>
</div>

        <Link
          href="/product?type=new"
          onClick={() => setMobileMenuOpen(false)}
          className="py-3 border-b"
        >
          New Arrival
        </Link>

        <Link
          href="/product?type=bestseller"
          onClick={() => setMobileMenuOpen(false)}
          className="py-3 border-b"
        >
          Best Seller
        </Link>

        <Link
          href="/product?sale=true"
          onClick={() => setMobileMenuOpen(false)}
          className="py-3 border-b text-red-600"
        >
          Sale 🔥
        </Link>

        <Link
          href="/wishlist"
          onClick={() => setMobileMenuOpen(false)}
          className="py-3 border-b"
        >
          Wishlist
        </Link>

        <Link
          href="/cart"
          onClick={() => setMobileMenuOpen(false)}
          className="py-3 border-b"
        >
          Cart
        </Link>

        {user ? (
          <Link
            href="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3"
          >
            {user.name}
          </Link>
        ) : (
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3"
          >
            Login
          </Link>
        )}

      </nav>
    </div>
  </>
)}
      
    </header>
  );
}