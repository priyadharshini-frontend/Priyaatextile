'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const mockCartItems = [
  {
    id: 1,
    name: 'Premium Kanjivaram Saree',
    price: 2499,
    originalPrice: 3332,
    quantity: 1,
    image: '/images/sarees/kanjivaram.jpg',
    color: 'Red',
    size: 'Free Size',
  },
  {
    id: 2,
    name: 'Banarasi Silk Saree',
    price: 3299,
    originalPrice: 4399,
    quantity: 2,
    image: '/images/sarees/banarasi.jpg',
    color: 'Gold',
    size: 'Free Size',
  },
  {
    id: 3,
    name: 'Cotton Blend Everyday Saree',
    price: 1299,
    originalPrice: 1799,
    quantity: 1,
    image: '/images/sarees/cotton.jpg',
    color: 'Green',
    size: 'Free Size',
  },
];

export const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.12);
  const shipping = subtotal > 5000 ? 0 : 99;
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + tax + shipping - discount;

  // Savings
  const savedAmount = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo('SAVE10');
      setPromoCode('');
    }
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#faf8f3] py-8 lg:py-30">
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-border {
          0%, 100% {
            border-color: #d4af37;
          }
          50% {
            border-color: #8b1e1e;
          }
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .quantity-control {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 8px;
          background: #f9f6f2;
          padding: 0.25rem;
        }

        .quantity-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: #fff;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          color: #8b1e1e;
          transition: all 0.3s ease;
        }

        .quantity-btn:hover {
          background: #8b1e1e;
          color: #fff;
        }

        .cart-item-hover {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cart-item-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 40px rgba(139, 30, 30, 0.1);
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-12 animate-slide-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[#8b1e1e] border-opacity-30 bg-white bg-opacity-50 backdrop-blur-sm">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#8b1e1e' }}>
                  🛍️ Shopping Cart
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-light tracking-tight text-[#1a0f1a] mb-2">
                Your <span className="font-bold" style={{ color: '#8b1e1e' }}>Cart</span>
              </h1>
              <p className="text-lg text-gray-600">
                {cartItems.length} items • ₹{subtotal.toLocaleString('en-IN')} subtotal
              </p>
            </div>

            {/* Savings Badge */}
            <div
              className="hidden md:block p-6 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                border: '2px solid #22c55e',
              }}
            >
              <p className="text-xs text-gray-600 font-semibold mb-1">You're Saving</p>
              <p className="text-3xl font-bold text-[#22c55e]">
                ₹{savedAmount.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items - 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item, idx) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
                  onRemove={() => removeItem(item.id)}
                  isExpanded={expandedItem === item.id}
                  onToggleExpand={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                  index={idx}
                />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8 p-6 rounded-2xl border-2 border-dashed border-[#eadfce] hover:border-[#8b1e1e] transition-all text-center">
              <p className="text-gray-600 mb-4">Want to add more items?</p>
              <Link
                href="/product"
                className="inline-block px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#8b1e1e' }}
              >
                Continue Shopping →
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div
              className="p-8 rounded-2xl sticky top-8"
              style={{
                background: 'linear-gradient(135deg, #fff9f0 0%, #fffbf5 100%)',
                border: '2px solid #8b1e1e',
                boxShadow: '0 20px 50px rgba(139, 30, 30, 0.1)',
              }}
            >
              <h2 className="text-2xl font-bold text-[#1a0f1a] mb-6">Order Summary</h2>

              {/* Summary Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-[#eadfce]">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-[#1a0f1a]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (12%)</span>
                  <span className="font-semibold text-[#1a0f1a]">₹{tax.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Shipping {shipping === 0 ? <span className="text-[#22c55e] font-semibold">(Free)</span> : null}
                  </span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-[#22c55e]' : 'text-[#1a0f1a]'}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm bg-[#e8f5e9] p-2 rounded-lg">
                    <span className="text-[#22c55e] font-semibold">Promo Discount (-10%)</span>
                    <span className="font-bold text-[#22c55e]">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {subtotal <= 5000 && (
                  <div className="text-xs text-[#d4af37] bg-[#fff9e6] p-2 rounded-lg font-semibold">
                    🎁 Free shipping on orders above ₹5000
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-6 pb-6 border-b border-[#eadfce]">
                <span className="text-gray-600 font-semibold">Total Amount</span>
                <div>
                  <p className="text-3xl font-black text-[#8b1e1e]">
                    ₹{total.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-500 text-right mt-1">Inclusive of all taxes</p>
                </div>
              </div>

              {/* Promo Code */}
              {!appliedPromo && (
                <div className="mb-6 space-y-2">
                  <label className="text-xs font-semibold text-gray-600 block">Have a promo code?</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter code (SAVE10)"
                      className="flex-1 px-3 py-2.5 border border-[#eadfce] rounded-lg text-sm focus:outline-none focus:border-[#8b1e1e] transition-colors"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2.5 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                      style={{ backgroundColor: '#8b1e1e' }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}

              {appliedPromo && (
                <div className="mb-6 p-3 rounded-lg bg-[#e8f5e9] border border-[#22c55e] flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#22c55e]">✓ {appliedPromo} Applied</span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-[#22c55e] hover:text-red-500 transition-colors text-lg"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* CTA Buttons */}
              <button
                className="w-full py-4 rounded-xl font-bold text-white mb-3 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  backgroundColor: '#8b1e1e',
                }}
              >
                🔒 Proceed to Checkout
              </button>

              <button
                className="w-full py-3 rounded-xl font-bold border-2 transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  borderColor: '#d4af37',
                  color: '#8b1e1e',
                  backgroundColor: 'transparent',
                }}
              >
                ♡ Save for Later
              </button>

              {/* Trust Badges */}
              <div className="mt-6 space-y-2 text-center text-xs text-gray-600 py-4 border-t border-[#eadfce]">
                <p>🔒 100% Secure Payment</p>
                <p>📦 Free Returns within 30 days</p>
                <p>✓ Authentic Products Guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Offers Banner */}
        <div
          className="mt-12 p-6 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(139, 30, 30, 0.05) 100%)',
            border: '2px solid #d4af37',
          }}
        >
          <p className="text-sm font-semibold text-gray-700 mb-2">
            💳 Special Offer: Get 5% extra off with your credit card!
          </p>
          <p className="text-xs text-gray-600">Use code CARD5 at checkout</p>
        </div>
      </div>
    </div>
  );
};

// Cart Item Card Component
const CartItemCard = ({ item, onQuantityChange, onRemove, isExpanded, onToggleExpand, index }) => {
  const itemTotal = item.price * item.quantity;
  const itemSaved = (item.originalPrice - item.price) * item.quantity;

  return (
    <div
      className="cart-item-hover p-6 bg-white rounded-2xl border border-[#eadfce] overflow-hidden"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 group">
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm group-hover:bg-opacity-75 transition-all">
            Product Image
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#1a0f1a] mb-1">{item.name}</h3>
              <div className="flex gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                  Color: {item.color}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                  {item.size}
                </span>
              </div>
            </div>

            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 transition-colors text-xl font-bold"
              title="Remove item"
            >
              ✕
            </button>
          </div>

          {/* Price Info */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex gap-2 items-baseline">
                <p className="text-2xl font-black text-[#8b1e1e]">
                  ₹{itemTotal.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                </p>
              </div>
              <p className="text-xs text-[#22c55e] font-semibold mt-1">
                Save ₹{itemSaved.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="quantity-control">
              <button
                className="quantity-btn"
                onClick={() => onQuantityChange(item.quantity - 1)}
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-[#1a0f1a]">
                {item.quantity}
              </span>
              <button
                className="quantity-btn"
                onClick={() => onQuantityChange(item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Expandable Details */}
          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: isExpanded ? '200px' : '0px',
              opacity: isExpanded ? 1 : 0,
            }}
          >
            <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
              <p>✓ 100% Authentic & Original</p>
              <p>✓ Free Returns within 30 days</p>
              <p>✓ Secure Packaging Guaranteed</p>
            </div>
          </div>

          {/* Expand Button */}
          <button
            onClick={onToggleExpand}
            className="text-xs font-semibold text-[#8b1e1e] hover:text-[#d4af37] transition-colors mt-3"
          >
            {isExpanded ? '▼ Hide Details' : '▶ Show Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty Cart Component
const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#faf8f3] py-30">
      <div className="mx-auto max-w-2xl px-4 text-center">
        {/* Animation */}
        <div className="mb-8">
          <div className="text-8xl mb-6" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
            🛒
          </div>

          <h1 className="text-5xl lg:text-6xl font-light text-[#1a0f1a] mb-4">
            Your Cart is <span className="font-bold" style={{ color: '#8b1e1e' }}>Empty</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-12">
            Explore our beautiful collection of authentic sarees and add your favorites to the cart!
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '💎', title: 'Premium Quality', desc: '100% authentic handcrafted' },
            { icon: '🚚', title: 'Free Shipping', desc: 'On orders above ₹5000' },
            { icon: '♡', title: 'Easy Returns', desc: '30-day return policy' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-[#eadfce] hover:border-[#8b1e1e] transition-all"
              style={{
                animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both`,
              }}
            >
              <p className="text-4xl mb-3">{feature.icon}</p>
              <h3 className="font-bold text-[#1a0f1a] mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/collections"
            className="px-10 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: '#8b1e1e' }}
          >
            🛍️ Start Shopping
          </Link>

          <Link
            href="/"
            className="px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95"
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

export default Cart;
