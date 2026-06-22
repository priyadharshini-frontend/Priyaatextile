"use client";

import { useState } from "react";
import { addToCart } from "@/services/cart.service";

interface ProductActionsProps {
  productId: string;
}

export default function ProductActions({
  productId,
}: ProductActionsProps) {
  const [qty, setQty] = useState(1);

  const handleAddToCart = async () => {
      console.log("Product ID:", productId);

    try {
      await addToCart(productId);

      alert("Added To Cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleAddToCart}
        className="flex-1 border border-black py-3 rounded-xl relative overflow-hidden group/btn transition-colors duration-300"
      >
        <span className="absolute inset-0 bg-black translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300 ease-in-out" />

        <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
          ADD TO CART
        </span>
      </button>

      <button className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-neutral-800">
        BUY NOW
      </button>
    </div>
  );
}