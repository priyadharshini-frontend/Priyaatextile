import Link from "next/link";
import SummaryRow from "./SummaryRow";


interface OrderSummaryProps {
  subtotal: number;
  total: number;
}

export default function OrderSummary({
  subtotal,
  total,
}: OrderSummaryProps) {
  return (
    <div className="p-8 rounded-2xl sticky top-8 bg-white border">
      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        <SummaryRow
          label="Subtotal"
          value={`₹${subtotal}`}
        />
      </div>

      <div className="border-t mt-5 pt-5">
        <SummaryRow
          label="Total"
          value={`₹${total}`}
        />
      </div>

       <Link href="/checkout">
        <button className="w-full bg-[#8b1e1e] text-white py-4 rounded-xl mt-6"
      >
        Proceed to Checkout
      </button>
       </Link>
     
    </div>
  );
}