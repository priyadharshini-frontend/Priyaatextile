import Navbar from "@/components/common/navbar/Navbar";
import CheckoutClient from "@/components/checkout/CheckoutClient";
import { getCurrentUser } from "@/lib/curentUser";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  return (
    <>
      <Navbar user={user} />
      <CheckoutClient />
    </>
  );
}