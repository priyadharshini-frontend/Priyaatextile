import Image from 'next/image';
const categories = [
  {
    name: 'Kanjivaram',
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
  },
  {
    name: 'Banarasi',
    image:
      'https://images.unsplash.com/photo-1583391733981-8496f0d7cbfd?w=400',
  },
  {
    name: 'Silk Sarees',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
  },
  {
    name: 'Cotton Sarees',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400',
  },
  {
    name: 'Wedding',
    image:
      'https://images.unsplash.com/photo-1610030469668-8e6c1c498c5d?w=400',
  },
  {
    name: 'New Arrivals',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400',
  },
];

export const Category = () => {
  return (
   <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-[#3d1f1f]">
            Browse By Category
          </h2>

          <p className="mt-4 text-gray-500">
            Explore handcrafted sarees for every occasion
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group text-center"
            >
              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-[#d4af37] transition duration-500 group-hover:scale-110">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#3d1f1f]">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
