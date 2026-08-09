"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Package,
  FolderTree,
  ShoppingCart,
  Clapperboard,
} from "lucide-react";

type MenuItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

type MenuGroup = {
  label: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    label: "Overview",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Storefront",
    items: [
      { name: "Banner", href: "/admin/banner", icon: ImageIcon },
      { name: "Reels", href: "/admin/reels", icon: Clapperboard },
    ],
  },
  {
    label: "Catalog & Sales",
    items: [
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Categories", href: "/admin/categories", icon: FolderTree },
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="hidden md:flex md:flex-col h-full w-64 bg-[#3D1F1F] text-[#E8E4D9] border-r border-[#22252F]">
      {/* Wordmark */}
      <div className="flex items-center gap-2 px-5 border-b border-[#22252F]">
         <Link href="/" className="font-bold text-[#8b1e1e] flex items-center gap-1">
          <div className="w-20">
            <img
              src="/images/logo.png"
              alt="Shree Priyaa's Boutique"
              className="w-full h-full object-contain"
            />
             </div>
            <div className="leading-tight">
              <h1 className=" text-2xl font-bold text-white sm:text-2xl uppercase">
                Priyaa
              </h1>
              <p className="text-sm  uppercase text-white font-bold">
                Textile
              </p>
           
          </div>
        </Link>
      
      </div>
        

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-8">
        {menuGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-[10px] font-medium tracking-[0.14em] uppercase text-[#8A8C99]">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-3 pl-3 pr-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                      active
                        ? "bg-[#832222] text-[#E8E4D9]"
                        : "text-[#A9ABB6] hover:bg-[#832222] hover:text-[#E8E4D9]"
                    }`}
                  >
                    {/* sliding active rail */}
                    <span
                      className={`absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full transition-colors duration-150 ${
                        active ? "bg-[#C99A3B]" : "bg-transparent"
                      }`}
                    />
                    <Icon
                      size={17}
                      className={active ? "text-[#C99A3B]" : "text-[#8A8C99] group-hover:text-[#E8E4D9]"}
                    />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer slot */}
      <div className="px-5 py-4 border-t border-[#22252F] text-xs text-[#6F717D]">
        Signed in as <span className="text-[#A9ABB6]">Admin</span>
      </div>
    </aside>
  );
}