import ProductHero from '@/components/product/ProductHero';
import Filter from '@/components/product/Filter';
import ProductGrid from '@/components/product/ProductGrid';
export default function Page() {
  return (
    <>
    <ProductHero/>

      <section className="bg-[#faf7f2] py-20">
        
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[300px_1fr] lg:px-8">
          
          {/* Sidebar */}
         <Filter/>
          {/* Products */}
          <ProductGrid />
        </div>
      </section>
    </>
  
  )
}
