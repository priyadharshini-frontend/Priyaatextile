import Link from "next/link";
import {
  MapPinned,
  PhoneCall,
  Clock3,
  Store,
  Navigation,
  Star,
} from "lucide-react";

const stores = [
  {
    name: "Priyaa Textile - Vellore",
    city: "Vellore",
    address:
      "No. XX, Main Road, Vellore, Tamil Nadu - 632001",
    phone: "+91 98765 43210",
    timing: " 9:30 AM - 8:30 PM",
    map: "https://maps.google.com",
    image: "/images/store/vellore.jpg",
  },
  {
    name: "Priyaa Textile - Gudiyattam",
    city: "Gudiyattam",
    address:
      "No. XX, Bazaar Street, Gudiyattam, Tamil Nadu - 632602",
    phone: "+91 98765 43210",
    timing: " 9:30 AM - 8:30 PM",
    map: "https://maps.google.com",
    image: "/images/store/gudiyattam.jpg",
  },
];

export default function StoreLocationPage() {
  return (
    <main className="bg-[#F8F5F0]">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-r from-[#3d1f1f] via-[#5B2C2C] to-[#8B1E1E]">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"/>

          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"/>

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28">

          <div className="text-center">

            <span className="inline-flex items-center bg-white/10 backdrop-blur px-6 py-2 rounded-full text-white">

              📍 Visit Our Showrooms

            </span>

            <h1 className="mt-8 text-6xl font-bold text-white">

              Experience Shopping
              <br />
              Like Never Before

            </h1>

            <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-gray-200">

              Step into Priyaa Textile and discover premium
              sarees, elegant dress materials, festive collections,
              and personalized shopping experiences.

            </p>

          </div>

        </div>

      </section>

      {/* ================= FLOATING INFO ================= */}

      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <Store
              size={40}
              className="mx-auto text-[#8B1E1E]"
            />

            <h3 className="mt-5 font-bold text-xl">

              2 Premium Stores

            </h3>

            <p className="text-gray-500 mt-2">

              Vellore & Gudiyattam

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <Clock3
              size={40}
              className="mx-auto text-[#8B1E1E]"
            />

            <h3 className="mt-5 font-bold text-xl">

              Open Daily

            </h3>

            <p className="text-gray-500 mt-2">

              9:30 AM - 8:30 PM

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <Navigation
              size={40}
              className="mx-auto text-[#8B1E1E]"
            />

            <h3 className="mt-5 font-bold text-xl">

              Easy Navigation

            </h3>

            <p className="text-gray-500 mt-2">

              Google Maps Available

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <Star
              size={40}
              className="mx-auto text-[#8B1E1E]"
            />

            <h3 className="mt-5 font-bold text-xl">

              Trusted Shopping

            </h3>

            <p className="text-gray-500 mt-2">

              Premium Customer Experience

            </p>

          </div>

        </div>

      </section>




      {/* ================= STORES ================= */}

<section className="max-w-7xl mx-auto px-6 py-24">

  <div className="text-center mb-16">

    <span className="text-[#8B1E1E] uppercase tracking-widest font-semibold">

      Our Showrooms

    </span>

    <h2 className="text-5xl font-bold mt-4 text-[#3d1f1f]">

      Visit Our Premium Stores

    </h2>

    <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">

      Discover elegant collections, personalized assistance,
      and a memorable shopping experience at every Priyaa Textile showroom.

    </p>

  </div>

  <div className="space-y-20">

    {stores.map((store, index) => (

      <div
        key={store.city}
        className={`grid lg:grid-cols-2 gap-14 items-center ${
          index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >

        {/* IMAGE */}

        <div className="group relative overflow-hidden rounded-[32px] shadow-2xl">

          <img
            src={store.image}
            alt={store.city}
            className="w-full h-[520px] object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>

          <div className="absolute bottom-8 left-8">

            <span className="bg-[#8B1E1E] text-white px-5 py-2 rounded-full text-sm">

              Premium Showroom

            </span>

            <h3 className="text-4xl font-bold text-white mt-5">

              {store.city}

            </h3>

          </div>

        </div>

        {/* CONTENT */}

        <div>

          <span className="text-[#8B1E1E] uppercase tracking-widest font-semibold">

            {store.city} Branch

          </span>

          <h2 className="text-5xl font-bold mt-4 text-[#3d1f1f]">

            {store.name}

          </h2>

          <p className="mt-6 text-gray-600 leading-8">

            Visit our showroom and explore premium collections,
            exclusive offers, and personalized shopping assistance
            from our experienced team.

          </p>

          {/* INFORMATION */}

          <div className="space-y-8 mt-10">

            <div className="flex gap-5">

              <div className="w-14 h-14 rounded-2xl bg-[#8B1E1E]/10 flex items-center justify-center">

                <MapPinned className="text-[#8B1E1E]" />

              </div>

              <div>

                <h4 className="font-semibold text-lg">

                  Store Address

                </h4>

                <p className="text-gray-600">

                  {store.address}

                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <div className="w-14 h-14 rounded-2xl bg-[#8B1E1E]/10 flex items-center justify-center">

                <PhoneCall className="text-[#8B1E1E]" />

              </div>

              <div>

                <h4 className="font-semibold text-lg">

                  Contact Number

                </h4>

                <p className="text-gray-600">

                  {store.phone}

                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <div className="w-14 h-14 rounded-2xl bg-[#8B1E1E]/10 flex items-center justify-center">

                <Clock3 className="text-[#8B1E1E]" />

              </div>

              <div>

                <h4 className="font-semibold text-lg">

                  Business Hours

                </h4>

                <p className="text-gray-600">

                  {store.timing}

                </p>

              </div>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-5 mt-12">

            <Link
              href={store.map}
              target="_blank"
              className="bg-[#8B1E1E] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6f1717] transition"
            >
              Get Directions
            </Link>

            <a
              href={`tel:${store.phone}`}
              className="border-2 border-[#8B1E1E] text-[#8B1E1E] px-8 py-4 rounded-xl font-semibold hover:bg-[#8B1E1E] hover:text-white transition"
            >
              Call Store
            </a>

          </div>

        </div>

      </div>

    ))}

  </div>

</section>
      </main>
  )}