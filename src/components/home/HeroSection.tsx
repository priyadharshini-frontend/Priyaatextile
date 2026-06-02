'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image:
      '/images/Banner/ban1.jpeg',
    title: 'Elegant Saree Collection',
    subtitle: 'Timeless Beauty For Every Occasion',
  },

  {
    id: 2,
    image:
      '/images/Banner/ban1.jpeg',
    title: 'Luxury Fashion Arrivals',
    subtitle: 'Premium Styles Crafted For You',
  },

  {
    id: 3,
    image:
      '/images/Banner/ban1.jpeg',
    title: 'Festive Collection 2026',
    subtitle: 'Celebrate In Style With ShopHub',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="pt-20">
      
    

      <div className="w-full">
 
        {/* Carousel */}
        <div className="relative h-[100vh] w-full overflow-hidden">
          
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in  h-full ${
                currentSlide === index
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-110'
              }`}
            >
              
              {/* Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-fill" sizes='100vw'
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-2xl px-10 lg:px-20">
                  
                  <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                    ✨ New Collection
                  </span>

                  <h3 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
                    {slide.title}
                  </h3>

                  <p className="mb-8 text-lg text-gray-200">
                    {slide.subtitle}
                  </p>

                  <button className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-105">
                    Shop Now
                  </button>

                </div>
              </div>
            </div>
          ))}

          {/* Indicators */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-10 bg-white'
                    : 'w-3 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}