import Link from "next/link";

const FEATURE_HIGHLIGHTS = [
  {
    icon: "💎",
    title: "Premium Quality",
    desc: "100% authentic handcrafted",
  },
  {
    icon: "🚚",
    title: "Free Shipping",
    desc: "On orders above ₹5000",
  },
  {
    icon: "♡",
    title: "Easy Returns",
    desc: "30-day return policy",
  },
];

export default function EmptyCart() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          Your Cart is Empty
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {FEATURE_HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="p-5 border rounded-xl"
            >
              <p>{item.icon}</p>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <Link
          href="/product"
          className="inline-block mt-10"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}