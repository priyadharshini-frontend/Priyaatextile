import Image from 'next/image';
import Link from 'next/link';
export const ProductCard = ({product}) => {
  return (
   <div className="group overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-[320px] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
          ♡
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#3d1f1f]">
          {product.name}
        </h3>

        <p className="mt-2 text-xl font-bold text-[#8b1e1e]">
          ₹{product.price}
        </p>

        <Link
          href="/products/1"
          className="mt-5 inline-block w-full rounded-xl bg-[#8b1e1e] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#651313]"
        >
          View Product
        </Link>
      </div>
    </div>
  )
}
