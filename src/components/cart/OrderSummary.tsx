import SummaryRow from "./SummaryRow";

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
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
  tax,
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

        <SummaryRow
          label="Tax"
          value={`₹${tax}`}
        />

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

      {!appliedPromo ? (
        <div className="mt-5 flex gap-2">
          <input
            value={promoCode}
            onChange={(e) =>
              setPromoCode(e.target.value)
            }
            className="border p-2 flex-1"
          />

          <button
            onClick={applyPromo}
            className="bg-black text-white px-4"
          >
            Apply
          </button>
        </div>
      ) : (
        <button
          onClick={removePromo}
          className="mt-5 text-red-500"
        >
          Remove Promo
        </button>
      )}

      <button className="w-full bg-[#8b1e1e] text-white py-4 rounded-xl mt-6">
        Proceed to Checkout
      </button>
    </div>
  );
}