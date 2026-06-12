export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-100 bg-white">
      {/* Image */}
      <div className="h-72 w-full bg-gray-200" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 rounded bg-gray-200" />

        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />

        <div className="h-6 w-24 rounded bg-gray-200" />

        <div className="h-10 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}