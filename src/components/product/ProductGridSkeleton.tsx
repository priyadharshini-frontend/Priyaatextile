import ProductCardSkeleton from "./ProductCardSkeleton";
export default function ProductGridSkeleton() {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}