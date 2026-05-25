import Image from 'next/image';
// const gallery = [
//   'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500',
//   'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500',
//   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
//   'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500',
// ];

export default function InstaGallery() {
  return (
     <section className="bg-[#faf7f2] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-14 text-center">
          <h2 className="text-5xl font-bold text-[#2b0d0d]">
            Follow Our Journey
          </h2>

          <p className="mt-4 text-gray-500">
            @heritage_sarees
          </p>
        </div>

        {/* <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {gallery.map((image, index) => (
            <div
              key={index}
              className="group relative h-[350px] overflow-hidden rounded-[30px]"
            >
              <Image
                src={image}
                alt="Instagram"
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/30"></div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  
  )
}
