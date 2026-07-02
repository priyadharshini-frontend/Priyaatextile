"use client";

export default function WhatsAppButton() {
  const phoneNumber = "919999999999"; // your number with country code, no + or spaces
  const message = "Hello! I have a query."; // optional prefilled message

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <img src="/whatsapp-logo.png" alt="WhatsApp" width={35} height={35} />
    </a>
  );
}