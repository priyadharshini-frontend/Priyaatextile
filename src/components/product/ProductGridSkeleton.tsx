import ProductCardSkeleton from "./ProductCardSkeleton";
interface ProductGridSkeletonProps {
  viewMode: "grid" | "list";
}

export default function ProductGridSkeleton({
  viewMode,
}: ProductGridSkeletonProps) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          : "flex flex-col gap-6"
      }
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}