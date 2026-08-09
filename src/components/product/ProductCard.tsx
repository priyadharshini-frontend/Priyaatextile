"use client";

import { Heart, ShoppingBag, Check, Loader2 } from "lucide-react";
import { Product } from "@/types/product";
import Link from "next/link";
import { useState } from "react";
import { addToCart } from "@/services/cart.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

 const originalPrice = Number(product.price);
const salePrice = Number(product.salesPrice);
const discountPercent =Math.round(((originalPrice - salePrice) / originalPrice) * 100)
  


  const handleAddToCart = async (e: React.MouseEvent, quantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding) return;
    setIsAdding(true);
      
    try {
      await addToCart(product.id, quantity);
      setJustAdded(true);
      setTimeout(() => {
      }, 550);
    } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("Please login first")) {
        toast.error("Please create an account or log in to add items to your cart.");

        setTimeout(() => {
          router.push("/login");
        }, 1500);

        return;
      }

      toast.error(error.message);
    } else {
      toast.error("Something went wrong.");
    }
  }

  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((w) => !w);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card group relative max-w-sm bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Image section */}
        <div className="relative overflow-hidden aspect-[3/4] bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

      
            <span
              className="absolute top-3 left-3 z-20 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm"
              style={{ backgroundColor: "#7A1F3D" }}
            >
              {discountPercent}% OFF
            </span>
    

          {/* Wishlist toggle */}
          <button
            onClick={toggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm transition-transform active:scale-90"
          >
            <Heart
              size={16}
              className={isWishlisted ? "heart-pop" : ""}
              fill={isWishlisted ? "#7A1F3D" : "none"}
              stroke={isWishlisted ? "#7A1F3D" : "#57534e"}
            />
          </button>

          {/* Desktop hover overlay — quantity + add to cart */}
          <div
            className="hidden md:flex absolute bottom-0 left-0 right-0 z-10
              translate-y-full group-hover:translate-y-0
              transition-transform duration-300 ease-out
              items-center gap-2 px-3 py-3
              bg-gradient-to-t from-[#3D1F1F]/90 via-[#3D1F1F]/70 to-transparent"
            onClick={(e) => e.preventDefault()}
          >
            {/* <div className="flex items-center rounded-lg overflow-hidden h-10 bg-white/95">
              <span className="px-3 text-sm font-medium text-stone-800 select-none min-w-[1.5rem] text-center">
                {qty}
              </span>
              <div className="flex flex-col border-l border-stone-200">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQty((q) => q + 1);
                  }}
                  className="px-2.5 py-[3px] text-stone-500 hover:bg-stone-100 text-xs leading-none"
                >
                  ▲
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQty((q) => Math.max(1, q - 1));
                  }}
                  className="px-2.5 py-[3px] text-stone-500 hover:bg-stone-100 text-xs leading-none border-t border-stone-200"
                >
                  ▼
                </button>
              </div>
            </div> */}

            <button
              onClick={(e) => handleAddToCart(e, qty)}

              disabled={isAdding}
              className="flex-1 h-10 rounded-lg font-semibold text-sm flex items-center justify-center gap-2
                text-white transition-all duration-200 disabled:opacity-80"
              style={{
                background: justAdded
                  ? "#2F7A4F"
                  : "linear-gradient(90deg, #7A1F3D, #A52A4A)",
              }}
            >
              {justAdded ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : isAdding ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <ShoppingBag size={16} /> Add to cart
                </>
              )}
            </button>
          </div>

          {/* Mobile quick-add — always visible, no hover dependency */}
          <button
            onClick={(e) => handleAddToCart(e, 1)}
            disabled={isAdding}
            aria-label="Quick add to cart"
            className="md:hidden absolute bottom-3 right-3 z-20 w-10 h-10 rounded-full shadow-md
              flex items-center justify-center text-white active:scale-90 transition-transform"
            style={{
              background: justAdded
                ? "#2F7A4F"
                : "linear-gradient(135deg, #7A1F3D, #A52A4A)",
            }}
          >
            {justAdded ? (
              <Check size={16} />
            ) : isAdding ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ShoppingBag size={16} />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="sm:px-4 sm:py-3 p-2 text-center">
          <h3 className="font-serif text-base md:text-lg font-medium text-stone-800 truncate">
            {product.name}
          </h3>

          <div className="flex justify-center items-baseline gap-3 mt-1">
            <p className="font-bold text-base md:text-lg" style={{ color: "#7A1F3D" }}>
              Rs. {product.salesPrice}
            </p>
          
              <span className="text-stone-400 line-through text-sm font-medium">
                Rs. {product.price}
              </span>
          
          </div>

          <p className="text-stone-500 mt-1 text-xs tracking-wide uppercase">
            PTC: {product.productCode}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes heartPop {
          0% { transform: scale(1); }
          35% { transform: scale(1.35); }
          60% { transform: scale(0.92); }
          100% { transform: scale(1); }
        }
        .heart-pop {
          animation: heartPop 0.4s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .heart-pop, .product-card, .product-card * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </Link>
  );
}
