'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const categories = [
  {
    name: 'Kanjivaram',
    description: 'Royal Heritage',
    image: '/images/Banner/ban1.jpeg',
    accent: '#c19a3b',
    details: 'Hand-picked pieces celebrating tradition and elegance',
    rating: '4.9/5',
    reviews: '2.4K',
    styles: '320+',
  },
  {
    name: 'Banarasi',
    description: 'Golden Elegance',
    image: '/images/Banner/ban1.jpeg',
    accent: '#d4af37',
    details: 'Luxurious silk sarees with intricate brocade work',
    rating: '4.8/5',
    reviews: '1.8K',
    styles: '280+',
  },
  {
    name: 'Silk Sarees',
    description: 'Pure Luxury',
    image: '/images/Banner/ban1.jpeg',
    accent: '#8b1e1e',
    details: 'Premium silk collection for the discerning woman',
    rating: '4.9/5',
    reviews: '3.2K',
    styles: '450+',
  },
  {
    name: 'Cotton Sarees',
    description: 'Everyday Grace',
    image: '/images/Banner/ban1.jpeg',
    accent: '#c19a3b',
    details: 'Comfortable and elegant for daily wear',
    rating: '4.7/5',
    reviews: '1.5K',
    styles: '220+',
  },
  {
    name: 'Wedding',
    description: 'Your Perfect Day',
    image: '/images/Banner/ban1.jpeg',
    accent: '#d4af37',
    details: 'Magnificent bridal collections for your special moment',
    rating: '5.0/5',
    reviews: '890',
    styles: '150+',
  },
  {
    name: 'New Arrivals',
    description: 'Latest Trends',
    image: '/images/Banner/ban1.jpeg',
    accent: '#8b1e1e',
    details: 'Fresh designs arriving every week',
    rating: '4.8/5',
    reviews: '1.2K',
    styles: '180+',
  },
];

export const Category = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 3;
  const totalSlides = Math.ceil(categories.length / itemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayTimer.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isAutoPlay, currentIndex]);

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlay(false);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    if (touchStart - touchEnd > 75) {
      handleNext();
    } else if (touchEnd - touchStart > 75) {
      handlePrev();
    }
    setIsAutoPlay(true);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const visibleItems = categories.slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView
  );

  const getSlideOffset = () => {
    return direction === 'next' ? 100 : -100;
  };

  return (
    <section 
      className="relative min-h-screen py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #faf8f3 0%, #f5f2ed 50%, #faf8f3 100%)',
      }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-8"
          style={{
            backgroundColor: '#8b1e1e',
            top: '-10%',
            right: '-5%',
            mixBlendMode: 'multiply',
          }}
        ></div>
        <div
          className="absolute w-72 h-72 rounded-full blur-3xl opacity-6"
          style={{
            backgroundColor: '#d4af37',
            bottom: '-5%',
            left: '-3%',
            mixBlendMode: 'multiply',
          }}
        ></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
        {/* Premium Header */}
        <div className="mb-16">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[#8b1e1e] border-opacity-30 bg-white bg-opacity-50 backdrop-blur-sm">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#8b1e1e' }}>
              ✨ Curated Collections
            </span>
          </div>

          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-light mb-4 tracking-tight"
            style={{ color: '#1a0f1a' }}
          >
            Discover Our <span className="font-bold" style={{ color: '#8b1e1e' }}>Timeless</span> Collections
          </h2>

          <p className="text-lg max-w-2xl mt-4 mb-8" style={{ color: '#666' }}>
            Explore our handpicked selection of authentic sarees. Swipe to discover your perfect piece.
          </p>

          {/* Decorative line */}
          <div className="flex gap-2">
            <div className="w-12 h-1" style={{ backgroundColor: '#8b1e1e' }}></div>
            <div className="w-2 h-1" style={{ backgroundColor: '#8b1e1e', opacity: 0.5 }}></div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Items */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-all duration-700 ease-out"
              style={{
                animation: `slideCarousel 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
              }}
            >
              {visibleItems.map((category, idx) => (
                <div
                  key={`${currentIndex}-${idx}`}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                  style={{
                    animation: `fadeInSlide 0.7s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  {/* Category Card */}
                  <div
                    className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl"
                    style={{
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                      transform: 'perspective(1000px)',
                    }}
                    onMouseEnter={() => setIsAutoPlay(false)}
                    onMouseLeave={() => setIsAutoPlay(true)}
                  >
                    {/* Background Image */}
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0 transition-all duration-500"
                      style={{
                        background: `linear-gradient(135deg, rgba(26, 15, 26, 0.7) 0%, ${category.accent}aa 100%)`,
                      }}
                    ></div>

                    {/* Accent Bar */}
                    <div
                      className="absolute top-0 left-0 w-1 h-full transition-all duration-500 group-hover:w-2"
                      style={{ backgroundColor: category.accent }}
                    ></div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                      {/* Top: Badge */}
                      <div
                        className="self-start px-3 py-1 rounded-full text-xs font-bold text-white transition-all duration-500 backdrop-blur-md"
                        style={{
                          backgroundColor: `${category.accent}aa`,
                          border: `1px solid ${category.accent}`,
                          transform: 'translateY(0)',
                        }}
                      >
                        ✨ Collection
                      </div>

                      {/* Bottom: Text Content */}
                      <div className="space-y-3">
                        {/* Name */}
                        <h3
                          className="text-3xl font-bold text-white transition-all duration-500 group-hover:-translate-y-2"
                          style={{
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            letterSpacing: '-0.5px',
                          }}
                        >
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p
                          className="text-white/90 font-semibold text-sm transition-all duration-500"
                          style={{
                            transform: 'translateY(0)',
                            opacity: 1,
                          }}
                        >
                          {category.description}
                        </p>

                        {/* Stats */}
                        <div className="flex gap-4 text-xs font-semibold text-white/80 pt-2">
                          <span>⭐ {category.rating}</span>
                          <span>📦 {category.styles}</span>
                        </div>

                        {/* Explore Button */}
                        <div
                          className="pt-4 transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
                        >
                          <button
                            className="w-full py-2 px-4 font-semibold text-sm rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                            style={{
                              backgroundColor: category.accent,
                              color: '#fff',
                              border: `1px solid ${category.accent}`,
                            }}
                          >
                            Explore →
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Hover Border Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none group-hover:opacity-100 opacity-0"
                      style={{
                        border: `2px solid ${category.accent}`,
                        boxShadow: `inset 0 0 20px ${category.accent}33, 0 0 30px ${category.accent}33`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute -left-6 lg:-left-16 top-1/2 -translate-y-1/2 z-20 group transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
            style={{
              background: 'rgba(139, 30, 30, 0.8)',
              backdropFilter: 'blur(10px)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '2px solid #8b1e1e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#8b1e1e';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(139, 30, 30, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 30, 30, 0.8)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ←
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-6 lg:-right-16 top-1/2 -translate-y-1/2 z-20 group transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
            style={{
              background: 'rgba(139, 30, 30, 0.8)',
              backdropFilter: 'blur(10px)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '2px solid #8b1e1e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#8b1e1e';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(139, 30, 30, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 30, 30, 0.8)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            →
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: currentIndex === index ? '32px' : '10px',
                height: '10px',
                backgroundColor: currentIndex === index ? '#8b1e1e' : '#d4af37',
                opacity: currentIndex === index ? 1 : 0.5,
                cursor: 'pointer',
                border: 'none',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Carousel Info */}
        <div className="text-center mt-8">
          <p style={{ color: '#8b1e1e', fontSize: '14px', fontWeight: '600', letterSpacing: '1px' }}>
            {currentIndex + 1} / {totalSlides} • SWIPE OR USE ARROWS TO BROWSE
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🎁', title: 'Exclusive Offers', desc: 'Up to 40% off on curated selections' },
            { icon: '📦', title: 'Free Shipping', desc: 'On all orders above ₹500' },
            { icon: '💎', title: 'Premium Quality', desc: '100% authentic handcrafted sarees' },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #d4af37',
              }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="font-bold text-lg mb-2" style={{ color: '#3d1f1f' }}>
                {item.title}
              </h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideCarousel {
          from {
            opacity: 0;
            transform: translateX(${direction === 'next' ? 100 : -100}px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 768px) {
          button[aria-label="Previous slide"],
          button[aria-label="Next slide"] {
            width: 40px !important;
            height: 40px !important;
            font-size: 18px !important;
            left: -20px !important;
            right: -20px !important;
          }
        }
      `}</style>
    </section>
  );
};
