import Link from "next/link";
import {
  Search,
  Shirt,
  ShoppingCart,
  CreditCard,
  House,
  PackageCheck,
  CircleCheckBig,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Products",
    description:
      "Explore our exclusive collection of sarees, dress materials, readymades and festive wear.",
  },
  {
    icon: Shirt,
    title: "Choose Your Favourite",
    description:
      "Select the product, view complete details and choose the perfect option for you.",
  },
  {
    icon: ShoppingCart,
    title: "Add to Cart",
    description:
      "Add your selected products to the shopping cart and continue shopping if required.",
  },
  {
    icon: CreditCard,
    title: "Proceed to Checkout",
    description:
      "Review your cart, verify quantities and continue to secure checkout.",
  },
  {
    icon: House,
    title: "Delivery Address",
    description:
      "Enter your delivery address and contact details carefully.",
  },
  {
    icon: PackageCheck,
    title: "Complete Payment",
    description:
      "Pay securely using our trusted online payment gateway.",
  },
  {
    icon: CircleCheckBig,
    title: "Order Confirmed",
    description:
      "Your order is confirmed instantly. We'll carefully pack and dispatch it soon.",
  },
];

export default function HowToOrderPage() {
  return (
    <main className="bg-[#F8F5F0]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-r from-[#3d1f1f] via-[#5B2C2C] to-[#8B1E1E]">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">

          <span className="inline-flex items-center bg-white/10 backdrop-blur px-5 py-2 rounded-full text-white">

            🛍 Shopping Guide

          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold text-white">

            How To Order

          </h1>

          <p className="mt-8 text-lg text-gray-200 max-w-3xl mx-auto leading-8">

            Shopping at Priyaa Textile is quick, secure and simple.
            Follow these easy steps to place your order with confidence.

          </p>

        </div>

      </section>

      {/* QUICK HIGHLIGHTS */}

      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <ShoppingCart
              className="text-[#8B1E1E]"
              size={34}
            />

            <h3 className="mt-5 font-bold text-xl">
              Easy Shopping
            </h3>

            <p className="text-gray-500 mt-2">
              Simple Steps
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <CreditCard
              className="text-[#8B1E1E]"
              size={34}
            />

            <h3 className="mt-5 font-bold text-xl">
              Secure Payment
            </h3>

            <p className="text-gray-500 mt-2">
              Safe Checkout
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <PackageCheck
              className="text-[#8B1E1E]"
              size={34}
            />

            <h3 className="mt-5 font-bold text-xl">
              Fast Delivery
            </h3>

            <p className="text-gray-500 mt-2">
              Across India
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <PhoneCall
              className="text-[#8B1E1E]"
              size={34}
            />

            <h3 className="mt-5 font-bold text-xl">
              Customer Support
            </h3>

            <p className="text-gray-500 mt-2">
              Always Available
            </p>

          </div>

        </div>

      </section>

      {/* STEPS */}

      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="space-y-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (

              <div
                key={step.title}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-8"
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

                      STEP {index + 1}

                    </p>

                    <h2 className="text-2xl font-bold mt-2">

                      {step.title}

                    </h2>

                    <p className="mt-4 text-gray-600 leading-8">

                      {step.description}

                    </p>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      </section>

      {/* TIMELINE */}

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-center text-[#3d1f1f]">

            Your Shopping Journey

          </h2>

          <div className="mt-12 grid md:grid-cols-7 gap-6 text-center">

            {[
              "Browse",
              "Select",
              "Cart",
              "Checkout",
              "Address",
              "Payment",
              "Delivered",
            ].map((item, i) => (

              <div key={item}>

                <div className="w-14 h-14 mx-auto rounded-full bg-[#8B1E1E] text-white flex items-center justify-center font-bold">

                  {i + 1}

                </div>

                <p className="mt-4 font-semibold">

                  {item}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* HELP */}

      <section className="bg-gradient-to-r from-[#3d1f1f] to-[#8B1E1E] py-20">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <PhoneCall
            className="mx-auto text-white"
            size={60}
          />

          <h2 className="mt-8 text-4xl font-bold text-white">

            Need Help Placing Your Order?

          </h2>

          <p className="mt-6 text-gray-200 text-lg leading-8 max-w-3xl mx-auto">

            Our support team is happy to help you with product
            selection, payments, shipping or any order-related questions.

          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">

            <a
              href="tel:+919876543210"
              className="bg-white text-[#8B1E1E] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Call Us
            </a>

            <a
              href="https://wa.me/919876543210"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition flex items-center gap-2"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>

            <Link
              href="/contact"
              className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#8B1E1E] transition"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}