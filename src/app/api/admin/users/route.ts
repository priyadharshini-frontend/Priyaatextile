import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdmin, hashPassword } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAdmin(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await db.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        status: true,
        date_created: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Admin list users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
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

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Admin create user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
