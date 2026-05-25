'use client';

import { useState } from 'react';
import ProductHero from '@/components/product/ProductHero';
import { Filter } from '@/components/product/Filter';
import ProductGrid from '@/components/product/ProductGrid';
import Navbar from '@/components/common/navbar/Navbar';

export default function Page() {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [1000, 50000],
    colors: [],
    materials: [],
    rating: null,
  });

  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Calculate active filter count
  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    filters.materials.length +
    (filters.rating ? 1 : 0);

  // Product count (mock)
  const totalProducts = 1247;
  const filteredProducts = Math.max(1, totalProducts - activeFilterCount * 50);

  return (

    <div className="min-h-screen bg-white">
      <Navbar/>
      <ProductHero />

      {/* Main Collection Section */}
      <section className="bg-gradient-to-b from-[#faf7f2] to-[#f5f2ed] py-12 lg:py-20">
        <div className="mx-auto px-4 lg:px-8 max-w-7xl">
          {/* Header with Sort & View Options */}
          <div className="mb-10 space-y-6">
            {/* Title Section */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#1a0f1a] mb-2">
                Explore Our Collections
              </h1>
              <p className="text-gray-600">
                Handpicked sarees from our finest artisans
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#eadfce] shadow-sm">
              {/* Left: Product Count */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Showing</span>
                <span
                  className="text-lg font-bold px-3 py-1 rounded-lg"
                  style={{
                    backgroundColor: '#ffe8e8',
                    color: '#8b1e1e',
                  }}
                >
                  {filteredProducts}
                </span>
                <span className="text-sm text-gray-600">of {totalProducts} products</span>
              </div>

              {/* Center: Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-[#eadfce] hover:border-[#8b1e1e] transition-all duration-300"
              >
                <span className="text-lg">⚙️</span>
                <span className="text-sm font-medium">Filters</span>
                {activeFilterCount > 0 && (
                  <span
                    className="ml-2 text-xs font-bold px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: '#8b1e1e' }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Right: Sort & View */}
              <div className="flex items-center gap-3 ml-auto">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-[#eadfce] text-sm font-medium focus:outline-none focus:border-[#8b1e1e] transition-colors bg-white cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                </select>

                {/* View Mode Toggle */}
                <div className="hidden md:flex items-center gap-1 p-1 rounded-lg border border-[#eadfce]">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 rounded transition-all duration-300 text-lg ${
                      viewMode === 'grid'
                        ? 'bg-[#8b1e1e] text-white'
                        : 'text-gray-600 hover:text-[#8b1e1e]'
                    }`}
                  >
                    ⊞
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 rounded transition-all duration-300 text-lg ${
                      viewMode === 'list'
                        ? 'bg-[#8b1e1e] text-white'
                        : 'text-gray-600 hover:text-[#8b1e1e]'
                    }`}
                  >
                    ≡
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 p-4 bg-white rounded-2xl border border-[#eadfce]">
                <span className="text-xs font-semibold text-gray-600">Active Filters:</span>

                {filters.categories.map((cat) => (
                  <div
                    key={cat}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-2 transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#8b1e1e' }}
                  >
                    {cat}
                    <button
                      onClick={() => {
                        const updated = filters.categories.filter((c) => c !== cat);
                        setFilters({ ...filters, categories: updated });
                      }}
                      className="ml-1 hover:opacity-80"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {filters.colors.map((color) => (
                  <div
                    key={color}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-2 transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#d4af37' }}
                  >
                    {color}
                    <button
                      onClick={() => {
                        const updated = filters.colors.filter((c) => c !== color);
                        setFilters({ ...filters, colors: updated });
                      }}
                      className="ml-1 hover:opacity-80"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {filters.materials.map((material) => (
                  <div
                    key={material}
                    className="px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-2 transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#2d5016' }}
                  >
                    {material}
                    <button
                      onClick={() => {
                        const updated = filters.materials.filter((m) => m !== material);
                        setFilters({ ...filters, materials: updated });
                      }}
                      className="ml-1 hover:opacity-80"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {filters.rating && (
                  <div
                    className="px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-2 transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#fbbf24' }}
                  >
                    {filters.rating}+ Stars
                    <button
                      onClick={() => setFilters({ ...filters, rating: null })}
                      className="ml-1 hover:opacity-80"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:gap-10 grid-cols-1 lg:grid-cols-[300px_1fr]">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
              <Filter onFilterChange={setFilters} />
            </div>

            {/* Mobile Filter Modal */}
            {showMobileFilter && (
              <div className="fixed inset-0 z-50 lg:hidden">
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setShowMobileFilter(false)}
                ></div>

                {/* Modal */}
                <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-white overflow-y-auto animate-in slide-in-from-left duration-300 rounded-r-3xl">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-[#1a0f1a]">Filters</h2>
                      <button
                        onClick={() => setShowMobileFilter(false)}
                        className="text-2xl text-gray-500 hover:text-[#8b1e1e] transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                    <Filter onFilterChange={(newFilters) => {
                      setFilters(newFilters);
                      setShowMobileFilter(false);
                    }} />
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div>
              <ProductGrid
                sortBy={sortBy}
                viewMode={viewMode}
                filters={filters}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Empty State (if no products) */}
      {filteredProducts === 0 && (
        <section className="py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-[#1a0f1a] mb-2">No products found</h2>
          <p className="text-gray-600 mb-8">Try adjusting your filters to find what you're looking for</p>
          <button
            onClick={() =>
              setFilters({
                categories: [],
                priceRange: [1000, 50000],
                colors: [],
                materials: [],
                rating: null,
              })
            }
            className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: '#8b1e1e' }}
          >
            Reset Filters
          </button>
        </section>
      )}
    </div>
  );
}
