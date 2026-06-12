import { getCurrentUser } from "@/lib/curentUser";
import ProductPageClient from "@/components/product/ProductPageClient";
import Navbar from "@/components/common/navbar/Navbar";


export default async function Page() {
  const user=await getCurrentUser();
  return(
    <>
    <Navbar user={user}/>
    <ProductPageClient/>
    </>

  )

 
}
