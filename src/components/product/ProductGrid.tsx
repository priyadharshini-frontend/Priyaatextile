'use client';

import ProductCard from './ProductCard';

type Product = {
  id: string;
  name: string;
  price: number;
  discount?: number;
  images: string[];
  subCategory?: string;
  isFeatured?: boolean;
};

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}
export default function ProductGrid({
  products,
  viewMode,
}: ProductGridProps) {
  // Empty State
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[#eadfce] bg-white py-20 text-center">
        <h3 className="text-2xl font-semibold text-[#3d1f1f]">
          No Products Found
        </h3>
      </div>
    );
  }
  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid gap-6 sm:grid-cols-3 xl:grid-cols-4'
          : 'flex flex-col gap-6'
      }
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}

        />
      ))}
    </div>
  );
}