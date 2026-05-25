'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { ProductCard } from './ProductCard';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'Premium Kanjivaram Saree',
    price: 2499,
    image: '/images/sarees/kanjivaram.jpg',
    category: 'Kanjivaram',
    rating: 4.9,
    reviews: 284,
    color: 'Red',
    material: 'Silk',
  },
  {
    id: 2,
    name: 'Banarasi Silk Saree',
    price: 3299,
    image: '/images/sarees/banarasi.jpg',
    category: 'Banarasi',
    rating: 4.8,
    reviews: 156,
    color: 'Gold',
    material: 'Silk',
  },
  {
    id: 3,
    name: 'Cotton Blend Everyday Saree',
    price: 1299,
    image: '/images/sarees/cotton.jpg',
    category: 'Cotton Sarees',
    rating: 4.7,
    reviews: 312,
    color: 'Green',
    material: 'Cotton',
  },
  {
    id: 4,
    name: 'Wedding Bridal Saree',
    price: 5999,
    image: '/images/sarees/wedding.jpg',
    category: 'Wedding',
    rating: 5.0,
    reviews: 89,
    color: 'Red',
    material: 'Silk',
  },
  {
    id: 5,
    name: 'Georgette Casual Saree',
    price: 1799,
    image: '/images/sarees/georgette.jpg',
    category: 'Silk Sarees',
    rating: 4.6,
    reviews: 201,
    color: 'Blue',
    material: 'Georgette',
  },
  {
    id: 6,
    name: 'Designer Printed Saree',
    price: 2199,
    image: '/images/sarees/designer.jpg',
    category: 'Cotton Sarees',
    rating: 4.8,
    reviews: 178,
    color: 'Pink',
    material: 'Cotton',
  },
  {
    id: 7,
    name: 'Traditional Banarasi Gold',
    price: 4499,
    image: '/images/sarees/banarasi-gold.jpg',
    category: 'Banarasi',
    rating: 4.9,
    reviews: 145,
    color: 'Gold',
    material: 'Silk',
  },
  {
    id: 8,
    name: 'Silk Blend Festive Saree',
    price: 2899,
    image: '/images/sarees/silk-blend.jpg',
    category: 'Silk Sarees',
    rating: 4.7,
    reviews: 234,
    color: 'Purple',
    material: 'Silk',
  },
  // Add more products as needed
  ...Array.from({ length: 12 }, (_, i) => ({
    id: i + 9,
    name: `Premium Saree Collection ${i + 9}`,
    price: 1999 + i * 500,
    image: '/images/sarees/default.jpg',
    category: ['Kanjivaram', 'Banarasi', 'Silk Sarees', 'Cotton Sarees', 'Wedding'][i % 5],
    rating: 4.5 + (i % 5) * 0.1,
    reviews: 100 + i * 20,
    color: ['Red', 'Gold', 'Green', 'Blue', 'Pink', 'Purple', 'Orange', 'White'][i % 8],
    material: ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Jacquard'][i % 5],
  })),
];

export default function ProductGrid({
  sortBy = 'featured',
  viewMode = 'grid',
  filters = {
    categories: [],
    priceRange: [1000, 50000],
    colors: [],
    materials: [],
    rating: null,
  },
}) {
  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...mockProducts];

    // Apply filters
    if (filters.categories.length > 0) {
      products = products.filter((p) => filters.categories.includes(p.category));
    }

    if (filters.colors.length > 0) {
      products = products.filter((p) => filters.colors.includes(p.color));
    }

    if (filters.materials.length > 0) {
      products = products.filter((p) => filters.materials.includes(p.material));
    }

    if (filters.priceRange) {
      products = products.filter(
        (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }

    if (filters.rating) {
      products = products.filter((p) => p.rating >= filters.rating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        products.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Keep original order
        break;
    }

    return products;
  }, [sortBy, filters]);

  return (
    <div>
      {filteredAndSortedProducts.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              className={viewMode === 'list' ? 'flex gap-4 p-4 bg-white rounded-2xl border border-[#eadfce]' : ''}
            >
              {viewMode === 'list' && (
                <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Image
                  </div>
                </div>
              )}

              <div className={viewMode === 'list' ? 'flex-1' : ''}>
                <ProductCard product={product} />
              </div>

              {viewMode === 'list' && (
                <div className="flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${product.id}`}>
                    <p className="text-lg font-bold" style={{ color: '#8b1e1e' }}>
                      ₹{product.price}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="text-xs text-gray-600">({product.reviews})</span>
                    </div>
                    </Link>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#8b1e1e' }}
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-[#1a0f1a] mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
