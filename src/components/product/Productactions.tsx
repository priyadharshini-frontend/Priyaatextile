"use client";

import { useState } from "react";
import { addToCart } from "@/services/cart.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductActionsProps {
  productId: string;
}

export default function ProductActions({
  productId,
}: ProductActionsProps) {

  const router = useRouter();
  const [qty, setQty] = useState(1);

  const handleAddToCart = async () => {
      console.log("Product ID:", productId);

    try {
      await addToCart(productId);
      toast.success("Added to cart");
      router.push("/cart");
      
      
    } catch (error) {
      console.log(error);
    }
  };

const handleBuyNow = () => {
  console.log("BUY NOW CLICKED");
  console.log(productId);

  router.push(
    `/checkout?buyNow=true&productId=${productId}&qty=${qty}`
  );
};

  return (
    <div className="flex gap-4">
      <button
        onClick={handleAddToCart}
        className="flex-1 border border-[#8b1e1e] py-3 rounded-xl relative overflow-hidden group/btn transition-colors duration-300"
      >
        <span className="absolute inset-0 bg-[#8b1e1e] translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300 ease-in-out" />

        <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
          ADD TO CART
        </span>
      </button>

      <button className="flex-1 bg-[#8b1e1e] text-white py-3 rounded-xl hover:bg-neutral-800"   onClick={handleBuyNow} >
        BUY NOW
      </button>
    </div>
  );
}