import Link from "next/link";
import {
  Store,
  Users,
  Shirt,
  Award,
  ArrowRight,
  Gem,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  Eye,
} from "lucide-react";

export default function AboutPage() {
   const features = [
  {
    icon: Gem,
    title: "Premium Collection",
    description:
      "Exclusive sarees, dress materials and readymades carefully selected for quality and elegance.",
  },
  {
    icon: Sparkles,
    title: "Latest Trends",
    description:
      "Fresh arrivals inspired by traditional craftsmanship and modern fashion.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Every customer is treated like family with friendly service and expert guidance.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    description:
      "Reliable products and transparent pricing trusted by thousands of happy customers.",
  },
];

  return (
    <main className="bg-[#F8F5F0]">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-r from-[#3d1f1f] via-[#5B2C2C] to-[#8B1E1E]">

        {/* Background Glow */}

        <div className="absolute inset-0 opacity-10">

          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white blur-3xl"/>

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white blur-3xl"/>

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}

            <div>

              <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur px-5 py-2 text-white">

                ✨ Premium Textile Destination

              </span>

              <h1 className="mt-8 text-5xl md:text-6xl font-bold text-white leading-tight">

                Bringing
                <span className="text-[#FFD36B]">
                  {" "}Tradition{" "}
                </span>

                &
                <span className="text-[#FFD36B]">
                  {" "}Elegance
                </span>

                <br />

                Together

              </h1>

              <p className="mt-8 text-lg text-gray-200 leading-8 max-w-xl">

                Priyaa Textile is your trusted destination for premium
                sarees, dress materials, readymades and festive collections.
                We combine timeless tradition with modern fashion to make
                every celebration unforgettable.

              </p>

              <div className="flex flex-wrap gap-5 mt-10">

                <Link
                  href="/product"
                  className="inline-flex items-center gap-3 bg-white text-[#8B1E1E] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
                >
                  Shop Collection

                  <ArrowRight size={20}/>

                </Link>

                <Link
                  href="/contact"
                  className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#8B1E1E] transition"
                >
                  Contact Us
                </Link>

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <img
                src="/images/about/store.jpg"
                alt="Priyaa Textile"
                className="rounded-[32px] shadow-2xl h-[520px] object-cover w-full"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <Users
              size={42}
              className="mx-auto text-[#8B1E1E]"
            />

            <h2 className="mt-5 text-4xl font-bold">

              25K+

            </h2>

            <p className="text-gray-600 mt-2">

              Happy Customers

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <Shirt
              size={42}
              className="mx-auto text-[#8B1E1E]"
            />

            <h2 className="mt-5 text-4xl font-bold">

              1000+

            </h2>

            <p className="text-gray-600 mt-2">

              Premium Collections

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <Store
              size={42}
              className="mx-auto text-[#8B1E1E]"
            />

            <h2 className="mt-5 text-4xl font-bold">

              2

            </h2>

            <p className="text-gray-600 mt-2">

              Physical Stores

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <Award
              size={42}
              className="mx-auto text-[#8B1E1E]"
            />

            <h2 className="mt-5 text-4xl font-bold">

              5★

            </h2>

            <p className="text-gray-600 mt-2">

              Customer Rating

            </p>

          </div>

        </div>

      </section>

      {/* ================= STORY ================= */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <img
              src="/images/about/store.jpg"
              className="rounded-[32px] shadow-xl h-[550px] w-full object-cover"
              alt=""
            />

          </div>

          <div>

            <span className="text-[#8B1E1E] uppercase font-semibold tracking-wider">

              OUR STORY

            </span>

            <h2 className="mt-4 text-5xl font-bold text-[#3d1f1f] leading-tight">

              Fashion Inspired By
              <br />

              Tradition

            </h2>

            <p className="mt-8 text-gray-600 leading-9">

              Priyaa Textile was founded with one simple vision —
              to make premium fashion accessible to every family.

              <br /><br />

              We carefully curate every collection to ensure exceptional
              quality, elegant craftsmanship and timeless beauty.

              <br /><br />

              From luxurious silk sarees to everyday cotton wear,
              dress materials and festive collections, our goal is
              to make every customer feel confident and beautiful.

            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div className="border-l-4 border-[#8B1E1E] pl-5">

                <h3 className="font-bold text-2xl">

                  Premium Quality

                </h3>

                <p className="text-gray-600 mt-2">

                  Carefully selected fabrics.

                </p>

              </div>

              <div className="border-l-4 border-[#8B1E1E] pl-5">

                <h3 className="font-bold text-2xl">

                  Trusted Service

                </h3>

                <p className="text-gray-600 mt-2">

                  Thousands of happy customers.

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>
      {/* ================= WHY CHOOSE ================= */}

<section className="bg-white py-24">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center">

      <span className="text-[#8B1E1E] uppercase tracking-wider font-semibold">

        Why Choose Us

      </span>

      <h2 className="mt-3 text-5xl font-bold text-[#3d1f1f]">

        Experience The Difference

      </h2>

      <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-8">

        Every collection is designed to provide elegance,
        quality and unforgettable shopping experiences.

      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

      {features.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="group bg-[#F8F5F0] rounded-[30px] p-8 hover:bg-[#8B1E1E] transition duration-500"
          >

            <div className="w-16 h-16 rounded-2xl bg-[#8B1E1E]/10 group-hover:bg-white/20 flex items-center justify-center">

              <Icon
                size={30}
                className="text-[#8B1E1E] group-hover:text-white"
              />

            </div>

            <h3 className="mt-8 text-2xl font-bold text-[#3d1f1f] group-hover:text-white">

              {item.title}

            </h3>

            <p className="mt-5 leading-8 text-gray-600 group-hover:text-white/80">

              {item.description}

            </p>

          </div>

        );

      })}

    </div>

  </div>

</section>
{/* ================= MISSION ================= */}

<section className="max-w-7xl mx-auto px-6 py-24">

<div className="grid lg:grid-cols-2 gap-10">

<div className="rounded-[32px] bg-gradient-to-br from-[#8B1E1E] to-[#3d1f1f] p-10 text-white shadow-xl">

<Target
size={50}
/>

<h2 className="mt-8 text-4xl font-bold">

Our Mission

</h2>

<p className="mt-6 leading-9 text-white/80">

To provide premium textile collections with exceptional
quality, affordable prices and outstanding customer
service while preserving the beauty of Indian tradition.

</p>

</div>

<div className="rounded-[32px] bg-white shadow-xl p-10">

<Eye
size={50}
className="text-[#8B1E1E]"
/>

<h2 className="mt-8 text-4xl font-bold text-[#3d1f1f]">

Our Vision

</h2>

<p className="mt-6 leading-9 text-gray-600">

To become India's most trusted textile destination
by inspiring confidence through quality,
innovation and customer satisfaction.

</p>

</div>

</div>

</section>
{/* ================= CUSTOMER PROMISE ================= */}

<section className="max-w-7xl mx-auto px-6 py-24">

  <div className="bg-gradient-to-r from-[#3d1f1f] via-[#5B2C2C] to-[#8B1E1E] rounded-[40px] overflow-hidden">

    <div className="grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-20">

      {/* LEFT */}

      <div>

        <span className="inline-flex px-5 py-2 rounded-full bg-white/10 text-white backdrop-blur">

          ❤️ Our Promise

        </span>

        <h2 className="text-5xl font-bold text-white mt-8 leading-tight">

          Every Customer
          <br />
          Deserves The Best

        </h2>

        <p className="mt-8 text-white/80 leading-9">

          At Priyaa Textile, we believe shopping is more than buying clothes.
          It is about creating memories, celebrating traditions and helping
          every customer feel confident with premium quality products.

        </p>

      </div>

      {/* RIGHT */}

      <div className="grid sm:grid-cols-2 gap-6">

        {[
          "Premium Quality",
          "Affordable Pricing",
          "Secure Payments",
          "Fast Delivery",
          "Friendly Support",
          "Trusted Shopping",
        ].map((item) => (

          <div
            key={item}
            className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10"
          >

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">

                ✓

              </div>

              <h3 className="text-white font-semibold">

                {item}

              </h3>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>

</section>
{/* ================= CTA ================= */}

<section className="relative py-28 bg-[#F8F5F0] overflow-hidden">

  <div className="absolute -top-20 left-0 w-72 h-72 bg-[#8B1E1E]/10 rounded-full blur-3xl"/>

  <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-3xl"/>

  <div className="relative max-w-5xl mx-auto text-center px-6">

    <span className="uppercase tracking-widest text-[#8B1E1E] font-semibold">

      Visit Priyaa Textile

    </span>

    <h2 className="mt-6 text-5xl font-bold text-[#3d1f1f] leading-tight">

      Discover Your Perfect
      <br />
      Traditional Look

    </h2>

    <p className="mt-8 text-lg text-gray-600 leading-8 max-w-3xl mx-auto">

      Explore our latest premium collections of sarees,
      dress materials and festive wear designed for every
      special occasion.

    </p>

    <div className="flex flex-wrap justify-center gap-5 mt-12">

      <Link
        href="/product"
        className="bg-[#8B1E1E] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6b1717] transition-all duration-300 hover:scale-105"
      >
        Shop Collection
      </Link>

      <Link
        href="/location"
        className="border-2 border-[#8B1E1E] text-[#8B1E1E] px-8 py-4 rounded-xl font-semibold hover:bg-[#8B1E1E] hover:text-white transition-all duration-300"
      >
        Visit Our Store
      </Link>

      <Link
        href="/contact"
        className="bg-[#D4AF37] text-[#3d1f1f] px-8 py-4 rounded-xl font-semibold hover:bg-[#c39c24] transition-all duration-300"
      >
        Contact Us
      </Link>

    </div>

  </div>

</section>

      </main>
      )
    }
