import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Database,
  Cookie,
  UserCheck,
  FileText,
  Bell,
  PhoneCall,
} from "lucide-react";

const policies = [
  {
    icon: Database,
    title: "Information We Collect",
    description:
      "We collect your name, email address, phone number, shipping address, billing details, and other information required to process your orders and provide customer support.",
  },
  {
    icon: UserCheck,
    title: "How We Use Your Information",
    description:
      "Your information is used to process orders, provide customer support, improve our website, send order updates, and deliver promotional offers when you have chosen to receive them.",
  },
  {
    icon: Lock,
    title: "Payment Security",
    description:
      "All payments are processed through secure payment gateways. Priyaa Textile never stores your debit card, credit card, or banking information.",
  },
  {
    icon: ShieldCheck,
    title: "Sharing of Information",
    description:
      "We never sell or rent your personal information. It is shared only with trusted delivery and payment partners when necessary to complete your order.",
  },
  {
    icon: Cookie,
    title: "Cookies",
    description:
      "Cookies help us improve your browsing experience, remember preferences, and enhance website performance for future visits.",
  },
  {
    icon: ShieldCheck,
    title: "Data Protection",
    description:
      "We use appropriate technical and organizational security measures to protect your information from unauthorized access or misuse.",
  },
  {
    icon: FileText,
    title: "Your Rights",
    description:
      "You may request to access, update, correct, or delete your personal information by contacting our support team.",
  },
  {
    icon: Bell,
    title: "Policy Updates",
    description:
      "This Privacy Policy may be updated from time to time. Changes will be published on this page with the latest revision date.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#F8F5F0]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-r from-[#3d1f1f] via-[#5B2C2C] to-[#8B1E1E]">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-white blur-3xl" />

          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-white blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">

          <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur px-5 py-2 text-white">

            🔒 Privacy & Data Protection

          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold text-white">

            Privacy Policy

          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-gray-200">

            Your privacy matters to us. We are committed to protecting
            your personal information and maintaining complete
            transparency about how your data is collected and used.

          </p>

        </div>

      </section>

      {/* QUICK INFO */}

      <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <Lock className="text-[#8B1E1E]" size={34} />

            <h3 className="mt-5 font-bold text-xl">
              Secure Payments
            </h3>

            <p className="mt-2 text-gray-500">
              Encrypted Transactions
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <ShieldCheck className="text-[#8B1E1E]" size={34} />

            <h3 className="mt-5 font-bold text-xl">
              Data Protected
            </h3>

            <p className="mt-2 text-gray-500">
              Industry Best Practices
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <Cookie className="text-[#8B1E1E]" size={34} />

            <h3 className="mt-5 font-bold text-xl">
              Cookies
            </h3>

            <p className="mt-2 text-gray-500">
              Better Experience
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <UserCheck className="text-[#8B1E1E]" size={34} />

            <h3 className="mt-5 font-bold text-xl">
              Customer Privacy
            </h3>

            <p className="mt-2 text-gray-500">
              Always Respected
            </p>

          </div>

        </div>

      </section>

      {/* POLICY CARDS */}

      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="space-y-8">

          {policies.map((policy, index) => {
            const Icon = policy.icon;

            return (

              <div
                key={policy.title}
                className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 p-8"
              >

                <div className="flex gap-6">

                  <div className="w-16 h-16 rounded-2xl bg-[#8B1E1E]/10 flex items-center justify-center">

                    <Icon
                      size={30}
                      className="text-[#8B1E1E]"
                    />

                  </div>

                  <div>

                    <p className="font-semibold text-[#8B1E1E]">

                      Policy {index + 1}

                    </p>

                    <h2 className="text-2xl font-bold mt-2">

                      {policy.title}

                    </h2>

                    <p className="mt-4 text-gray-600 leading-8">

                      {policy.description}

                    </p>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-[#3d1f1f] to-[#8B1E1E] py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <PhoneCall
            size={60}
            className="mx-auto text-white"
          />

          <h2 className="mt-8 text-4xl font-bold text-white">

            Questions About Your Privacy?

          </h2>

          <p className="mt-6 text-lg text-gray-200 leading-8 max-w-3xl mx-auto">

            If you have any questions about how your information is
            collected, stored, or used, our support team is here to help.

          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">

            <Link
              href="/contact"
              className="bg-white text-[#8B1E1E] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Contact Us
            </Link>

            <a
              href="tel:+919876543210"
              className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#8B1E1E] transition"
            >
              Call Support
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}