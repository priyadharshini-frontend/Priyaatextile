import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyPassword, generateToken, createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await db.users.findFirst({
      where: { email },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken({ userId: user.id, email: user.email! });

    await createSession(token, (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null));

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        status: user.status,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
