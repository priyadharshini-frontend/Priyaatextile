// 'use client';

// import { useState } from 'react';
// import ProductHero from '@/components/product/ProductHero';
// import { Filter } from '@/components/product/Filter';
// import ProductGrid from '@/components/product/ProductGrid';
// import type { Filters } from '@/types/filters';

// type ViewMode = 'grid' | 'list';
// type SortBy =
//   | 'featured'
//   | 'newest'
//   | 'price-low'
//   | 'price-high'
//   | 'popular'
//   | 'rating';

// export default function Page() {
//   const [filters, setFilters] = useState<Filters>({
//     categories: [],
//     priceRange: [1000, 50000],
//     colors: [],
//     materials: [],
//     rating: null,
//   });

//   const [sortBy, setSortBy] = useState<SortBy>('featured');
//   const [showMobileFilter, setShowMobileFilter] = useState(false);
//   const [viewMode, setViewMode] = useState<ViewMode>('grid');

//   const activeFilterCount =
//     filters.categories.length +
//     filters.colors.length +
//     filters.materials.length +
//     (filters.rating ? 1 : 0);

//   const totalProducts = 1247;
//   const filteredProducts = Math.max(
//     1,
//     totalProducts - activeFilterCount * 50
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <ProductHero />

//       <section className="bg-gradient-to-b from-[#faf7f2] to-[#f5f2ed] py-12 lg:py-20">
//         <div className="mx-auto px-4 lg:px-8 max-w-7xl">

//           <div className="mb-10">
//             <h1 className="text-4xl font-bold">
//               Explore Our Collections
//             </h1>
//           </div>

//           <div className="grid lg:grid-cols-[300px_1fr] gap-6">

//             {/* FILTER */}
//             <div className="hidden lg:block">
//               <Filter
//                 onFilterChange={(newFilters: Filters) =>
//                   setFilters(newFilters)
//                 }
//               />
//             </div>

//             {/* MOBILE FILTER */}
//             {showMobileFilter && (
//               <div className="fixed inset-0 z-50 lg:hidden">
//                 <div
//                   className="absolute inset-0 bg-black/50"
//                   onClick={() => setShowMobileFilter(false)}
//                 />

//                 <div className="absolute left-0 top-0 w-full max-w-xs h-full bg-white p-5">
//                   <Filter
//                     onFilterChange={(newFilters: Filters) => {
//                       setFilters(newFilters);
//                       setShowMobileFilter(false);
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* PRODUCTS */}
//             {/* <ProductGrid
//               sortBy={sortBy}
//               viewMode={viewMode}
//               filters={filters}
//             /> */}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }