"use client";
import { Heart } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import Link from "next/link";
import { useState } from "react";
import { addToCart } from "@/services/cart.service";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const handleAddToCart = async () => {
  try {
    await addToCart(product.id);

    router.push("/cart");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group max-w-sm overflow-hidden bg-white   hover: transition-all duration-300">

        {/* Image Section */}
        <div className="relative overflow-hidden">

          {/* Wishlist */}
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
          >
            <Heart className="w-5 h-5 text-red-400 fill-red-400" />
          </button>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Hover Overlay — Add to Cart bar */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10
              translate-y-full group-hover:translate-y-0
              transition-transform duration-300 ease-in-out
              flex items-center gap-2 px-3 py-3 bg-transparent backdrop-blur-sm"
            onClick={(e) => e.preventDefault()}
          >
            {/* Quantity */}
            <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden h-10">
              <span className="px-3 text-sm font-medium text-white select-none">
                {qty}
              </span>
              <div className="flex flex-col border-l border-stone-300">
                <button
                  onClick={(e) => { e.preventDefault(); setQty((q) => q + 1); }}
                  className="px-2 py-[2px] text-gray-500 hover:bg-stone-100 text-xs leading-none"
                >
                  ▲
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); setQty((q) => Math.max(1, q - 1)); }}
                  className="px-2 py-[2px] text-gray-500 hover:bg-stone-100 text-xs leading-none border-t border-stone-300"
                >
                  ▼
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex-1 h-10 rounded-lg bg-gradient-to-r from-[#7A1F3D] to-[#A52A4A] hover:bg-[#43A047] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <ShoppingBag size={16} />
              Add to cart
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-3 text-center">
          <h3 className="text-base font-medium text-gray-800">{product.name}</h3>
          <p className="text-gray-500 line-through mt-1">
            Rs.{product.price}
          </p>
          <p className="text-[#E91E63] font-bold ">
            Rs.{product.salesPrice}
          </p>
        </div>

      </div>
    </Link>
  );
}