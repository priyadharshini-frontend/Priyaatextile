'use client';

import { useEffect, useState, useRef } from 'react';

export const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: 'Pure Handloom',
      subtitle: 'Authentic & Handcrafted',
      icon: '🧵',
      description: 'Each piece is meticulously handwoven by master artisans with generations of expertise',
      color: 'from-amber-400 to-amber-600',
      number: '01',
      stats: '10K+ Collections'
    },
    {
      title: 'Premium Quality',
      subtitle: 'Finest Fabrics',
      icon: '👑',
      description: 'Premium materials sourced globally ensuring luxury, comfort and durability',
      color: 'from-rose-400 to-rose-600',
      number: '02',
      stats: '100% Authentic'
    },
    {
      title: 'Secure Payment',
      subtitle: '100% Safe & Secure',
      icon: '🔐',
      description: 'Military-grade encryption ensuring your transactions and data are completely protected',
      color: 'from-emerald-400 to-emerald-600',
      number: '03',
      stats: 'Zero Fraud'
    },
    {
      title: 'Worldwide Shipping',
      subtitle: 'Fast Delivery',
      icon: '✈️',
      description: 'Express delivery to 150+ countries with real-time tracking and insurance',
      color: 'from-blue-400 to-blue-600',
      number: '04',
      stats: '48hr Delivery'
    },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section 
      className="relative py-32 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #f8f5f0 0%, #faf8f5 50%, #f5f2ed 100%)'
      }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Premium decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-8 blur-3xl"
          style={{
            backgroundColor: '#8b1e1e',
            top: '-10%',
            right: '-5%',
            mixBlendMode: 'multiply'
          }}
        ></div>
        <div 
          className="absolute w-72 h-72 rounded-full opacity-8 blur-3xl"
          style={{
            backgroundColor: '#c41e3a',
            bottom: '5%',
            left: '-3%',
            mixBlendMode: 'multiply'
          }}
        ></div>
        
        {/* Animated grid pattern */}
        <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8b1e1e" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[#8b1e1e] border-opacity-30 bg-white bg-opacity-50 backdrop-blur-sm">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#8b1e1e' }}>
              ✨ Premium Heritage
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight" style={{ color: '#1a0f1a' }}>
            Experience <span className="font-bold" style={{ color: '#8b1e1e' }}>Unparalleled</span> Elegance
          </h2>
          
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: '#666' }}>
            Discover what sets Heritage Sarees apart. Crafted with passion, curated with precision.
          </p>

          {/* Decorative line */}
          <div className="flex justify-center gap-2">
            <div className="w-12 h-1" style={{ backgroundColor: '#8b1e1e' }}></div>
            <div className="w-2 h-1" style={{ backgroundColor: '#8b1e1e', opacity: 0.5 }}></div>
            <div className="w-12 h-1" style={{ backgroundColor: '#8b1e1e' }}></div>
          </div>
        </div>

        {/* Features Grid - Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {features.map((item, index) => (
            <div
              key={item.title}
              className="group relative h-full perspective"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animation: `slideUpStagger 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.12}s both`,
                marginTop: index % 2 === 1 ? '2rem' : '0',
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                style={{
                  background: `linear-gradient(135deg, #8b1e1e, #c41e3a)`,
                  filter: 'blur(20px)'
                }}
              ></div>

              {/* Main Card */}
              <div
                className="relative h-full p-8 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-500"
                style={{
                  backgroundColor: hoveredIndex === index ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
                  border: `2px solid ${hoveredIndex === index ? '#8b1e1e' : 'rgba(139, 30, 30, 0.2)'}`,
                  transform: hoveredIndex === index 
                    ? 'translateY(-12px) rotateX(5deg) scale(1.02)' 
                    : 'translateY(0) rotateX(0) scale(1)',
                  boxShadow: hoveredIndex === index 
                    ? '0 25px 50px rgba(139, 30, 30, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                    : '0 8px 24px rgba(0, 0, 0, 0.08)',
                  perspective: '1000px',
                }}
              >
                {/* Background gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `linear-gradient(135deg, rgba(139, 30, 30, 0.02) 0%, rgba(196, 30, 58, 0.02) 100%)`,
                  }}
                ></div>

                {/* Top gradient accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, #8b1e1e, #c41e3a)`,
                    opacity: hoveredIndex === index ? 1 : 0.3,
                    width: hoveredIndex === index ? '100%' : '0%',
                  }}
                ></div>

                {/* Number Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className="text-5xl font-light transition-all duration-500"
                    style={{
                      color: hoveredIndex === index ? '#8b1e1e' : '#d4d4d4',
                      opacity: hoveredIndex === index ? 1 : 0.4,
                      transform: hoveredIndex === index ? 'scale(1)' : 'scale(0.8)',
                    }}
                  >
                    {item.number}
                  </div>

                  {/* Corner accent */}
                  <div
                    className="w-3 h-3 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: '#8b1e1e',
                      opacity: hoveredIndex === index ? 1 : 0.2,
                      transform: hoveredIndex === index ? 'scale(1.3)' : 'scale(1)',
                    }}
                  ></div>
                </div>

                {/* Icon Container with 3D effect */}
                <div className="mb-6 transition-all duration-500" style={{
                  transform: hoveredIndex === index ? 'scale(1.15) translateY(-8px)' : 'scale(1) translateY(0)',
                }}>
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all duration-500 relative overflow-hidden"
                    style={{
                      backgroundColor: hoveredIndex === index ? '#8b1e1e' : '#f5f0e8',
                      boxShadow: hoveredIndex === index 
                        ? '0 12px 24px rgba(139, 30, 30, 0.25)'
                        : '0 4px 12px rgba(139, 30, 30, 0.08)',
                    }}
                  >
                    {/* Shine effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                      }}
                    ></div>
                    <span>{item.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 relative z-10">
                  <h3 
                    className="text-xl font-bold transition-colors duration-500 tracking-tight"
                    style={{ color: '#1a0f1a' }}
                  >
                    {item.title}
                  </h3>

                  <p 
                    className="text-sm font-semibold transition-colors duration-500 tracking-wide uppercase"
                    style={{ color: '#8b1e1e' }}
                  >
                    {item.subtitle}
                  </p>

                  {/* Expandable description */}
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: hoveredIndex === index ? '120px' : '0px',
                      opacity: hoveredIndex === index ? 1 : 0,
                      marginTop: hoveredIndex === index ? '12px' : '0px',
                    }}
                  >
                    <div className="pt-3 border-t border-[#8b1e1e] border-opacity-20">
                      <p className="text-xs leading-relaxed" style={{ color: '#555' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats badge */}
                  <div
                    className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-500"
                    style={{
                      backgroundColor: hoveredIndex === index ? '#8b1e1e' : 'rgba(139, 30, 30, 0.08)',
                      color: hoveredIndex === index ? '#fff' : '#8b1e1e',
                      opacity: hoveredIndex === index ? 1 : 0.6,
                      transform: hoveredIndex === index ? 'scale(1)' : 'scale(0.9)',
                    }}
                  >
                    {item.stats}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                  style={{
                    width: hoveredIndex === index ? '100%' : '0%',
                    background: `linear-gradient(90deg, #8b1e1e, transparent)`,
                    opacity: hoveredIndex === index ? 0.5 : 0,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-24 text-center">
          <p className="text-sm tracking-widest uppercase mb-4" style={{ color: '#8b1e1e' }}>
            Ready to experience heritage?
          </p>
          <button
            className="px-8 py-4 rounded-full font-semibold transition-all duration-500 relative overflow-hidden group"
            style={{
              backgroundColor: '#8b1e1e',
              color: '#fff',
              boxShadow: '0 12px 30px rgba(139, 30, 30, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(139, 30, 30, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(139, 30, 30, 0.3)';
            }}
          >
            Explore Collection
            <span className="ml-2 inline-block transition-transform duration-300">→</span>
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideUpStagger {
          from {
            opacity: 0;
            transform: translateY(40px) rotateX(-10deg);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
            filter: blur(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};
