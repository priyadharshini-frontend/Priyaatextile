import ProductPrice from "./Productprice";
import ProductQuantity from "./ProductQuantity";
import ProductActions from "./Productactions";

type Props = {
  product: any;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div className="space-y-8">

      <div>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          ⭐ Bestseller
        </span>

        <h1 className="text-4xl font-bold mt-3 text-[#3d1f1f]">
          {product.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {product.brand || "Priyaa Textile"}
        </p>
      </div>

      <ProductPrice product={product} />


      <div className="bg-[#faf7f2] rounded-2xl p-5 border">
        <ProductQuantity />
      </div>

      <ProductActions productId={product.id} />

      <div className="border rounded-2xl p-5 bg-white">
        <h3 className="font-semibold text-lg mb-3">
          Product Description
        </h3>

        <p className="text-gray-600 leading-7">
          {product.description}
        </p>
      </div>

    </div>
  );
}