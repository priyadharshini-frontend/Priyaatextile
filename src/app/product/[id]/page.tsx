import Link from "next/link";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import Navbar from "@/components/common/navbar/Navbar";
import { getCurrentUser } from "@/lib/curentUser";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {

  const user =await getCurrentUser()

  console.log(params.id);

  return (
    <>
     <Navbar user={user} />
    
    <section className="bg-[#faf7f2] py-20">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <ProductGallery />
        <ProductInfo />
      </div>
    </section>
    </>
 
  );
}