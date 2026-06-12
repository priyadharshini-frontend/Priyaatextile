'use client';

import { Grid3X3, List, SlidersHorizontal, Search } from 'lucide-react';

type ViewMode = 'grid' | 'list';

type SortBy =
  | 'featured'
  | 'newest'
  | 'price-low'
  | 'price-high'
  | 'popular'
  | 'rating';

interface ProductToolbarProps {
  productCount: number;
  search: string;
  sortBy: SortBy;
  viewMode: ViewMode;

  onSearchChange: (value: string) => void;
  onSortChange: (value: SortBy) => void;
  onViewModeChange: (value: ViewMode) => void;
  onOpenFilter: () => void;
}

export default function Toolbar({
  productCount,
  search,
  sortBy,
  viewMode,
  onSearchChange,
  onSortChange,
  onViewModeChange,
  onOpenFilter,
}: ProductToolbarProps) {
  return (
    <div className="mb-8 rounded-3xl border border-[#eadfce] bg-white p-5 shadow-sm">
      {/* Top Section */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-[#3d1f1f]">
            Explore Collections
          </h1>

         
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="
                w-full sm:w-64
                rounded-xl
                border border-gray-300
                bg-white
                py-2.5 pl-10 pr-4
                text-sm
                outline-none
                transition
                focus:border-[#8b1e1e]
                focus:ring-2
                focus:ring-[#8b1e1e]/20
              "
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as SortBy)
            }
            className="
              rounded-xl
              border border-gray-300
              bg-white
              px-4 py-2.5
              text-sm
              outline-none
              transition
              focus:border-[#8b1e1e]
              focus:ring-2
              focus:ring-[#8b1e1e]/20
            "
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="popular">Popular</option>
            <option value="rating">Top Rated</option>
          </select>

          {/* View Toggle */}
          <div className="flex overflow-hidden rounded-xl border border-gray-300 p-2 bg-[#8b1e1e]">

            <button
              onClick={() => onViewModeChange('grid')}
              className=" text-white"
            >
              <Grid3X3 size={18} />
            </button>

          
          </div>

          {/* Mobile Filter */}
          <button
            onClick={onOpenFilter}
            className="
              flex items-center justify-center gap-2
              rounded-xl
              border border-[#8b1e1e]
              px-4 py-2.5
              text-sm font-medium
              text-[#8b1e1e]
              transition
              hover:bg-[#8b1e1e]
              hover:text-white
              lg:hidden
            "
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

        </div>
      </div>
    </div>
  );
}