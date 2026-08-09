import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { getCurrentUser } from "@/lib/curentUser";
import { getProductById } from "@/lib/product";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  
  const { id } = await params;
   const users = await getCurrentUser();

const product = await getProductById(id);

if (!product) {
  return (
    <div>
      <h1>Product Not Found</h1>
      <p>ID: {id}</p>
    </div>
  );
}
  return (
   <div className="container mx-auto px-4 py-10">
    <Navbar user={users}/>

      <div className="grid lg:grid-cols-2 gap-12 mt-23">

        <ProductGallery product={product} />

        <ProductInfo product={product} />

      </div>

      <RelatedProducts  productId={product.id}
    categoryId={product.categoryId}
    subCategoryId={product.subCategoryId ?? undefined} />

    </div>
  );
}