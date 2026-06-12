import { ShoppingBag } from "lucide-react";
import { Heart } from "lucide-react";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    category: {
      id: string;
      name: string;
      slug: string;
      created: string;
    };
  };
};
export default function ProductCard({
  product,
}: ProductCardProps) {
 

  return (
    // <div className="group bg-white rounded-xl overflow-hidden border hover:shadow-xl transition duration-300">
    //   {/* Image */}
    //   <div className="relative overflow-hidden">
    //     <img
    //       src={product.image}
    //       alt={product.name}
    //       className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-300"
    //     />

    //     {/* Discount Badge */}
    //     {discount && (
    //       <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
    //         {discount}% OFF
    //       </span>
    //     )}

    //     {/* Wishlist */}
    //     <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-110 transition">
    //       ♡
    //     </button>
    //   </div>

    //   {/* Content */}
    //   <div className="p-4">
    //     {/* Category */}
    //     <p className="text-sm text-gray-500">
    //       {product.category}
    //     </p>

    //     {/* Name */}
    //     <h3 className="font-medium mt-1 line-clamp-2">
    //       {product.name}
    //     </h3>

    //     {/* Price */}
    //     <div className="flex items-center gap-2 mt-3">
    //       <span className="text-lg font-bold">
    //         ₹{product.price}
    //       </span>

    //       {product.originalPrice && (
    //         <span className="text-sm text-gray-400 line-through">
    //           ₹{product.originalPrice}
    //         </span>
    //       )}
    //     </div>

    //     {/* Add to Cart */}
    //     <button className="w-full mt-4 bg-red-800 text-white py-2 rounded-lg hover:bg-gray-800 transition">
    //       Add to Cart
    //     </button>
    //   </div>
    // </div>
     <div className="group bg-white  overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <img
          src={product.images}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badge */}
        {/* {discount ? (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md">
            {discount}% off
          </span>
        ) : product.isNew ? (
          <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md">
            New
          </span>
        ) : null} */}

        {/* Wishlist */}
        <button
         
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
          aria-label="Add to wishlist"
        >
          <Heart
            size={15}
            className="fill-red-500 stroke-red-500"
          />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pt-3.5 pb-4">
        {/* Category */}
        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium mb-1">
          {product.category.name}
        </p>

        {/* Name */}
        <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 mb-2.5">
          {product.name}
        </h3>

        {/* Rating */}
        {/* {product.rating && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < Math.floor(product.rating!)
                      ? "fill-amber-500 stroke-amber-500"
                      : "stroke-gray-300"
                  }
                />
              ))}
            </div> */}
            {/* {product.reviewCount && (
              <span className="text-xs text-gray-400">({product.reviewCount})</span>
            )}
          </div>
        )} */}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3.5">
          <span className="text-lg font-medium text-gray-900">₹{product.price}</span>
          {/* {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )} */}
          {/* {savings && (
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Save ₹{savings.toLocaleString()}
            </span>
          )} */}
        </div>

        {/* Add to Cart */}
        <button className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 active:scale-[0.98] text-white text-[13px] font-medium tracking-wide py-2.5 rounded-xl transition-all duration-200">
          <ShoppingBag size={15} />
          Add to cart
        </button>
      </div>
    </div>
  );
}