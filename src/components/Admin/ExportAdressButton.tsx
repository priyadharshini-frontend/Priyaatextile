"use client";

interface ShippingAddress {
  id: string;
  shippingName: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string | null;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingPhone: string;
}

export default function ExportAddressButton({
  order,
}: {
  order: ShippingAddress;
}) {
  function handleExport() {
    // Customer / Shipping Address
    const customerAddress = [
      order.shippingName,
      order.shippingAddressLine1,
      order.shippingAddressLine2,
      `${order.shippingCity}, ${order.shippingState}`,
      order.shippingPostalCode,
      order.shippingCountry,
      "",
      `Phone: ${order.shippingPhone}`,
    ].filter(Boolean);

    // From address
    // CHANGE THESE DETAILS TO YOUR ACTUAL BUSINESS ADDRESS
    const fromAddress = [
      "PRIYAA TEXTILE",
      "No 15,16",
      "G.H. Road,Gudiyattam,Vellore",
      "TamilNadu",
      "India",
      "",
      "Phone: YOUR PHONE NUMBER",
    ];

    const lines = [
      "FROM",
      "",
      ...fromAddress,
      "",
      "========================================",
      "",
      "SHIP TO",
      "",
      ...customerAddress,
    ];

    const content = lines.join("\n");

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    // Create safe customer name for filename
    const customerName = order.shippingName
      .trim()
      .replace(/[^a-zA-Z0-9\s.-]/g, "")
      .replace(/\s+/g, "-");

    const a = document.createElement("a");
    a.href = url;
    a.download = `${customerName || "customer-address"}.txt`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="text-sm font-medium text-[#7A1F3D] hover:underline"
    >
      Export Address
    </button>
  );
}