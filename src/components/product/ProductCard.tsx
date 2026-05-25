'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [addedToCart, setAddedToCart] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        perspective: '1000px',
      }}
    >
      {/* Card Container */}
      <div
        className="relative h-full rounded-3xl overflow-hidden transition-all duration-500"
        style={{
          backgroundColor: '#ffffff',
          border: isHovered ? '2px solid #8b1e1e' : '1px solid #eadfce',
          transformStyle: 'preserve-3d',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: isHovered 
            ? '0 25px 50px rgba(139, 30, 30, 0.15), inset 0 1px 0 rgba(255,255,255,0.6)'
            : '0 10px 30px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Image Section */}
        <div className="relative h-80 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
          {/* Background Image */}
          {/* <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
          /> */}
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            Product Image
          </div>

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: isHovered
                ? 'linear-gradient(180deg, rgba(139, 30, 30, 0.08) 0%, transparent 50%, rgba(139, 30, 30, 0.12) 100%)'
                : 'linear-gradient(180deg, rgba(139, 30, 30, 0) 0%, transparent 50%, rgba(139, 30, 30, 0) 100%)',
            }}
          ></div>

          {/* Top Badge Section */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
            {/* Premium Badge with animation */}
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold text-white transition-all duration-500 backdrop-blur-md flex items-center gap-1"
              style={{
                backgroundColor: '#8b1e1e',
                boxShadow: isHovered ? '0 6px 20px rgba(139, 30, 30, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                transform: isHovered ? 'scale(1.1) translateY(0)' : 'scale(1) translateY(0)',
              }}
            >
              ⭐ Premium
            </div>

            {/* Discount Badge */}
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-500 backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(255, 193, 7, 0.95)',
                color: '#8b5a00',
                boxShadow: isHovered ? '0 6px 20px rgba(255, 193, 7, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                transform: isHovered ? 'scale(1.1) translateY(0)' : 'scale(1) translateY(0)',
              }}
            >
              25% OFF
            </div>
          </div>

          {/* Wishlist Button - Floating */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-115 active:scale-95 backdrop-blur-md group/wishlist"
            style={{
              backgroundColor: isWishlisted ? '#8b1e1e' : 'rgba(255, 255, 255, 0.95)',
              color: isWishlisted ? '#ffffff' : '#8b1e1e',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: isWishlisted ? 'none' : '1px solid rgba(139, 30, 30, 0.2)',
              fontSize: '20px',
            }}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isWishlisted ? '♥' : '♡'}
          </button>

          {/* Quick View Overlay Button - Appears on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              backgroundColor: 'rgba(26, 15, 26, 0.4)',
              backdropFilter: 'blur(4px)',
              pointerEvents: isHovered ? 'auto' : 'none',
            }}
          >
            <Link
              href={`/product/${product.id || 1}`}
              className="px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: '#d4af37',
                color: '#1a0f1a',
                boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)',
              }}
            >
              Quick View
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3.5 flex flex-col h-[calc(100%-320px)]">
          {/* Product Name - More prominent */}
          <div>
            <h3 
              className="text-lg font-bold leading-tight mb-1 transition-colors duration-300"
              style={{ color: '#1a0f1a' }}
            >
              {product.name || 'Premium Handloom Saree'}
            </h3>
            <p className="text-xs" style={{ color: '#8b1e1e' }}>
              Authentic Handcrafted Collection
            </p>
          </div>

          {/* Rating & Stock - Better visibility */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 font-semibold">★★★★★</span>
              <span className="text-gray-600 text-xs font-medium">(284 reviews)</span>
            </div>
            <div 
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#e8f5e9' }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
              <span className="text-xs font-semibold" style={{ color: '#22c55e' }}>In Stock</span>
            </div>
          </div>

          {/* Price Section - Large & Bold */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3.5 space-y-1">
            <div className="flex items-baseline gap-3">
              <p className="text-2xl font-black" style={{ color: '#8b1e1e' }}>
                ₹{product.price || '2,499'}
              </p>
              <p className="text-sm font-semibold text-gray-500 line-through">
                ₹{Math.round((product.price || 2499) * 1.33)}
              </p>
            </div>
            <p className="text-xs text-gray-600">
              🎁 Save ₹{Math.round((product.price || 2499) * 0.33)} on this premium piece
            </p>
          </div>

          {/* Features - Show key benefits */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2" style={{ color: '#666' }}>
              <span>✓</span>
              <span>100% Authentic Handwoven</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#666' }}>
              <span>✓</span>
              <span>Premium Quality Fabric</span>
            </div>
          </div>

          {/* Spacer to push buttons to bottom */}
          <div className="flex-1"></div>

          {/* Primary Action - Large & Visible */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group/btn"
            style={{
              backgroundColor: addedToCart ? '#22c55e' : '#8b1e1e',
              boxShadow: addedToCart 
                ? '0 8px 20px rgba(34, 197, 94, 0.3)'
                : '0 8px 20px rgba(139, 30, 30, 0.3)',
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {addedToCart ? (
                <>
                  ✓ Added to Cart
                </>
              ) : (
                <>
                  🛍️ Add to Cart
                </>
              )}
            </span>
            {!addedToCart && (
              <div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }}
              ></div>
            )}
          </button>

          {/* Secondary Action */}
          <Link
            href={`/product/${product.id || 1}`}
            className="w-full py-2.5 rounded-xl font-semibold text-center transition-all duration-300 hover:scale-105 active:scale-95 text-sm"
            style={{
              backgroundColor: '#f5f0e8',
              color: '#8b1e1e',
              border: '1.5px solid #d4af37',
            }}
          >
            View Details →
          </Link>

          {/* Trust Indicators - Bottom */}
          <div className="text-center space-y-1 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-600 font-medium">
              ✓ Free Shipping | ✓ 30-Day Returns
            </p>
            <p className="text-xs" style={{ color: '#8b1e1e' }}>
              🔒 Secure Checkout
            </p>
          </div>
        </div>

        {/* Gold accent border on hover */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500"
          style={{
            border: '1.5px solid #d4af37',
            opacity: isHovered ? 0.6 : 0,
            boxShadow: isHovered ? '0 0 20px rgba(212, 175, 55, 0.25) inset' : 'none',
          }}
        ></div>
      </div>
    </div>
  );
};
