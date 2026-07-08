import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { generateResetToken, getResetTokenExpiry } from "@/lib/reset-token";
import { sendResetEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    // Don't reveal whether the email exists
    if (!user) {
      return NextResponse.json({
        message:
          "If an account with that email exists, a reset link has been sent.",
      });
    }

    // Delete previous reset tokens
    await db.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Generate token
    const token = generateResetToken();

    // Expiry (15 mins)
    const expiresAt = getResetTokenExpiry();

    // Save token
    await db.passwordResetToken.create({
      data: {
        token,
        expiresAt,
        userId: user.id,
      },
    });

    // Send email
    await sendResetEmail(user.email, token);

    return NextResponse.json({
      message:
        "If an account with that email exists, a reset link has been sent.",
    });
  } 
  catch (error: any) {
  console.error("Forgot Password Error:", error);

  return NextResponse.json(
    {
      message: error.message,
      error,
    },
    { status: 500 }
  );
}
}