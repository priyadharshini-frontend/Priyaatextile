import {
  Truck,
  Clock3,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

export default function ShippingPolicyPage() {
  const highlights = [
    {
      icon: Truck,
      title: "Fast Delivery",
      value: "2 - 7 Days",
    },
    {
      icon: Clock3,
      title: "Order Processing",
      value: "Within 24 Hours",
    },
    {
      icon: PackageCheck,
      title: "Secure Packaging",
      value: "Premium Packing",
    },
    {
      icon: ShieldCheck,
      title: "Safe Shipping",
      value: "Trusted Courier Partners",
    },
  ];

  return (
    <main className="bg-[#F8F5F0] min-h-screen">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-r from-[#3d1f1f] via-[#5B2C2C] to-[#8B1E1E]">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">

          <span className="inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur">

            🚚 Shipping Information

          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold text-white">

            Shipping Policy

          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-gray-200">

            At Priyaa Textile, we ensure every order is packed with care
            and delivered safely to your doorstep.

          </p>

        </div>

      </section>

      {/* QUICK HIGHLIGHTS */}

      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
              >

                <div className="w-14 h-14 rounded-2xl bg-[#8B1E1E]/10 flex items-center justify-center">

                  <Icon
                    className="text-[#8B1E1E]"
                    size={28}
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold text-[#3d1f1f]">

                  {item.title}

                </h3>

                <p className="mt-2 text-gray-600">

                  {item.value}

                </p>

              </div>
            );
          })}

        </div>

      </section>
    </main>
  );
}