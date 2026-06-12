"use client"
const categories = [
  {
    id: 1,
    name: "Women",
    image: "https://placehold.co/150x150?text=Women",
  },
  {
    id: 2,
    name: "Men",
    image: "https://placehold.co/150x150?text=Men",
  },
  {
    id: 3,
    name: "Kids",
    image: "https://placehold.co/150x150?text=Kids",
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://placehold.co/150x150?text=Beauty",
  },
  {
    id: 5,
    name: "Footwear",
    image: "https://placehold.co/150x150?text=Shoes",
  },
  {
    id: 6,
    name: "Accessories",
    image: "https://placehold.co/150x150?text=Bags",
  },
];







export const Categories=()=>{
    return(
        <>

         <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <div className="mb-8">

             <div className="mb-8 text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-[#8b1e1e] border-opacity-30 bg-white bg-opacity-50 backdrop-blur-sm">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#8b1e1e' }}>
              ✨ categories
            </span>
          </div>
          </div>
          <h3 className="text-xl md:text-5xl font-black leading-tight text-center" style={{ color: '#3d1f1f' }}>
                Shop By  
                <span 
                  className="relative inline-block text-transparent bg-clip-text ms-3"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #8b1e1e 0%, #d4af37 100%)',
                  }}
                >
                Category
                </span>
              </h3>
          <p className="text-gray-500 mt-2 text-center">
            Explore our popular collections
          </p>
        </div>

        {/* Categories */}
        <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-6 md:overflow-visible pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex-shrink-0 group text-center flex flex-col items-center"
            >
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border transition duration-300 group-hover:shadow-xl group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="mt-3 font-medium text-gray-800 group-hover:text-black">
                {category.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
        </>
    )
}