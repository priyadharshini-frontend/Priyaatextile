
"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/ProductStore";

export default function ProductInitializer() {
  const fetchProducts = useProductStore(
    (state) => state.fetchProducts
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return null;
}