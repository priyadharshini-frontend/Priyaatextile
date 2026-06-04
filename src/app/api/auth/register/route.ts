import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { hashPassword, generateToken, createSession } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, phone } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUsers = await db.users.findMany({
      where: { email },
    });

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const userId = randomUUID();

    const user = await db.users.create({
      data: {
        id: userId,
        email,
        password: hashedPassword,
        name: name || null,
        phone: phone || null,
        status: "active",
        date_created: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        status: true,
        date_created: true,
      },
    });

    const { sessionId } = await createSession(
      user.id,
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null
    );

    const token = generateToken({ userId: user.id, email: user.email! }, sessionId);

    return NextResponse.json({ user, token }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
