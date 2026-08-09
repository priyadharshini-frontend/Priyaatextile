"use client";

import { useState,useEffect } from "react";
import Toolbar from "@/components/product/Toolbar";
import ProductGrid from "@/components/product/ProductGrid";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import { useProductStore } from "@/store/ProductStore";
import { useProducts } from "@/hooks/useProducts";
import Filter from "./Filter";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();
useEffect(() => {
  setSelectedCategory(searchParams.get("category"));
  setSelectedSubCategory(searchParams.get("subcategory"));
}, [searchParams]);

const [maxPrice, setMaxPrice] = useState(3000);  




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
console.log("Store Products:", products);
console.log("Store Count:", products.length);

  return (
    <>
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
        <div className="hidden lg:block">
          <Filter 
  selectedCategory={selectedCategory}
  selectedSubCategory={selectedSubCategory}
onCategorySelect={(slug) => {
  const params = new URLSearchParams(searchParams.toString());

  params.set("category", slug);
  params.delete("subcategory");

  router.push(`${pathname}?${params.toString()}`);
}}
  onSubCategorySelect={setSelectedSubCategory}
  maxPrice={maxPrice}
  onPriceChange={setMaxPrice}
onClearFilters={() => {
  setSelectedCategory(null);
  setSelectedSubCategory(null);
  setMaxPrice(5000);

  // Remove all query params
  router.push("/product");
}}
/>
        </div>
       
<div className="">
   {loading ? <ProductGridSkeleton /> : <ProductGrid products={products}/>}

</div>
       
      </div>
    </div> 
     {showMobileFilter && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/50 z-40 lg:hidden"
      onClick={() => setShowMobileFilter(false)}
    />

    {/* Drawer */}
    <div
      className="
        fixed
        top-0
        left-0
        h-full
        w-80
        max-w-[90%]
        bg-white
        z-50
        overflow-y-auto
        shadow-xl
        lg:hidden
      "
    >
      <div className="flex items-center justify-between p-5 border-b">
        <h2 className="text-xl font-bold">
          Filters
        </h2>

        <button
          onClick={() => setShowMobileFilter(false)}
          className="text-3xl"
        >
          ×
        </button>
      </div>

      <div className="p-4">
        <Filter
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onCategorySelect={(id) => {
            setSelectedCategory(id);
            setSelectedSubCategory(null);
          }}
onSubCategorySelect={(slug) => {
  const params = new URLSearchParams(searchParams.toString());

  params.set("subcategory", slug);

  router.push(`${pathname}?${params.toString()}`);
}}       maxPrice={maxPrice}
          onPriceChange={setMaxPrice}
        onClearFilters={() => {
  setSelectedCategory(null);
  setSelectedSubCategory(null);
  setMaxPrice(5000);

  // Remove all query params
  router.push("/product");
}}
        />
      </div>
    </div>
  </>
)}
    </>
 

    
  );



}
