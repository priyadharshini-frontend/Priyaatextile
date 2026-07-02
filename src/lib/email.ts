import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Ramya Boutique <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error(error);

      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error,
    };
  }
}

export async function sendOrderConfirmationEmail({
  to,
  customerName,
  orderId,
  totalAmount,
}: {
  to: string;
  customerName: string;
  orderId: string;
  totalAmount: number;
}) {
  return await sendEmail({
    to,
    subject: `Order Confirmed - ${orderId}`,
    html: `
      <h2>Thank you for your order, ${customerName}! 🎉</h2>

      <p>Your payment has been received successfully.</p>

      <hr />

      <p><strong>Order ID:</strong> ${orderId}</p>

      <p><strong>Total Amount:</strong> ₹${totalAmount}</p>

      <p>We'll start processing your order shortly.</p>

      <br/>

      <p>Thank you for shopping with <strong>Ramya Boutique</strong>.</p>
    `,
  });
}