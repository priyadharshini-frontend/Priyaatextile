
import { Suspense } from "react";
import OrderSuccessClient from "@/components/order-success/OrderSuccessClient";
export default function OrderSuccessPage() {



  return (
     <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessClient />
    </Suspense>
   
   
  );
}