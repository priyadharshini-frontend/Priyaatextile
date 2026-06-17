interface ProductPriceProps {
  price: number;
  salesPrice?: number | null;
}

export default function ProductPrice({ price, salesPrice }: ProductPriceProps) {
  const hasDiscount = !!salesPrice && salesPrice < price;
  const discountPercent = hasDiscount
    ? Math.round((1 - salesPrice! / price) * 100)
    : 0;

  return (
    <div className="flex items-baseline gap-3">
      <span className="text-2xl font-semibold text-[#8B1538]">
        ₹{(hasDiscount ? salesPrice! : price).toLocaleString("en-IN")}
      </span>

      {hasDiscount && (
        <>
          <span className="text-base text-gray-400 line-through">
            ₹{price.toLocaleString("en-IN")}
          </span>
          <span className="rounded-full bg-[#F4D88C] px-2.5 py-1 text-xs text-[#6B4E00]">
            {discountPercent}% off
          </span>
        </>
      )}
    </div>
  );
}