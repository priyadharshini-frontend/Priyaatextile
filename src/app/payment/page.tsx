export default function PaymentPage() {
  return (
    <div className="container py-5">
      <div className="card p-4 shadow-sm">
        <h2>Payment</h2>

        <p className="mt-3">
          Review your order before payment.
        </p>
        <div className="d-flex justify-content-between">
          <span>Total Amount</span>
          <strong>₹3000</strong>
        </div>

        <button className="btn btn-success mt-4">
          Pay ₹3000
        </button>
      </div>
    </div>
  );
}