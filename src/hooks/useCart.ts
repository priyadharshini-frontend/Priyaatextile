"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export function useCartCount() {
  const setCartCount =
    useCartStore((s) => s.setCartCount);

  useEffect(() => {
    async function fetchCount() {
      const res = await fetch("/api/cart/count");

      const data = await res.json();

      setCartCount(data.count);
    }

    fetchCount();
  }, [setCartCount]);
}