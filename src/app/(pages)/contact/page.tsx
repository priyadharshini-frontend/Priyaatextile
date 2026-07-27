import ContactForm from "@/components/contact/contactform";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock3,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-[#F8F5F0]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-r from-[#3d1f1f] via-[#5B2C2C] to-[#8B1E1E]">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white blur-3xl" />

          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">

          <span className="inline-flex items-center bg-white/10 backdrop-blur px-5 py-2 rounded-full text-white">

            📞 We're Here To Help

          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold text-white">

            Contact Us

          </h1>

          <p className="mt-8 text-lg text-gray-200 max-w-3xl mx-auto leading-8">

            Have questions about our collections, orders or store?
            We'd love to hear from you.

          </p>

        </div>

      </section>

      {/* QUICK INFO */}

      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <PhoneCall
              className="text-[#8B1E1E]"
              size={34}
            />

            <h3 className="mt-5 text-xl font-bold">

              Call Us

            </h3>

            <p className="mt-2 text-gray-500">

              +91 XXXXX XXXXX

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <Mail
              className="text-[#8B1E1E]"
              size={34}
            />

            <h3 className="mt-5 text-xl font-bold">

              Email

            </h3>

            <p className="mt-2 text-gray-500 break-all">

              support@priyaatextile.com

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <MapPin
              className="text-[#8B1E1E]"
              size={34}
            />

            <h3 className="mt-5 text-xl font-bold">

              Stores

            </h3>

            <p className="mt-2 text-gray-500">

              Vellore & Gudiyattam

            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <Clock3
              className="text-[#8B1E1E]"
              size={34}
            />

            <h3 className="mt-5 text-xl font-bold">

              Working Hours

            </h3>

            <p className="mt-2 text-gray-500">

              9.30 AM - 8.30 PM

            </p>

          </div>

        </div>

      </section>

      {/* CONTACT */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-5 gap-10">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <h2 className="text-4xl font-bold text-[#3d1f1f]">

              Let's Start a Conversation

            </h2>

            <p className="mt-6 text-gray-600 leading-8">

              Whether you need help choosing the perfect saree,
              tracking an order, or learning more about our
              collections, our friendly team is ready to assist.

            </p>

            <div className="mt-10 space-y-8">

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-2xl bg-[#8B1E1E]/10 flex items-center justify-center">

                  <MapPin className="text-[#8B1E1E]" />

                </div>

                <div>

                  <h3 className="font-bold text-xl">

                    Store Address

                  </h3>

                  <p className="text-gray-600 mt-2">

                    Priyaa Textile

                    <br />

                    Vellore & Gudiyattam

                    <br />

                    Tamil Nadu

                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-2xl bg-[#8B1E1E]/10 flex items-center justify-center">

                  <PhoneCall className="text-[#8B1E1E]" />

                </div>

                <div>

                  <h3 className="font-bold text-xl">

                    Phone

                  </h3>

                  <p className="text-gray-600 mt-2">

                    +91 98765 43210

                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-2xl bg-[#8B1E1E]/10 flex items-center justify-center">

                  <Mail className="text-[#8B1E1E]" />

                </div>

                <div>

                  <h3 className="font-bold text-xl">

                    Email

                  </h3>

                  <p className="text-gray-600 mt-2">

                    support@priyaatextile.com

                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-2xl bg-[#8B1E1E]/10 flex items-center justify-center">

                  <Clock3 className="text-[#8B1E1E]" />

                </div>

                <div>

                  <h3 className="font-bold text-xl">

                    Business Hours

                  </h3>

                  <p className="text-gray-600 mt-2">

                    Monday - Sunday

                  </p>

                  <p className="text-gray-600">

                    10:00 AM - 9:00 PM

                  </p>

                </div>

              </div>

            </div>

            <div className="flex gap-4 mt-10">

              <a
                href="tel:+91XXXXXXXXXX"
                className="flex-1 text-center bg-[#8B1E1E] text-white py-4 rounded-xl font-semibold hover:bg-[#731818] transition"
              >
                Call Now
              </a>

              <a
                href="https://wa.me/91XXXXXXXXXX"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                <MessageCircle size={20} />

                WhatsApp

              </a>

            </div>

          </div>

          {/* RIGHT */}

          <div className="lg:col-span-3">

            <div className="bg-white rounded-[32px]">

              <ContactForm />

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}