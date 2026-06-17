import ProductSizeSelector from "./ProductSizeSelector";
import ProductQuantity from "./ProductQuantity";
import ProductActions from "./Productactions";

type Props = {
  product: any;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        {product.name}
      </h1>

      <div className="flex items-center gap-3">

        <span className="text-3xl font-semibold">
          ₹{product.price}
        </span>

        {product.salesPrice && (
          <span className="line-through text-gray-400">
            ₹{product.salesPrice}
          </span>
        )}

      </div>

      <p className="text-gray-600">
        {product.description}
      </p>

      <div className="space-y-2">

        <p>
          <strong>Brand:</strong> {product.brand || "N/A"}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

      </div>

      <ProductSizeSelector sizes={product.size} />

      <ProductQuantity />

      <ProductActions />

    </div>
  );
}