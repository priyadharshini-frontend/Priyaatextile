
// import Wishlist from "@/components/wishlist/wishlist";
import Navbar from "@/components/common/navbar/Navbar";
import { getCurrentUser } from "@/lib/curentUser";
export default async function Page() {
  const user=await getCurrentUser()



  return (
   <>
   <Navbar user={user}/>
   
   {/* <Wishlist/> */}
   </>
   
  )
}