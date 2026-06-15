type ProductGalleryProps = {
  images: string[];
};


export default function ProductGallery({ images }: ProductGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="relative h-[500px] overflow-hidden rounded-2xl">
        <img
          src={images?.[0]}
          className="w-full h-full object-cover"
          alt="product"
        />
      </div>
    </div>
  );
}