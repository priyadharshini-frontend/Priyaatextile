import Link from "next/link";
import {
  RefreshCcw,
  ShieldCheck,
  BadgeCheck,
  Package,
  Ban,
  PhoneCall,
  ArrowRightLeft,
} from "lucide-react";

const policies = [
  // {
  //   icon: ShieldCheck,
  //   title: "Return Eligibility",
  //   description:
  //     "Products can be returned only if they are damaged, defective, or incorrect. Return requests must be made within 7 days of delivery.",
  // },
  // {
  //   icon: Ban,
  //   title: "Non-Returnable Items",
  //   description:
  //     "Used, washed, altered, customized products or items without original tags and packaging are not eligible for return.",
  // },
  // {
  //   icon: RefreshCcw,
  //   title: "Refund Process",
  //   description:
  //     "After inspection of the returned product, refunds will be initiated to the original payment method within 5–7 business days.",
  // },
  // {
  //   icon: ArrowRightLeft,
  //   title: "Exchange Policy",
  //   description:
  //     "Eligible products can be exchanged based on stock availability. If unavailable, a refund will be issued.",
  // },
  // {
  //   icon: Package,
  //   title: "Return Shipping",
  //   description:
  //     "For damaged or incorrect products, Priyaa Textile will assist with return shipping or arrange pickup wherever applicable.",
  // },
  {
    icon: BadgeCheck,
    title: "Order Cancellation",
    description:
      "Orders may be cancelled before dispatch. Once shipped, cancellations are not possible and the return policy will apply.",
  },
];

export default function ReturnRefundPolicyPage() {
  return (
    <main className="bg-[#F8F5F0]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-r from-[#3d1f1f] via-[#5b2c2c] to-[#8B1E1E]">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-white blur-3xl"/>

          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-white blur-3xl"/>

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">

          <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur px-5 py-2 text-white">

            🔄 Return & Refund Information

          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold text-white">

            Return & Refund Policy

          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-gray-200">

            Shop confidently with Priyaa Textile. We are committed to
            providing a smooth, transparent, and hassle-free return
            and refund experience.

          </p>

        </div>

      </section>

      {/* QUICK INFO */}

      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">

          {/* <div className="bg-white rounded-3xl shadow-lg p-8">

            <RefreshCcw className="text-[#8B1E1E]" size={34}/>

            <h3 className="mt-5 font-bold text-xl">
              Easy Returns
            </h3>

            <p className="mt-2 text-gray-500">
              Within 7 Days
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <BadgeCheck className="text-[#8B1E1E]" size={34}/>

            <h3 className="mt-5 font-bold text-xl">
              Fast Refund
            </h3>

            <p className="mt-2 text-gray-500">
              5–7 Business Days
            </p>

          </div> */}
{/* 
          <div className="bg-white rounded-3xl shadow-lg p-8">

            <Package className="text-[#8B1E1E]" size={34}/>

            <h3 className="mt-5 font-bold text-xl">
              Secure Pickup
            </h3>

            <p className="mt-2 text-gray-500">
              Eligible Orders
            </p>

          </div> */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <ShieldCheck className="text-[#8B1E1E]" size={34}/>

            <h3 className="mt-5 font-bold text-xl">
              Customer Support
            </h3>

            <p className="mt-2 text-gray-500">
              We're Here To Help
            </p>

          </div>

        </div>

      </section>

      {/* POLICY CARDS */}

      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="space-y-8">

          {policies.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-8"
              >

                <div className="flex gap-6">

                  <div className="w-16 h-16 rounded-2xl bg-[#8B1E1E]/10 flex items-center justify-center">

                    <Icon
                      className="text-[#8B1E1E]"
                      size={30}
                    />

                  </div>

                  <div>

                    <p className="text-[#8B1E1E] font-semibold">

                      Policy {index + 1}

                    </p>

                    <h2 className="text-2xl font-bold mt-1">

                      {item.title}

                    </h2>

                    <p className="mt-4 text-gray-600 leading-8">

                      {item.description}

                    </p>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </section>

      {/* HELP SECTION */}

      <section className="bg-gradient-to-r from-[#3d1f1f] to-[#8B1E1E] py-20">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <PhoneCall
            size={60}
            className="mx-auto text-white"
          />

          <h2 className="mt-8 text-4xl font-bold text-white">

            Need Assistance?

          </h2>

          <p className="mt-6 text-lg text-gray-200 max-w-2xl mx-auto leading-8">

            If you have questions regarding returns, refunds,
            exchanges or cancellations, our customer support team
            is happy to assist you.

          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">

            <Link
              href="/contact"
              className="bg-white text-[#8B1E1E] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Contact Support
            </Link>

            <a
              href="tel:+919876543210"
              className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#8B1E1E] transition"
            >
              Call Us
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}