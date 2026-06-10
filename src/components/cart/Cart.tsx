'use client';

import Link from 'next/link';
import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
}

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  index: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_CART_ITEMS: CartItem[] = [
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

const VALID_PROMO = 'SAVE10';
const PROMO_DISCOUNT_RATE = 0.1;
const TAX_RATE = 0.12;
const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 99;

// ─── Cart Item Card ───────────────────────────────────────────────────────────

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onQuantityChange,
  onRemove,
  isExpanded,
  onToggleExpand,
}) => {
  const itemTotal = item.price * item.quantity;
  const itemSaved = (item.originalPrice - item.price) * item.quantity;

  return (
    <div className="group p-6 bg-white rounded-2xl border border-[#eadfce] overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(139,30,30,0.1)] transition-all duration-300">
      <div className="flex gap-6">
        {/* Product Image Placeholder */}
        <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400 text-sm">
          Product Image
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#1a0f1a] mb-1 leading-snug">
                {item.name}
              </h3>
              <div className="flex gap-2 flex-wrap text-xs">
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
              aria-label={`Remove ${item.name}`}
              className="text-gray-400 hover:text-red-500 transition-colors text-xl font-bold ml-2 shrink-0"
            >
              ✕
            </button>
          </div>

          {/* Price + Quantity Row */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <div className="flex gap-2 items-baseline">
                <p className="text-2xl font-black text-[#8b1e1e]">
                  ₹{itemTotal.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-400 line-through">
                  ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                </p>
              </div>
              <p className="text-xs text-green-500 font-semibold mt-1">
                Save ₹{itemSaved.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 bg-[#f9f6f2] rounded-lg p-1">
              <button
                onClick={() => onQuantityChange(item.quantity - 1)}
                aria-label="Decrease quantity"
                className="w-8 h-8 bg-white rounded text-[#8b1e1e] font-semibold hover:bg-[#8b1e1e] hover:text-white transition-all duration-200"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-[#1a0f1a] text-sm">
                {item.quantity}
              </span>
              <button
                onClick={() => onQuantityChange(item.quantity + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 bg-white rounded text-[#8b1e1e] font-semibold hover:bg-[#8b1e1e] hover:text-white transition-all duration-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Expandable Details */}
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: isExpanded ? '200px' : '0px', opacity: isExpanded ? 1 : 0 }}
          >
            <div className="pt-4 border-t border-gray-200 space-y-1.5 text-sm text-gray-600">
              <p>✓ 100% Authentic &amp; Original</p>
              <p>✓ Free Returns within 30 days</p>
              <p>✓ Secure Packaging Guaranteed</p>
            </div>
          </div>

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

// ─── Empty Cart ───────────────────────────────────────────────────────────────

const FEATURE_HIGHLIGHTS = [
  { icon: '💎', title: 'Premium Quality', desc: '100% authentic handcrafted' },
  { icon: '🚚', title: 'Free Shipping', desc: 'On orders above ₹5000' },
  { icon: '♡', title: 'Easy Returns', desc: '30-day return policy' },
] as const;

const EmptyCart: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#faf8f3] py-30">
    <div className="mx-auto max-w-2xl px-4 text-center">
      <div className="mb-8 animate-[fadeInUp_0.6s_ease-out]">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-5xl lg:text-6xl font-light text-[#1a0f1a] mb-4">
          Your Cart is{' '}
          <span className="font-bold text-[#8b1e1e]">Empty</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-12">
          Explore our beautiful collection of authentic sarees and add your
          favorites to the cart!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {FEATURE_HIGHLIGHTS.map(({ icon, title, desc }, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-2xl border border-[#eadfce] hover:border-[#8b1e1e] transition-all"
          >
            <p className="text-4xl mb-3">{icon}</p>
            <h3 className="font-bold text-[#1a0f1a] mb-2">{title}</h3>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/collections"
          className="px-10 py-4 rounded-xl font-bold text-white bg-[#8b1e1e] shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
        >
          🛍️ Start Shopping
        </Link>
        <Link
          href="/"
          className="px-10 py-4 rounded-xl font-bold border-2 border-[#8b1e1e] text-[#8b1e1e] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          ← Back Home
        </Link>
      </div>
    </div>
  </div>
);

// ─── Cart (Main) ──────────────────────────────────────────────────────────────

export const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS);
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  // Derived calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const discount = appliedPromo ? Math.round(subtotal * PROMO_DISCOUNT_RATE) : 0;
  const total = subtotal + tax + shipping - discount;
  const savedAmount = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, quantity: number): void => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeItem = (id: number): void => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = (): void => {
    if (promoCode.toUpperCase() === VALID_PROMO) {
      setAppliedPromo(VALID_PROMO);
      setPromoCode('');
    }
  };

  const handlePromoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') applyPromo();
  };

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f3] via-[#f5f2ed] to-[#faf8f3] py-8 lg:py-30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 lg:py-10">

        {/* ── Header ── */}
        <div className="mb-12 animate-[slideIn_0.5s_ease-out_forwards]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-block mb-4 px-4 py-2 rounded-full border border-[#8b1e1e]/30 bg-white/50 backdrop-blur-sm">
                <span className="text-xs font-bold tracking-widest uppercase text-[#8b1e1e]">
                  🛍️ Shopping Cart
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-light tracking-tight text-[#1a0f1a] mb-2">
                Your{' '}
                <span className="font-bold text-[#8b1e1e]">Cart</span>
              </h1>
              <p className="text-lg text-gray-600">
                {cartItems.length} items · ₹{subtotal.toLocaleString('en-IN')} subtotal
              </p>
            </div>

            {/* Savings Badge */}
            <div className="hidden md:block p-6 rounded-2xl text-center bg-green-500/10 border-2 border-green-500">
              <p className="text-xs text-gray-600 font-semibold mb-1">You're Saving</p>
              <p className="text-3xl font-bold text-green-500">
                ₹{savedAmount.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, idx) => (
              <CartItemCard
                key={item.id}
                item={item}
                index={idx}
                onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
                onRemove={() => removeItem(item.id)}
                isExpanded={expandedItem === item.id}
                onToggleExpand={() =>
                  setExpandedItem(expandedItem === item.id ? null : item.id)
                }
              />
            ))}

            {/* Continue Shopping */}
            <div className="mt-8 p-6 rounded-2xl border-2 border-dashed border-[#eadfce] hover:border-[#8b1e1e] transition-all text-center">
              <p className="text-gray-600 mb-4">Want to add more items?</p>
              <Link
                href="/product"
                className="inline-block px-8 py-3 rounded-lg font-bold text-white bg-[#8b1e1e] hover:scale-105 transition-all duration-300"
              >
                Continue Shopping →
              </Link>
            </div>
          </div>

          {/* ── Order Summary Sidebar ── */}
          <div className="animate-[fadeInUp_0.5s_ease-out_0.2s_both]">
            <div className="p-8 rounded-2xl sticky top-8 bg-gradient-to-br from-[#fff9f0] to-[#fffbf5] border-2 border-[#8b1e1e] shadow-[0_20px_50px_rgba(139,30,30,0.1)]">
              <h2 className="text-2xl font-bold text-[#1a0f1a] mb-6">Order Summary</h2>

              {/* Line Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-[#eadfce]">
                <SummaryRow label="Subtotal" value={`₹${subtotal.toLocaleString('en-IN')}`} />

                <SummaryRow label="Tax (12%)" value={`₹${tax.toLocaleString('en-IN')}`} />

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Shipping{' '}
                    {shipping === 0 && (
                      <span className="text-green-500 font-semibold">(Free)</span>
                    )}
                  </span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-500' : 'text-[#1a0f1a]'}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm bg-green-50 p-2 rounded-lg">
                    <span className="text-green-600 font-semibold">Promo Discount (−10%)</span>
                    <span className="font-bold text-green-600">
                      −₹{discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                {subtotal <= FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-[#d4af37] bg-yellow-50 p-2 rounded-lg font-semibold">
                    🎁 Free shipping on orders above ₹5,000
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline mb-6 pb-6 border-b border-[#eadfce]">
                <span className="text-gray-600 font-semibold">Total Amount</span>
                <div className="text-right">
                  <p className="text-3xl font-black text-[#8b1e1e]">
                    ₹{total.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
                </div>
              </div>

              {/* Promo Code */}
              {!appliedPromo ? (
                <div className="mb-6 space-y-2">
                  <label className="text-xs font-semibold text-gray-600 block">
                    Have a promo code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      onKeyDown={handlePromoKeyDown}
                      placeholder="Enter code (SAVE10)"
                      className="flex-1 px-3 py-2.5 border border-[#eadfce] rounded-lg text-sm focus:outline-none focus:border-[#8b1e1e] transition-colors"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2.5 rounded-lg font-semibold text-white bg-[#8b1e1e] hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-3 rounded-lg bg-green-50 border border-green-500 flex items-center justify-between">
                  <span className="text-sm font-semibold text-green-600">
                    ✓ {appliedPromo} Applied
                  </span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    aria-label="Remove promo code"
                    className="text-green-600 hover:text-red-500 transition-colors text-lg"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* CTAs */}
              <button className="w-full py-4 rounded-xl font-bold text-white bg-[#8b1e1e] shadow-lg mb-3 hover:scale-105 active:scale-95 transition-all duration-300">
                🔒 Proceed to Checkout
              </button>

              <button className="w-full py-3 rounded-xl font-bold border-2 border-[#d4af37] text-[#8b1e1e] hover:scale-105 active:scale-95 transition-all duration-300">
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

        {/* ── Offers Banner ── */}
        <div className="mt-12 p-6 rounded-2xl text-center bg-gradient-to-br from-[#d4af37]/10 to-[#8b1e1e]/5 border-2 border-[#d4af37]">
          <p className="text-sm font-semibold text-gray-700 mb-1">
            💳 Special Offer: Get 5% extra off with your credit card!
          </p>
          <p className="text-xs text-gray-600">Use code CARD5 at checkout</p>
        </div>
      </div>
    </div>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface SummaryRowProps {
  label: string;
  value: string;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold text-[#1a0f1a]">{value}</span>
  </div>
);

export default Cart;
