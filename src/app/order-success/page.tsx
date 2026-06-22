import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="container py-5">
      <div className="card p-5 text-center shadow-sm">
        <h1>✅ Order Placed Successfully</h1>

        <p className="mt-3">
          Thank you for your purchase.
        </p>

        <h5>Order ID: ORD123456</h5>

        <Link
          href="/"
          className="btn btn-primary mt-4"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}