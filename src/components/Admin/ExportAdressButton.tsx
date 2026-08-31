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
    // ==========================================
    // SHIP TO - CUSTOMER
    // ==========================================

    const customerName =
      order.shippingName?.trim() || "Customer";

    const customerAddress = [
      order.shippingAddressLine1,
      order.shippingAddressLine2,
      `${order.shippingCity}, ${order.shippingState}`,
      order.shippingPostalCode,
      order.shippingCountry,
    ].filter(Boolean);

    // ==========================================
    // FROM - PRIYAA TEXTILE
    // ==========================================

    const fromAddress = [
      "PRIYAA TEXTILE",
      "No 15, 16",
      "G.H. Road",
      "Gudiyattam, Vellore",
      "Tamil Nadu",
      "India",
      "Phone: YOUR PHONE NUMBER",
    ];

    // ==========================================
    // SPACING
    // ==========================================

    const shipToSpace = "        ";

    // ==========================================
    // BUILD SHIPPING LABEL
    // ==========================================

    const lines = [
      "",
      "============================================================",
      "",
      "        SHIP TO",
      "",
      `${shipToSpace}${customerName.toUpperCase()}`,
      "",

      ...customerAddress.map(
        (line) => `${shipToSpace}${line}`
      ),

      "",
      `${shipToSpace}PHONE: ${order.shippingPhone}`,
      "",
      "============================================================",
      "",
      "",
      "FROM",
      "",
      "PRIYAA TEXTILE",
      "No 15, 16",
      "G.H. Road, Gudiyattam, Vellore",
      "Tamil Nadu",
      "India",
      "Phone:9345948849",
      "",
      "============================================================",
      "",
    ];

    // ==========================================
    // CONVERT TEXT TO HTML
    // ==========================================

    // Escape HTML characters so customer data
    // cannot break the generated document.
    const escapeHtml = (text: string) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const content = lines
      .map((line) => escapeHtml(line))
      .join("\n");

    // ==========================================
    // PRINTABLE HTML DOCUMENT
    // ==========================================

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <title>
    ${escapeHtml(customerName)} - Shipping Label
  </title>

  <style>

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 20px;

      background: white;

      font-family:
        "Courier New",
        Courier,
        monospace;

      font-size: 22px;

      font-weight: 600;

      line-height: 1.55;

      white-space: pre;

      color: #000;
    }

    .shipping-label {
      width: 100%;
      max-width: 900px;

      margin: 0 auto;

      padding: 25px;

      border: 2px solid #000;

      border-radius: 4px;

      white-space: pre;
    }

    @media print {

      @page {
        margin: 10mm;
      }

      body {
        margin: 0;
        padding: 0;

        font-size: 22px;
      }

      .shipping-label {
        max-width: none;

        width: 100%;

        border: 2px solid #000;
      }

    }

  </style>
</head>

<body>

<div class="shipping-label">${content}</div>

</body>
</html>
`;

    // ==========================================
    // CREATE HTML FILE
    // ==========================================

    const blob = new Blob(
      [htmlContent],
      {
        type: "text/html;charset=utf-8",
      }
    );

    const url = URL.createObjectURL(blob);

    // ==========================================
    // CUSTOMER NAME → FILE NAME
    // ==========================================

    const safeCustomerName =
      customerName
        .replace(/[^a-zA-Z0-9\s.-]/g, "")
        .replace(/\s+/g, "-");

    const fileName = `${
      safeCustomerName || "customer"
    }-shipping-label.html`;

    // ==========================================
    // DOWNLOAD
    // ==========================================

    const link =
      document.createElement("a");

    link.href = url;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="text-sm font-medium text-[#7A1F3D] hover:underline"
    >
      Export Address
    </button>
  );
}