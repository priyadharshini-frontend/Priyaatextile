"use client";

import { useRouter } from "next/navigation";

export default function Logoutbutton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="pp-logout">
      Sign out
    </button>
  );
}