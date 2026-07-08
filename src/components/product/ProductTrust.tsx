type Props = {
  product: any;
};

export default function ProductTrust({ product }: Props) {

  return (
    <div className="grid grid-cols-2 gap-4">

      <div className="border rounded-xl p-4 text-center">
        🚚
        <p className="font-semibold mt-2">
          Free Delivery
        </p>
      </div>

      <div className="border rounded-xl p-4 text-center">
        🔄
        <p className="font-semibold mt-2">
          Easy Returns
        </p>
      </div>

      <div className="border rounded-xl p-4 text-center">
        🛡
        <p className="font-semibold mt-2">
          Secure Payment
        </p>
      </div>

      <div className="border rounded-xl p-4 text-center">

        {product.stock > 0 ? "✅" : "❌"}

        <p className="font-semibold mt-2">

          {product.stock > 0
            ? "In Stock"
            : "Out Of Stock"}

        </p>

      </div>

    </div>
  );
}