"use client";

import { useState } from "react";
import { CartItem } from "@/types/cart";
import { ImageOff, Minus, Plus, X, Check } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  isExpanded,
  onToggleExpand,
}: CartItemCardProps) {
  const [imageError, setImageError] = useState(false);
  const [confirmingRemove, setConfirmingRemove] = useState(false);

  const itemTotal = item.price * item.quantity;
  const hasDiscount = (item.originalPrice ?? item.price) > item.price;
  const originalTotal = (item.originalPrice ?? item.price) * item.quantity;
  const itemSaved = originalTotal - itemTotal;

  return (
    <div className="group p-6 bg-white rounded-2xl border border-[#eadfce] overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(139,30,30,0.1)] transition-all duration-300">
      <div className="flex gap-6">
        {/* Image */}
        <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400">
          {imageError || !item.image ? (
            <div className="flex flex-col items-center gap-1">
              <ImageOff size={22} />
              <span className="text-[10px]">No image</span>
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title + remove */}
          <div className="flex items-start justify-between mb-4 gap-3">
            <h3 className="text-lg font-bold text-[#1a0f1a] leading-snug">{item.name}</h3>

            {confirmingRemove ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={onRemove}
                  aria-label="Confirm remove item"
                  className="h-7 w-7 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => setConfirmingRemove(false)}
                  aria-label="Cancel remove"
                  className="h-7 w-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmingRemove(true)}
                aria-label={`Remove ${item.name} from cart`}
                className="text-gray-400 hover:text-red-500 shrink-0"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Price + quantity */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <div className="flex gap-2 items-baseline">
                <p className="text-2xl font-black text-[#8b1e1e]">₹{itemTotal.toLocaleString("en-IN")}</p>
                {hasDiscount && (
                  <p className="text-sm text-gray-400 line-through">₹{originalTotal.toLocaleString("en-IN")}</p>
                )}
              </div>
              {itemSaved > 0 && (
                <p className="text-xs text-green-600 font-semibold mt-0.5">
                  You saved ₹{itemSaved.toLocaleString("en-IN")}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 bg-[#f9f6f2] rounded-lg p-1">
              <button
                onClick={() => onQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
                className="w-8 h-8 bg-white rounded flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <Minus size={14} />
              </button>

              <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
                {item.quantity}
              </span>

              <button
                onClick={() => onQuantityChange(item.quantity + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-gray-50"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Expandable details — grid-rows animates to exact content height */}
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="pt-4 pb-1 border-t border-gray-200 space-y-1 text-sm text-gray-600">
                <p>✓ 100% Authentic</p>
                <p>✓ Free Returns</p>
                <p>✓ Secure Packaging</p>
              </div>
            </div>
          </div>

          <button
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            className="text-xs font-semibold text-[#8b1e1e] mt-3 flex items-center gap-1"
          >
            <span className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}>▶</span>
            {isExpanded ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </div>
    </div>
  );
}