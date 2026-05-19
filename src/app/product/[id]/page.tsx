import ProductGallery from "@/components/product/ProductGallery"
import ProductInfo from "@/components/product/ProductInfo"

export default function page() {
  return (
    <section className="bg-[#faf7f2] py-20">
      
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <ProductGallery/>
        <ProductInfo/>
        
      
      </div>
    </section>
  )
}
