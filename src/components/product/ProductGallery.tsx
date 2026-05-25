import Image from 'next/image';

export default function ProductGallery() {
  return (
    <div className="grid gap-4 lg:grid-cols-[100px_1fr] mt-20">
      {/* Thumbnails */}
      <div className="flex gap-4 lg:flex-col">
        {[1, 2, 3, 4,5].map((item) => (
          <div
            key={item}
            className="relative h-24 w-24 overflow-hidden rounded-xl border"
          >
            {/* <Image
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop"
              alt="Thumbnail"
              fill
              className="object-cover"
            /> */}
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative h-[650px] overflow-hidden rounded-[30px]">
        {/* <Image
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop"
          alt="Product"
          fill
          className="object-cover"
        /> */}
      </div>
    </div>
  )
}
