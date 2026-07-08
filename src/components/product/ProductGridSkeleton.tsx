import ProductCardSkeleton from "./ProductCardSkeleton";
export default function ProductGridSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}