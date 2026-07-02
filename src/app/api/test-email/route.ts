import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function GET() {
  try {
    const result = await sendEmail({
      to: "priyaofficial1926@gmail.com", // Replace with your email
      subject: "Ramya Boutique Test Email",
      html: `
        <h1>🎉 Email Working Successfully!</h1>

        <p>This email was sent from your Next.js application using Resend.</p>

        <p>If you're seeing this, your email integration is working correctly.</p>

        <hr />

        <p><strong>Ramya Boutique</strong></p>
      `,
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}