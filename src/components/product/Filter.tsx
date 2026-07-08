"use client";
import { useState, useEffect } from "react";
interface FilterSidebarProps {
  selectedCategory: string | null;
  selectedSubCategory: string | null;

  onCategorySelect: (id: string) => void;
  onSubCategorySelect: (id: string) => void;

  maxPrice: number;
  onPriceChange: (price: number) => void;

  onClearFilters: () => void;
}

export default function Filter({
  selectedCategory,
  selectedSubCategory,
  onCategorySelect,
  onSubCategorySelect,
  maxPrice,
  onPriceChange,
  onClearFilters,
}: FilterSidebarProps) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();

    setCategories(data.data);
  }

  return (
    <aside
      className="
   w-full
lg:w-72
lg:sticky
lg:top-24
bg-white
p-6
rounded-none
lg:rounded-3xl
border-0
lg:border
shadow-none
lg:shadow-sm
border-[#eadfce]
  "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#3d1f1f]">Filters</h2>

        <button
          onClick={onClearFilters}
          className="text-sm text-[#8b1e1e] hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-[#3d1f1f]">Categories</h3>

        <div className="space-y-3">
          {/* All Products */}
          <button
            onClick={onClearFilters}
            className={`w-full text-left px-3 py-2 rounded-lg transition ${
              !selectedCategory
                ? "bg-[#8b1e1e] text-white"
                : "bg-[#f8f3ec] hover:bg-[#eadfce]"
            }`}
          >
            All Products
          </button>

          {categories.map((category: any) => (
            <details
              key={category.id}
              className="group rounded-xl border border-[#eadfce] overflow-hidden"
            >
              <summary
                onClick={() => onCategorySelect(category.slug)}
                className={`cursor-pointer list-none flex items-center justify-between px-3 py-3 transition ${
                  selectedCategory === category.id
                    ? "bg-[#8b1e1e] text-white"
                    : "hover:bg-[#faf6f2]"
                }`}
              >
                <span>{category.name}</span>

                <svg
                  className="w-4 h-4 transition-transform group-open:rotate-180"
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

              <div className="border-t bg-white">
                {category.subCategories.length > 0 ? (
                  category.subCategories.map((sub: any) => (
                    <button
                      key={sub.id}
                      onClick={() => onSubCategorySelect(sub.slug)}
                      className={`w-full text-left px-8 py-2 transition ${
                        selectedSubCategory === sub.slug
                          ? "bg-[#eadfce] text-[#8b1e1e] font-semibold"
                          : "text-gray-600 hover:bg-[#faf6f2]"
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))
                ) : (
                  <p className="px-8 py-3 text-sm text-gray-400">
                    No Subcategories
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </aside>
  );
}
