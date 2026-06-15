import { ShoppingBag } from "lucide-react";
import { Heart } from "lucide-react";
import { Eye } from "lucide-react";
import { Product } from "@/types/product";
interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="max-w-md overflow-hidden bg-white border border-stone-200 shadow-lg rounded-3xl hover:shadow-2xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-20">
          {/* {product.isBestSeller && ( */}
          <span className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#7A1F3D] to-[#A52A4A]">
            ⭐ BEST SELLER
          </span>
        </div>

        <button className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
          <Heart className="w-5 h-5 text-red-500" />
        </button>

        <div className="relative  overflow-hidden">
          <img
            src="/images/saree.jpeg"
            alt="{product.name}"
            className="w-full h-full object-cover hover:scale-105 transition duration-500 cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className=" text-xl font-serif text-gray-900">{product.name}</h3>

        <div className="flex items-center gap-4 mt-3">
          <span className="text-2xl font-bold text-[#7A1F3D]">
            ₹{product.salesPrice}
          </span>

          <span className="line-through text-gray-400 text-l ">   ₹{product.price}</span>

          <span className="p-1 text-sm font-semibold text-red-600 bg-red-50 rounded-xl">
          
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          <button className="h-10 rounded-2xl font-semibold text-black bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] flex items-center justify-center gap-2 hover:scale-[1.02] transition">
            <Eye size={20} />
            View
          </button>

          <button className="h-10 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#7A1F3D] to-[#A52A4A] flex items-center justify-center gap-2 hover:scale-[1.02] transition">
            <ShoppingBag size={20} />
            Cart
          </button>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="grid grid-cols-4 gap-4 p-5 border-t bg-stone-50">

        <div className="text-center">
          <RotateCcw className="w-6 h-6 mx-auto text-[#7A1F3D]" />
          <p className="mt-2 text-xs">Easy Returns</p>
        </div>

        <div className="text-center">
          <Truck className="w-6 h-6 mx-auto text-[#7A1F3D]" />
          <p className="mt-2 text-xs">Free Delivery</p>
        </div>

        <div className="text-center">
          <Award className="w-6 h-6 mx-auto text-[#7A1F3D]" />
          <p className="mt-2 text-xs">Authentic</p>
        </div>

        <div className="text-center">
          <ShieldCheck className="w-6 h-6 mx-auto text-[#7A1F3D]" />
          <p className="mt-2 text-xs">Secure Pay</p>
        </div>

      </div> */}
    </div>
  );
}
