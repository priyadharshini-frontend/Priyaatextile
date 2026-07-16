"use client";

import PremiumNavbar from "@/components/navbar/Navbar";

interface NavbarProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    mobile: string;
  } | null;
}

export default function Navbar({ user }: NavbarProps) {
  return <PremiumNavbar user={user} />;
}