import { ProductCard } from "./ProductCard"
const products = [
  {
    id: 1,
    name: 'Royal Kanjivaram Silk',
    price: '24,999',
    oldPrice: '29,999',
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700',
  },

  {
    id: 2,
    name: 'Banarasi Wedding Saree',
    price: '18,999',
    oldPrice: '22,999',
    image:
      'https://images.unsplash.com/photo-1583391733981-8496f0d7cbfd?w=700',
  },

  {
    id: 3,
    name: 'Pure Silk Designer Saree',
    price: '21,499',
    oldPrice: '25,999',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700',
  },

  {
    id: 4,
    name: 'Traditional Bridal Saree',
    price: '27,999',
    oldPrice: '32,999',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700',
  },
];
export default function ProductGrid() {
  return (


     <section className="bg-[#faf7f2] py-20">
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Heading */}
        <div className="mb-14 flex items-center justify-between">
          
          <div>
            <span className="text-sm uppercase tracking-[4px] text-[#8b1e1e]">
              Premium Collection
            </span>

            <h2 className="mt-4 text-5xl font-bold text-[#2b0d0d]">
              Trending Sarees
            </h2>
          </div>

          <button className="hidden rounded-xl border border-[#8b1e1e] px-6 py-3 text-sm font-semibold text-[#8b1e1e] transition hover:bg-[#8b1e1e] hover:text-white lg:block">
            View All
          </button>
        </div>

        {/* Grid */}
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
