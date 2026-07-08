type Props = {
  product: any;
};

export default function ProductPrice({ product }: Props) {

  const discount = product.salesPrice
    ? Math.round(
        ((product.price - product.salesPrice) /
          product.price) *
          100
      )
    : 0;

  return (
    <div className="space-y-3">

      <div className="flex items-center gap-4">

        <span className="text-4xl font-bold text-red-700">
          ₹{product.salesPrice || product.price}
        </span>

        {product.salesPrice && (
          <span className="line-through text-xl text-gray-400">
            ₹{product.price}
          </span>
        )}

        {discount > 0 && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
            {discount}% OFF
          </span>
        )}

      </div>

      <p className="text-green-700 font-medium">
        ✔ Inclusive of all taxes
      </p>

    </div>
  );
}