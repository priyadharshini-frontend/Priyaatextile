'use client';
import ProductCard from './ProductCard';
import { useProductStore } from '@/store/ProductStore';



export default function ProductGrid() {
  const products=useProductStore((s)=>s.products)
  // Empty State
  if (!products.length) {
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
      className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}