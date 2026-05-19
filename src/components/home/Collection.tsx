import { ProductCard } from "../product/ProductCard"
const products = [
  {
    id: 1,
    name: 'Pure Kanjivaram Silk Saree',
    price: '24,999',
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
  },
  {
    id: 2,
    name: 'Banarasi Handloom Saree',
    price: '18,999',
    image:
      'https://images.unsplash.com/photo-1583391733981-8496f0d7cbfd?w=600',
  },
  {
    id: 3,
    name: 'Gold Tissue Silk Saree',
    price: '22,499',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600',
  },
  {
    id: 4,
    name: 'Traditional Wedding Saree',
    price: '26,999',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
  },
];


export const Collection = () => {
  return (
   <section className="bg-[#faf7f2] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-[#3d1f1f]">
              Our Exclusive Collection
            </h2>

            <p className="mt-3 text-gray-500">
              Handpicked luxury sarees crafted by artisans
            </p>
          </div>

          <button className="rounded-xl bg-[#8b1e1e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#651313]">
            View All
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
