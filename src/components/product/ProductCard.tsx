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

  const [qty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // ============================================================
  // PRICE
  // ============================================================

  const originalPrice = Number(product.price);
  const salePrice = Number(product.salesPrice);

  const discountPercent =
    originalPrice > 0
      ? Math.round(
          ((originalPrice - salePrice) / originalPrice) * 100
        )
      : 0;

  // ============================================================
  // STOCK
  // ============================================================

  const stock = Number(product.stock);
  const isOutOfStock = stock <= 0;

  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = async (
    e: React.MouseEvent,
    quantity: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent adding out-of-stock products
    if (isOutOfStock) {
      toast.error("This product is out of stock.");
      return;
    }

    // Prevent multiple clicks
    if (isAdding) return;

    setIsAdding(true);

    try {
      await addToCart(product.id, quantity);

      setJustAdded(true);

      toast.success("Product Added To Cart");

      // Change button back after 2 seconds
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Please login first")) {
          toast.error(
            "Please create an account or log in to add items to your cart."
          );

          setTimeout(() => {
            router.push("/login");
          }, 1500);

          return;
        }

        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsAdding(false);
    }
  };

  // ============================================================
  // WISHLIST
  // ============================================================

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsWishlisted((w) => !w);
  };

  // ============================================================
  // CARD CONTENT
  // ============================================================

  const cardContent = (
    <div
      className={`product-card group relative max-w-sm bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-sm transition-all duration-300 ${
        isOutOfStock
          ? "opacity-75 cursor-not-allowed"
          : "hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      }`}
    >
      {/* ======================================================
          IMAGE SECTION
      ====================================================== */}

      <div className="relative overflow-hidden aspect-[3/4] bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            !isOutOfStock ? "group-hover:scale-105" : ""
          }`}
        />

        {/* ====================================================
            DISCOUNT BADGE
        ==================================================== */}

        {discountPercent > 0 && (
          <span
            className="absolute top-3 left-3 z-20 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm"
            style={{
              backgroundColor: "#7A1F3D",
            }}
          >
            {discountPercent}% OFF
          </span>
        )}

        {/* ====================================================
            OUT OF STOCK BADGE
        ==================================================== */}

        {isOutOfStock && (
          <span
            className="absolute top-3 left-3 z-30 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wide text-white shadow-md"
            style={{
              backgroundColor: "#a70c07",
            }}
          >
            OUT OF STOCK
          </span>
        )}

        {/* ====================================================
            WISHLIST
        ==================================================== */}

        <button
          onClick={toggleWishlist}
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm transition-transform active:scale-90"
        >
          <Heart
            size={16}
            className={isWishlisted ? "heart-pop" : ""}
            fill={isWishlisted ? "#7A1F3D" : "none"}
            stroke={
              isWishlisted
                ? "#7A1F3D"
                : "#57534e"
            }
          />
        </button>

        {/* ====================================================
            DESKTOP BOTTOM BUTTON
        ==================================================== */}

        <div
          className="hidden md:flex absolute bottom-0 left-0 right-0 z-10
            translate-y-full group-hover:translate-y-0
            transition-transform duration-300 ease-out
            items-center gap-2 px-3 py-3
            bg-gradient-to-t from-[#3D1F1F]/90 via-[#3D1F1F]/70 to-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          {isOutOfStock ? (
            /* ================= OUT OF STOCK ================= */

            <button
              type="button"
              disabled
              className="flex-1 h-10 rounded-lg
                font-semibold text-sm
                flex items-center justify-center
                gap-2 text-white
                bg-stone-500
                cursor-not-allowed
                opacity-95"
            >
              Out of Stock
            </button>
          ) : (
            /* ================= ADD TO CART ================= */

            <button
              type="button"
              onClick={(e) =>
                handleAddToCart(e, qty)
              }
              disabled={isAdding}
              className="flex-1 h-10 rounded-lg
                font-semibold text-sm
                flex items-center justify-center
                gap-2 text-white
                transition-all duration-200
                disabled:opacity-80"
              style={{
                background: justAdded
                  ? "#2F7A4F"
                  : "linear-gradient(90deg, #7A1F3D, #A52A4A)",
              }}
            >
              {justAdded ? (
                <>
                  <Check size={16} />
                  Added
                </>
              ) : isAdding ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Add to cart
                </>
              )}
            </button>
          )}
        </div>

        {/* ====================================================
            MOBILE BUTTON
        ==================================================== */}

        {isOutOfStock ? (
          /* ================= MOBILE OUT OF STOCK ================= */

          <div
            className="md:hidden absolute bottom-3 left-3 right-3 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              disabled
              className="w-full h-10 rounded-lg
                flex items-center justify-center
                text-white text-sm font-semibold
                bg-stone-500
                cursor-not-allowed
                shadow-md"
            >
              Out of Stock
            </button>
          </div>
        ) : (
          /* ================= MOBILE ADD TO CART ================= */

          <button
            type="button"
            onClick={(e) =>
              handleAddToCart(e, 1)
            }
            disabled={isAdding}
            aria-label="Quick add to cart"
            className="md:hidden absolute bottom-3 right-3 z-20
              w-10 h-10 rounded-full
              shadow-md
              flex items-center justify-center
              text-white
              active:scale-90
              transition-transform"
            style={{
              background: justAdded
                ? "#2F7A4F"
                : "linear-gradient(135deg, #7A1F3D, #A52A4A)",
            }}
          >
            {justAdded ? (
              <Check size={16} />
            ) : isAdding ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <ShoppingBag size={16} />
            )}
          </button>
        )}
      </div>

      {/* ======================================================
          PRODUCT DETAILS
      ====================================================== */}

      <div className="sm:px-4 sm:py-3 p-2 text-center">
        {/* PRODUCT NAME */}

        <h3 className="font-serif text-base md:text-lg font-medium text-stone-800 truncate">
          {product.name}
        </h3>

        {/* PRICE */}

        <div className="flex justify-center items-baseline gap-3 mt-1">
          <p
            className="font-bold text-base md:text-lg"
            style={{
              color: "#7A1F3D",
            }}
          >
            Rs. {product.salesPrice}
          </p>

          {originalPrice > salePrice && (
            <span className="text-stone-400 line-through text-sm font-medium">
              Rs. {product.price}
            </span>
          )}
        </div>

        {/* PRODUCT CODE */}

        <p className="text-stone-500 mt-1 text-xs tracking-wide uppercase">
          PTC: {product.productCode}
        </p>

          
      </div>
    </div>
  );

  // ============================================================
  // IMPORTANT:
  //
  // STOCK > 0:
  // Card is wrapped with Link
  //
  // STOCK = 0:
  // Card is NOT wrapped with Link
  // ============================================================

  if (isOutOfStock) {
    return (
      <>
        {cardContent}

        <style>{`
          @keyframes heartPop {
            0% {
              transform: scale(1);
            }

            35% {
              transform: scale(1.35);
            }

            60% {
              transform: scale(0.92);
            }

            100% {
              transform: scale(1);
            }
          }

          .heart-pop {
            animation: heartPop 0.4s ease-out;
          }

          @media (prefers-reduced-motion: reduce) {
            .heart-pop,
            .product-card,
            .product-card * {
              animation: none !important;
              transition: none !important;
            }
          }
        `}</style>
      </>
    );
  }

  // ============================================================
  // IN STOCK → CLICKABLE CARD
  // ============================================================

  return (
    <>
      <Link
        href={`/product/${product.id}`}
        className="block"
      >
        {cardContent}
      </Link>

      <style>{`
        @keyframes heartPop {
          0% {
            transform: scale(1);
          }

          35% {
            transform: scale(1.35);
          }

          60% {
            transform: scale(0.92);
          }

          100% {
            transform: scale(1);
          }
        }

        .heart-pop {
          animation: heartPop 0.4s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .heart-pop,
          .product-card,
          .product-card * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}