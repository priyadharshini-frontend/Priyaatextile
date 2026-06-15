"use client";

import { Heart, ShoppingCart, Truck, ShieldCheck, RefreshCw } from "lucide-react";

export default function ProductDetailsPage() {
  const product = {
    id: 1,
    name: "Elegant Soft Silk Saree",
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    rating: 4.8,
    reviews: 126,
    images: [
      "https://images.unsplash.com/photo-1583391733981-849c2b45f1af?w=800",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
    ],
    description:
      "Premium quality soft silk saree with rich weaving and elegant border design. Perfect for weddings, festivals, and special occasions.",
    colors: ["Maroon", "Green", "Royal Blue"],
    sizes: ["Free Size"],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full rounded-2xl object-cover"
          />

          <div className="flex gap-3 mt-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="w-24 h-24 rounded-lg object-cover border cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
            {product.discount}% OFF
          </span>

          <h1 className="text-3xl font-bold mt-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mt-3">
            <span className="text-yellow-500">
              ⭐ {product.rating}
            </span>
            <span className="text-gray-500">
              ({product.reviews} Reviews)
            </span>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <span className="text-4xl font-bold text-maroon-700">
              ₹{product.price}
            </span>

            <span className="line-through text-gray-400">
              ₹{product.originalPrice}
            </span>
          </div>

          <p className="mt-5 text-gray-600 leading-7">
            {product.description}
          </p>

          {/* Colors */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Available Colors
            </h3>

            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className="border px-4 py-2 rounded-lg hover:border-black"
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Size
            </h3>

            <button className="border px-5 py-2 rounded-lg">
              Free Size
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-xl font-semibold">
              Buy Now
            </button>

            <button className="flex-1 bg-maroon-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button className="border p-4 rounded-xl">
              <Heart />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <Truck className="mx-auto mb-2" />
              <p className="text-sm">Free Delivery</p>
            </div>

            <div className="text-center">
              <RefreshCw className="mx-auto mb-2" />
              <p className="text-sm">Easy Returns</p>
            </div>

            <div className="text-center">
              <ShieldCheck className="mx-auto mb-2" />
              <p className="text-sm">Secure Payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Product Description
        </h2>

        <div className="bg-white border rounded-xl p-6">
          <ul className="space-y-3">
            <li>✔ Premium Soft Silk Fabric</li>
            <li>✔ Rich Zari Border Design</li>
            <li>✔ Lightweight & Comfortable</li>
            <li>✔ Suitable for Weddings & Festivals</li>
            <li>✔ High Quality Finish</li>
          </ul>
        </div>
      </div>
    </div>
  );
}