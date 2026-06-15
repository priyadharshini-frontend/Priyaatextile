"use client";

import { useState } from "react";
import Toolbar from "@/components/product/Toolbar";
import ProductGrid from "@/components/product/ProductGrid";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import { useProductStore } from "@/store/ProductStore";
import { useProducts } from "@/hooks/useProducts";
import Filter from "./Filter";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

  type SortBy =
    | "featured"
    | "newest"
    | "price-low"
    | "price-high"
    | "popular"
    | "rating";

export default function ProductPageClient() {
 
  const [showMobileFilter, setShowMobileFilter] = useState(false);


  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();

const search = useProductStore((s) => s.search);
const setSearch = useProductStore((s) => s.setSearch);

const sort = useProductStore((state) => state.sort);
const setSort = useProductStore((state) => state.setSort);
  useProducts();

  const handleSortChange = (value: string) => {
  setSort(value);

  const params = new URLSearchParams(searchParams.toString());

  if (value && value !== "featured") {
    params.set("sort", value);
  } else {
    params.delete("sort");
  }

  router.push(`${pathname}?${params.toString()}`);
};


const handleSearchChange = (value: string) => {
  setSearch(value);      // Zustand

};
  return (
    <div className="min-h-screen bg-white max-w-10xl px-4 mt-30">
      <Toolbar
        productCount={products.length}
        search={search}
        onSearchChange={handleSearchChange}
        onOpenFilter={() => setShowMobileFilter(true)}
        sortBy={sort}
        onSortChange={handleSortChange}
      />

      <div className="max-w-10xl mx-auto px-4 flex gap-6">
        <Filter/>

        {loading ? <ProductGridSkeleton /> : <ProductGrid />}
      </div>
    </div>
  );
}