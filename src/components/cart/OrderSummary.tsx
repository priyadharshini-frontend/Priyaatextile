import Link from "next/link";
import SummaryRow from "./SummaryRow";


interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;

  promoCode: string;
  appliedPromo: string | null;

  setPromoCode: (value: string) => void;
  applyPromo: () => void;
  removePromo: () => void;
}

export default function OrderSummary({
  subtotal,
  shipping,
  discount,
  total,
  promoCode,
  appliedPromo,
  setPromoCode,
  applyPromo,
  removePromo,
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

        {/* <SummaryRow
          label="Tax"
          value={`₹${tax}`}
        /> */}

        <SummaryRow
          label="Shipping"
          value={`₹${shipping}`}
        />
      </div>

      {discount > 0 && (
        <SummaryRow
          label="Discount"
          value={`-₹${discount}`}
        />
      )}

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