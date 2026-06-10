// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';

// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   z: number;
//   vx: number;
//   vy: number;
//   size: number;
//   color: string;
// }

// interface MousePos {
//   x: number;
//   y: number;
// }

// const collections = [
//   {
//     id: 1,
//     title: 'Silk Dreams',
//     description: 'Pure luxury sarees',
//     image: '/images/Banner/ban1.jpeg',
//     accent: '#d4af37',
//   },
//   {
//     id: 2,
//     title: 'Festive Glow',
//     description: 'Celebrate your moment',
//     image: '/images/Banner/ban1.jpeg',
//     accent: '#ff6b9d',
//   },
//   {
//     id: 3,
//     title: 'Heritage',
//     description: 'Timeless elegance',
//     image: '/images/Banner/ban1.jpeg',
//     accent: '#00d4ff',
//   },
// ];

// export default function DEsign() {
//   const [activeCard, setActiveCard] = useState(0);
//   const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });
//   const [particles, setParticles] = useState<Particle[]>([]);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const animationFrameRef = useRef<number>();

//   // Initialize particles
//   useEffect(() => {
//     const colors = ['#d4af37', '#ff6b9d', '#00d4ff', '#6366f1'];
//     const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       z: Math.random() * 100,
//       vx: (Math.random() - 0.5) * 0.3,
//       vy: (Math.random() - 0.5) * 0.3,
//       size: Math.random() * 3 + 1,
//       color: colors[Math.floor(Math.random() * colors.length)],
//     }));
//     setParticles(newParticles);
//   }, []);

//   // Animate particles
//   useEffect(() => {
//     const animate = () => {
//       setParticles((prev) =>
//         prev.map((p) => {
//           let x = p.x + p.vx;
//           let y = p.y + p.vy;
//           let vx = p.vx;
//           let vy = p.vy;

//           if (x < 0 || x > 100) vx *= -1;
//           if (y < 0 || y > 100) vy *= -1;

//           return {
//             ...p,
//             x: Math.max(0, Math.min(100, x)),
//             y: Math.max(0, Math.min(100, y)),
//             vx,
//             vy,
//           };
//         })
//       );
//       animationFrameRef.current = requestAnimationFrame(animate);
//     };

//     animationFrameRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationFrameRef.current!);
//   }, []);

//   // Mouse tracking
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (containerRef.current) {
//         const rect = containerRef.current.getBoundingClientRect();
//         setMousePos({
//           x: (e.clientX - rect.left) / rect.width,
//           y: (e.clientY - rect.top) / rect.height,
//         });
//       }
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const rotX = (mousePos.y - 0.5) * 30;
//   const rotY = (mousePos.x - 0.5) * 30;

//   return (
//     <section 
//       ref={containerRef}
//       className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-900 to-black pt-20"
//       style={{
//         background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #0f0f0f 100%)',
//       }}
//     >
//       {/* Animated gradient mesh background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-1/3 -left-1/3 w-2/3 h-2/3 rounded-full bg-gradient-to-br from-amber-900/20 via-transparent to-transparent blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 rounded-full bg-gradient-to-tl from-pink-900/15 via-transparent to-transparent blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//         <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-cyan-900/10 via-transparent to-transparent blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
//       </div>

//       {/* Floating particles */}
//       <div className="absolute inset-0 pointer-events-none">
//         {particles.map((p) => (
//           <div
//             key={p.id}
//             className="absolute rounded-full"
//             style={{
//               left: `${p.x}%`,
//               top: `${p.y}%`,
//               width: `${p.size}px`,
//               height: `${p.size}px`,
//               background: p.color,
//               opacity: 0.15,
//               filter: 'blur(0.5px)',
//               boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="relative z-10">
//         {/* Main Grid Layout */}
//         <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-12 items-center">
          
//           {/* Left: Content */}
//           <div 
//             className="space-y-8 pointer-events-none"
//             style={{
//               transform: `translateX(${mousePos.x * 15}px) translateY(${mousePos.y * 10}px)`,
//               transition: 'transform 0.3s ease-out',
//             }}
//           >
//             {/* Animated label */}
//             <div className="inline-block">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-pink-500 rounded-full blur opacity-60"></div>
//                 <div className="relative px-6 py-2 bg-black rounded-full border border-amber-400/50 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">
//                   ✨ Exclusively Curated
//                 </div>
//               </div>
//             </div>

//             {/* Main title with animated gradient */}
//             <div className="space-y-4">
//               <h1 className="text-6xl md:text-7xl font-black leading-tight">
//                 <span className="block text-white">Discover</span>
//                 <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-cyan-400 animate-pulse">
//                   Radiance
//                 </span>
//               </h1>

//               <p className="text-lg text-gray-300 max-w-md leading-relaxed">
//                 Experience the fusion of heritage craftsmanship and contemporary elegance. 
//                 Each collection tells a story of artistry and passion.
//               </p>
//             </div>

//             {/* Interactive stats */}
//             <div className="grid grid-cols-3 gap-4 py-8">
//               {[
//                 { value: '500+', label: 'Designs' },
//                 { value: '100%', label: 'Authentic' },
//                 { value: '24K', label: 'Customers' },
//               ].map((stat, i) => (
//                 <div key={i} className="group cursor-pointer">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-pink-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     <div className="relative bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-lg group-hover:border-amber-400/50 transition-colors duration-300">
//                       <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
//                       <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* CTA Button */}
//             <button className="group relative px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-amber-400 to-pink-400 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.8)] hover:scale-105 active:scale-95 pointer-events-auto">
//               <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
//                 Explore Collection
//                 <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//             </button>
//           </div>

//           {/* Right: 3D Rotating Cards */}
//           <div 
//             className="relative h-96 md:h-[600px] flex items-center justify-center pointer-events-auto"
//             style={{
//               perspective: '1200px',
//               transform: `rotateX(${rotX * 0.5}deg) rotateY(${rotY * 0.5}deg)`,
//               transition: 'transform 0.1s ease-out',
//             }}
//           >
//             {/* Card Stack */}
//             <div className="relative w-80 h-96 md:w-96 md:h-[500px]">
//               {collections.map((collection, index) => {
//                 const offset = index - activeCard;
//                 const isActive = offset === 0;
//                 const isBefore = offset < 0;

//                 return (
//                   <div
//                     key={collection.id}
//                     onClick={() => setActiveCard(index)}
//                     className="absolute inset-0 cursor-pointer transition-all duration-500 ease-out"
//                     style={{
//                       transform: `
//                         translateY(${offset * 20}px)
//                         scale(${isActive ? 1 : 0.95 - Math.abs(offset) * 0.05})
//                         rotateZ(${offset * 5}deg)
//                         ${isBefore ? 'translateZ(100px)' : 'translateZ(0)'}
//                       `,
//                       opacity: Math.abs(offset) > 2 ? 0 : 1,
//                       pointerEvents: Math.abs(offset) > 1 ? 'none' : 'auto',
//                     }}
//                   >
//                     {/* Card Container */}
//                     <div className="relative w-full h-full rounded-3xl overflow-hidden group">
//                       {/* Background image */}
//                       <div className="absolute inset-0">
//                         <Image
//                           src={collection.image}
//                           alt={collection.title}
//                           fill
//                           className="object-cover group-hover:scale-110 transition-transform duration-500"
//                         />
//                       </div>

//                       {/* Overlay gradient */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>

//                       {/* Border glow */}
//                       <div 
//                         className="absolute inset-0 rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                         style={{
//                           borderColor: collection.accent,
//                           boxShadow: `inset 0 0 20px ${collection.accent}30, 0 0 40px ${collection.accent}50`,
//                         }}
//                       ></div>

//                       {/* Content */}
//                       <div className="absolute inset-0 flex flex-col justify-end p-8">
//                         <div className="space-y-4">
//                           <div 
//                             className="text-sm font-bold tracking-widest uppercase"
//                             style={{ color: collection.accent }}
//                           >
//                             {collection.id === 1 ? '👑' : collection.id === 2 ? '🎉' : '💎'} Collection
//                           </div>

//                           <h3 className="text-4xl font-black text-white">
//                             {collection.title}
//                           </h3>

//                           <p className="text-gray-300">
//                             {collection.description}
//                           </p>

//                           {isActive && (
//                             <button 
//                               className="mt-6 px-6 py-2 text-sm font-bold text-black rounded-full transition-all duration-300 hover:scale-105"
//                               style={{
//                                 background: collection.accent,
//                               }}
//                             >
//                               Shop Now
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Bottom indicator dots */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
//           {collections.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveCard(index)}
//               className="relative group"
//             >
//               <div 
//                 className="w-3 h-3 rounded-full transition-all duration-300 bg-white/30 group-hover:bg-white/60"
//                 style={{
//                   width: activeCard === index ? '32px' : '12px',
//                   background: activeCard === index 
//                     ? `linear-gradient(90deg, ${collections[index].accent}, ${collections[(index + 1) % collections.length].accent})`
//                     : 'rgba(255,255,255,0.3)',
//                 }}
//               ></div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
