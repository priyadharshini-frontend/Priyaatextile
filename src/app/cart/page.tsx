
// import Cart from "@/components/cart/Cart";
import { getCurrentUser } from "@/lib/curentUser";
import Navbar from "@/components/common/navbar/Navbar";

export default async function Page() {

  const user = await getCurrentUser();

  return (
   <>

    <Navbar user={user} />
   {/* <Cart/> */}
   </>
   
  )
}