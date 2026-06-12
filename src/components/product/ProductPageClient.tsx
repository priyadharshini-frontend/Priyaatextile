"use client";

import { useState } from "react";
import Toolbar from "@/components/product/Toolbar";
import Filter from "@/components/product/Filter";
import ProductGrid from "@/components/product/ProductGrid";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import { useProductStore } from "@/store/ProductStore";

export default function ProductPageClient() {
 type ViewMode = "grid" | "list";

  type SortBy =
    | "featured"
    | "newest"
    | "price-low"
    | "price-high"
    | "popular"
    | "rating";


  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<SortBy>("featured");

  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [showMobileFilter, setShowMobileFilter] = useState(false);

const products=useProductStore((state)=>state.products)


const loading =useProductStore((state)=>state.loading)

  return (
    
    <div className="min-h-screen bg-white max-w-10xl px-4 mt-30">
  
     
      <Toolbar
        productCount={124}
        search={search}
        sortBy={sortBy}
        viewMode={viewMode}
        onSearchChange={setSearch}
        onSortChange={setSortBy}
        onViewModeChange={setViewMode}
        onOpenFilter={() => setShowMobileFilter(true)}
      />

      <div className="max-w-10xl mx-auto px-4">
        <div className="">
            {/* <div className="hidden lg:block">
        <Filter
          onClearFilters={() => {
            console.log("Clear filters");
          }}
        />
      </div> */}
     <div>
  {loading ? (
    <ProductGridSkeleton viewMode={viewMode} />
  ) : (
    <ProductGrid
      products={products}
      viewMode={viewMode}
    />
  )}
</div>

        </div>
      </div>

    
    </div>
  );
}