// 'use client';

// import { useState } from 'react';
// import { ProductCard } from "../product/ProductCard"

// const products = [
//   {
//     id: 1,
//     name: 'Pure Kanjivaram Silk Saree',
//     price: '24,999',
//     image:
//       'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
//   },
//   {
//     id: 2,
//     name: 'Banarasi Handloom Saree',
//     price: '18,999',
//     image:
//       'https://images.unsplash.com/photo-1583391733981-8496f0d7cbfd?w=600',
//   },
//   {
//     id: 3,
//     name: 'Gold Tissue Silk Saree',
//     price: '22,499',
//     image:
//       'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
//   },
//   {
//     id: 4,
//     name: 'Traditional Wedding Saree',
//     price: '26,999',
//     image:
//       'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
//   },
// ];

// export const Collection = () => {
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   const filters = ['All', 'Silk', 'Cotton', 'Wedding', 'New'];

//   return (
//     <section className="relative lg:py-20 py-10 overflow-hidden" style={{ backgroundColor: '#faf7f2' }}>
//       {/* Decorative Background Elements */}
//       <div className="absolute top-0 right-0 w-96 h-96 opacity-3 rounded-full" style={{ backgroundColor: '#8b1e1e' }}></div>
//       <div className="absolute bottom-0 left-0 w-72 h-72 opacity-2 rounded-full" style={{ backgroundColor: '#d4af37' }}></div>

//       <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
//         {/* Header Section */}
//         <div className="mb-16">
//           <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
//             {/* Left Content */}
//             <div className="space-y-4 flex-1">
//               {/* Badge */}
//               <div className="inline-block">
//                 <span 
//                   className="px-4 py-2 rounded-full text-sm font-bold text-white"
//                   style={{ backgroundColor: '#8b1e1e' }}
//                 >
//                   ✨ Curated For You
//                 </span>
//               </div>

//               {/* Title with gradient */}
//               <h2 className="text-5xl md:text-6xl font-black leading-tight" style={{ color: '#3d1f1f' }}>
//                 Our Exclusive <br />
//                 <span 
//                   className="relative inline-block text-transparent bg-clip-text"
//                   style={{
//                     backgroundImage: 'linear-gradient(90deg, #8b1e1e 0%, #d4af37 100%)',
//                   }}
//                 >
//                   Collection
//                 </span>
//               </h2>

//               {/* Subtitle */}
//               <p className="text-lg text-gray-600 max-w-lg">
//                 Handpicked luxury sarees crafted by artisans. Each piece is a masterpiece of tradition and elegance.
//               </p>

//               {/* Stats */}
//               <div className="flex gap-8 pt-4">
//                 <div className="flex flex-col">
//                   <span className="text-3xl font-black" style={{ color: '#8b1e1e' }}>500+</span>
//                   <span className="text-sm text-gray-600">Designs</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-3xl font-black" style={{ color: '#8b1e1e' }}>100%</span>
//                   <span className="text-sm text-gray-600">Authentic</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-3xl font-black" style={{ color: '#8b1e1e' }}>12K+</span>
//                   <span className="text-sm text-gray-600">Happy Customers</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right: View All Button */}
//             <div className="flex gap-4 flex-col md:flex-row md:items-center">
//               <button 
//                 className="group relative px-8 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 rounded-2xl overflow-hidden text-white"
//                 style={{
//                   backgroundColor: '#8b1e1e',
//                   boxShadow: '0 8px 24px rgba(139, 30, 30, 0.2)',
//                 }}
//               >
//                 <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
//                   View All Collection
//                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
//         </div>

//         {/* Filter Section */}
//         <div className="mb-12">
//           <div className="flex flex-wrap gap-3">
//             {filters.map((filter) => (
//               <button
//                 key={filter}
//                 onClick={() => setActiveFilter(filter.toLowerCase())}
//                 className="px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm"
//                 style={{
//                   backgroundColor: activeFilter === filter.toLowerCase() ? '#8b1e1e' : '#ffffff',
//                   color: activeFilter === filter.toLowerCase() ? '#ffffff' : '#3d1f1f',
//                   border: `2px solid ${activeFilter === filter.toLowerCase() ? '#8b1e1e' : '#eadfce'}`,
//                   boxShadow: activeFilter === filter.toLowerCase() ? '0 4px 12px rgba(139, 30, 30, 0.2)' : 'none',
//                 }}
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Products Grid with Staggered Animation */}
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//           {products.map((product, index) => (
//             <div
//               key={product.id}
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//               style={{
//                 animation: `slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s both`,
//               }}
//             >
//               {/* Product Number Badge */}
//               <div
//                 className="mb-3 inline-block px-3 py-1 rounded-full text-xs font-bold text-white transition-all duration-500"
//                 style={{
//                   backgroundColor: '#8b1e1e',
//                   opacity: hoveredIndex === index ? 1 : 0.5,
//                   transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
//                 }}
//               >
//                 {String(index + 1).padStart(2, '0')}
//               </div>

//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA Section */}
//         <div className="mt-20 p-8 rounded-3xl text-center" style={{ backgroundColor: '#ffffff', border: '2px solid #eadfce' }}>
//           <h3 className="text-2xl font-bold mb-3" style={{ color: '#3d1f1f' }}>
//             Didn't find what you're looking for?
//           </h3>
//           <p className="text-gray-600 mb-6">
//             Browse our complete collection of 500+ handcrafted sarees
//           </p>
//           <button
//             className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
//             style={{
//               backgroundColor: '#d4af37',
//               color: '#000000',
//             }}
//           >
//             Explore More →
//           </button>
//         </div>
//       </div>

//       {/* Animations */}
//       <style>{`
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(40px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </section>
//   );
// };
