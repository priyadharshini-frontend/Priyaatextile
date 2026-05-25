'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const mockWishlistItems = [
  {
    id: 1,
    name: 'Premium Kanjivaram Saree',
    price: 2499,
    originalPrice: 3332,
    image: '/images/sarees/kanjivaram.jpg',
    rating: 4.9,
    reviews: 284,
    inStock: true,
    addedDate: '2024-01-15',
    color: 'Red',
    discount: 25,
  },
  {
    id: 2,
    name: 'Banarasi Silk Saree',
    price: 3299,
    originalPrice: 4399,
    image: '/images/sarees/banarasi.jpg',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    addedDate: '2024-01-14',
    color: 'Gold',
    discount: 25,
  },
  {
    id: 3,
    name: 'Wedding Bridal Saree',
    price: 5999,
    originalPrice: 7999,
    image: '/images/sarees/wedding.jpg',
    rating: 5.0,
    reviews: 89,
    inStock: false,
    addedDate: '2024-01-10',
    color: 'Red',
    discount: 25,
  },
  {
    id: 4,
    name: 'Cotton Blend Everyday Saree',
    price: 1299,
    originalPrice: 1799,
    image: '/images/sarees/cotton.jpg',
    rating: 4.7,
    reviews: 312,
    inStock: true,
    addedDate: '2024-01-08',
    color: 'Green',
    discount: 28,
  },
  {
    id: 5,
    name: 'Georgette Casual Saree',
    price: 1799,
    originalPrice: 2399,
    image: '/images/sarees/georgette.jpg',
    rating: 4.6,
    reviews: 201,
    inStock: true,
    addedDate: '2024-01-05',
    color: 'Blue',
    discount: 25,
  },
];

export const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filterInStock, setFilterInStock] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedStats, setExpandedStats] = useState(false);

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const totalOriginalValue = wishlistItems.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);
  const totalSavings = totalOriginalValue - totalValue;
  const savingsPercent = Math.round((totalSavings / totalOriginalValue) * 100);
  const inStockCount = wishlistItems.filter((item) => item.inStock).length;

  const displayItems = wishlistItems
    .filter((item) => !filterInStock || item.inStock)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  const addSelectedToCart = () => {
    setSelectedItems([]);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectedValue = wishlistItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#faf8f3] py-8 lg:py-16">
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(139, 30, 30, 0.3);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(139, 30, 30, 0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-slide-down {
          animation: slideInDown 0.6s ease-out forwards;
        }

        .animate-fade-scale {
          animation: fadeInScale 0.5s ease-out forwards;
        }

        .stat-card-hover {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .stat-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(139, 30, 30, 0.15);
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 pt-20">
        {/* Premium Header */}
        <div className="mb-12 animate-slide-down">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start mb-8">
            <div>
              <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[#8b1e1e] border-opacity-30 bg-white bg-opacity-50 backdrop-blur-sm">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8b1e1e' }}>
                  ❤️ My Wishlist
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-light tracking-tight text-[#1a0f1a] mb-3">
                Saved <span className="font-bold" style={{ color: '#8b1e1e' }}>Favorites</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-xl">
                {wishlistItems.length} items saved • Explore your curated collection
              </p>
            </div>

            {/* Floating Stats Box */}
            <div
              className="p-6 rounded-2xl bg-white border border-[#eadfce] stat-card-hover sticky top-6"
              style={{
                boxShadow: '0 10px 40px rgba(139, 30, 30, 0.08)',
              }}
            >
              <p className="text-xs text-gray-500 font-semibold mb-2">💰 Total Savings</p>
              <p className="text-4xl font-black text-[#8b1e1e] mb-1">
                ₹{totalSavings.toLocaleString('en-IN')}
              </p>
              <p className="text-sm font-semibold text-[#22c55e]">
                Save {savingsPercent}% on this collection
              </p>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '📦', label: 'Total Items', value: wishlistItems.length, color: '#8b1e1e' },
              { icon: '✓', label: 'In Stock', value: inStockCount, color: '#22c55e' },
              { icon: '💎', label: 'Total Value', value: `₹${Math.round(totalValue / 1000)}K`, color: '#d4af37' },
              { icon: '🎁', label: 'Discount %', value: `${savingsPercent}%`, color: '#c41e3a' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl border border-[#eadfce] stat-card-hover"
                style={{
                  animation: `fadeInScale 0.5s ease-out ${idx * 0.1}s both`,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <p className="text-xs text-gray-600 font-semibold mb-1">{stat.label}</p>
                <p className="text-2xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Controls Bar */}
        <div className="mb-8 space-y-4 animate-fade-scale" style={{ animationDelay: '0.2s' }}>
          {/* Main Controls */}
          <div
            className="p-5 bg-white rounded-2xl border border-[#eadfce] backdrop-blur-sm"
            style={{
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
              {/* Select All */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedItems.length === displayItems.length && displayItems.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(displayItems.map((item) => item.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                  className="h-6 w-6 rounded transition-all duration-300 group-hover:scale-110"
                  style={{
                    accentColor: '#8b1e1e',
                    borderColor: '#8b1e1e',
                  }}
                />
                <span className="text-sm font-semibold text-[#1a0f1a] group-hover:text-[#8b1e1e] transition-colors">
                  Select All ({selectedItems.length}/{displayItems.length})
                </span>
              </label>

              {/* Center Controls */}
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-[#eadfce] text-sm font-semibold focus:outline-none focus:border-[#8b1e1e] transition-all bg-white cursor-pointer"
                >
                  <option value="newest">🕐 Newest First</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="rating">⭐ Top Rated</option>
                </select>

                <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#eadfce] hover:border-[#8b1e1e] hover:bg-[#ffe8e8] transition-all cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filterInStock}
                    onChange={(e) => setFilterInStock(e.target.checked)}
                    className="h-4 w-4 rounded"
                    style={{ accentColor: '#8b1e1e' }}
                  />
                  <span className="text-sm font-semibold text-[#1a0f1a] group-hover:text-[#8b1e1e] transition-colors">
                    In Stock
                  </span>
                </label>
              </div>

              {/* View Toggle */}
              <div className="hidden md:flex items-center gap-1 p-1.5 rounded-lg border border-[#eadfce]" style={{ backgroundColor: '#f9f6f2' }}>
                {[
                  { mode: 'grid', icon: '⊞' },
                  { mode: 'list', icon: '≡' },
                ].map((btn) => (
                  <button
                    key={btn.mode}
                    onClick={() => setViewMode(btn.mode)}
                    className={`px-3 py-2 rounded transition-all duration-300 text-lg font-semibold ${
                      viewMode === btn.mode
                        ? 'text-white'
                        : 'text-gray-600 hover:text-[#8b1e1e]'
                    }`}
                    style={{
                      backgroundColor: viewMode === btn.mode ? '#8b1e1e' : 'transparent',
                    }}
                  >
                    {btn.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selection Actions Bar */}
          {selectedItems.length > 0 && (
            <div
              className="p-5 rounded-2xl flex items-center justify-between gap-4 animate-fade-scale"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 30, 30, 0.08) 0%, rgba(212, 175, 55, 0.05) 100%)',
                border: '2px solid #8b1e1e',
                boxShadow: '0 10px 30px rgba(139, 30, 30, 0.1)',
              }}
            >
              <div>
                <p className="text-sm font-bold text-[#1a0f1a]">
                  🛍️ {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Total: <span className="font-bold text-[#8b1e1e]">₹{selectedValue.toLocaleString('en-IN')}</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addSelectedToCart}
                  className="px-6 py-2.5 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                  style={{
                    backgroundColor: '#8b1e1e',
                  }}
                >
                  ✓ Add to Cart ({selectedItems.length})
                </button>
                <button
                  onClick={() => setSelectedItems([])}
                  className="px-4 py-2.5 rounded-lg font-bold text-[#8b1e1e] border-2 border-[#8b1e1e] transition-all duration-300 hover:bg-[#ffe8e8]"
                >
                  ✕ Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Wishlist Grid/List */}
        <div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayItems.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    animation: `fadeInScale 0.5s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <WishlistCard
                    item={item}
                    isSelected={selectedItems.includes(item.id)}
                    onToggleSelect={() => toggleSelectItem(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {displayItems.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    animation: `fadeInScale 0.5s ease-out ${idx * 0.05}s both`,
                  }}
                >
                  <WishlistListItem
                    item={item}
                    isSelected={selectedItems.includes(item.id)}
                    onToggleSelect={() => toggleSelectItem(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Premium CTA Section */}
        <div className="mt-20 pt-16 border-t border-[#eadfce]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a0f1a] mb-3">What's Next?</h2>
            <p className="text-gray-600">Explore more or share your favorites</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/collections"
              className="group p-8 rounded-2xl border-2 border-[#eadfce] hover:border-[#8b1e1e] bg-white hover:bg-[#fff9f6] transition-all duration-300 text-center"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🛍️</div>
              <h3 className="text-lg font-bold text-[#1a0f1a] mb-2 group-hover:text-[#8b1e1e] transition-colors">
                Continue Shopping
              </h3>
              <p className="text-sm text-gray-600">Explore more collections</p>
            </Link>

            <button className="group p-8 rounded-2xl border-2 border-[#d4af37] bg-gradient-to-br from-[#fffbf0] to-white hover:from-[#fff9e6] transition-all duration-300 text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📤</div>
              <h3 className="text-lg font-bold text-[#1a0f1a] mb-2">Share Wishlist</h3>
              <p className="text-sm text-gray-600">Share with friends & family</p>
            </button>

            <button className="group p-8 rounded-2xl border-2 border-[#8b1e1e] bg-gradient-to-br from-[#8b1e1e] to-[#c41e3a] text-white hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">❤️</div>
              <h3 className="text-lg font-bold mb-2">Create New List</h3>
              <p className="text-sm opacity-90">Save for special occasions</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Wishlist Card
const WishlistCard = ({ item, isSelected, onToggleSelect, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative rounded-2xl overflow-hidden bg-white transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: isSelected ? '2px solid #8b1e1e' : '1px solid #eadfce',
        boxShadow: isHovered ? '0 20px 50px rgba(139, 30, 30, 0.15)' : '0 8px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Image Section */}
      <div className="relative h-80 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
          Product Image
        </div>

        {/* Overlay on Hover */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            backgroundColor: isHovered ? 'rgba(26, 15, 26, 0.15)' : 'transparent',
          }}
        ></div>

        {/* Checkbox with Animation */}
        <div className="absolute top-4 left-4 transition-all duration-300" style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="h-6 w-6 rounded-lg border-2 border-white accent-[#8b1e1e] shadow-lg cursor-pointer transition-all"
          />
        </div>

        {/* Stock & Discount Badges */}
        <div className="absolute top-4 right-4 space-y-2">
          {item.discount && (
            <div className="px-3 py-1 rounded-full bg-[#c41e3a] text-white text-xs font-bold shadow-lg">
              -{item.discount}%
            </div>
          )}
          <div
            className={`px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg ${
              item.inStock ? 'bg-[#22c55e]' : 'bg-[#ef4444]'
            }`}
          >
            {item.inStock ? '✓ In Stock' : '✕ Out'}
          </div>
        </div>

        {/* Quick Remove Button */}
        <button
          onClick={onRemove}
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white text-[#8b1e1e] flex items-center justify-center transition-all duration-300 hover:bg-[#8b1e1e] hover:text-white hover:scale-110 active:scale-95 shadow-lg opacity-0 group-hover:opacity-100"
        >
          ✕
        </button>

        {/* Favorite Badge */}
        <div className="absolute bottom-4 left-4 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          ❤️
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Name with Tooltip */}
        <div>
          <h3 className="font-bold text-[#1a0f1a] line-clamp-2 text-lg group-hover:text-[#8b1e1e] transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{item.color} Saree</p>
        </div>

        {/* Rating with Stars */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(item.rating) ? 'text-[#d4af37]' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-600">({item.reviews} reviews)</span>
        </div>

        {/* Price Section with Animation */}
        <div
          className="p-4 rounded-xl transition-all duration-300 group-hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 30, 30, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%)',
            border: '1px solid rgba(139, 30, 30, 0.1)',
          }}
        >
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-2xl font-black text-[#8b1e1e]">
              ₹{item.price.toLocaleString('en-IN')}
            </p>
            <p className="text-sm font-semibold text-gray-500 line-through">
              ₹{item.originalPrice?.toLocaleString('en-IN')}
            </p>
          </div>
          <p className="text-xs text-gray-600">
            🎁 You save ₹{(item.originalPrice - item.price).toLocaleString('en-IN')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            disabled={!item.inStock}
            onClick={onToggleSelect}
            className="w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            style={{
              backgroundColor: isSelected ? '#22c55e' : '#8b1e1e',
              color: '#fff',
            }}
          >
            {isSelected ? '✓ Selected' : !item.inStock ? 'Notify Me' : 'Select Item'}
          </button>

          <Link
            href={`/product/${item.id}`}
            className="w-full py-2.5 rounded-lg font-semibold text-center transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: '#f5f0e8',
              
            }}
          >
            <button
            className="w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            style={{
              border:'1px solid #8b1e1e',
              color: '#8b1e1e',
            }}
          >
            View Details
           </button>


          </Link>
        </div>
      </div>
    </div>
  );
};

// Enhanced Wishlist List Item
const WishlistListItem = ({ item, isSelected, onToggleSelect, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-6 bg-white rounded-2xl border border-[#eadfce] transition-all duration-300 hover:border-[#8b1e1e] flex gap-5 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered ? '0 15px 40px rgba(139, 30, 30, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.04)',
        backgroundColor: isSelected ? 'rgba(139, 30, 30, 0.02)' : '#fff',
      }}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0 flex items-center justify-center pt-1">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="h-6 w-6 rounded border-2 accent-[#8b1e1e] cursor-pointer transition-all"
          style={{
            borderColor: isSelected ? '#8b1e1e' : '#ccc',
          }}
        />
      </div>

      {/* Image */}
      <div className="w-40 h-40 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
          Image
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[#1a0f1a] group-hover:text-[#8b1e1e] transition-colors mb-2">
            {item.name}
          </h3>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(item.rating) ? 'text-[#d4af37] text-sm' : 'text-gray-300 text-sm'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-600">({item.reviews} reviews)</span>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: item.inStock ? '#e8f5e9' : '#ffebee',
                color: item.inStock ? '#22c55e' : '#ef4444',
              }}
            >
              {item.inStock ? '✓ In Stock' : '✕ Out of Stock'}
            </span>
            {item.discount && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#ffebee]" style={{ color: '#c41e3a' }}>
                Save {item.discount}%
              </span>
            )}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <p className="text-xl font-bold text-[#8b1e1e]">
              ₹{item.price.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-gray-600 line-through">
              ₹{item.originalPrice?.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onRemove}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 border-2 border-gray-300 hover:border-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
            >
              Remove
            </button>

            <button
              disabled={!item.inStock}
              onClick={onToggleSelect}
              className="px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg"
              style={{
                backgroundColor: isSelected ? '#22c55e' : '#8b1e1e',
              }}
            >
              {isSelected ? '✓ Selected' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Empty Wishlist
const EmptyWishlist = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#faf8f3] py-20">
      <div className="mx-auto max-w-3xl px-4">
        {/* Animated Empty State */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>
            🤍
          </div>

          <h1 className="text-5xl lg:text-6xl font-light text-[#1a0f1a] mb-4">
            Your Wishlist is <span className="font-bold" style={{ color: '#8b1e1e' }}>Empty</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Start building your collection of favorite sarees. Add items while browsing and get notified about exclusive deals!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '🎯', title: 'Save Products', desc: 'Add items to wishlist while browsing' },
            { icon: '🔔', title: 'Get Notified', desc: 'Receive alerts on price drops & sales' },
            { icon: '📤', title: 'Share Lists', desc: 'Share wishlists with friends & family' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-2xl border border-[#eadfce] hover:border-[#8b1e1e] transition-all duration-300 text-center group hover:shadow-lg"
              style={{
                animation: `fadeInScale 0.6s ease-out ${idx * 0.15}s both`,
              }}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1a0f1a] mb-2 group-hover:text-[#8b1e1e] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/product"
            className="px-10 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg text-center"
            style={{ backgroundColor: '#8b1e1e' }}
          >
            🛍️ Start Shopping Now
          </Link>

          <Link
            href="/"
            className="px-10 py-4 rounded-xl font-bold text-center transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'transparent',
              color: '#8b1e1e',
              border: '2px solid #8b1e1e',
            }}
          >
            ← Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
