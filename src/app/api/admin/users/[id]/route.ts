import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { requireAdmin, hashPassword } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmin(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const userData = await db.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        status: true,
        date_created: true,
      },
    });

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Admin get user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { email, password, name, phone, status } = await req.json();

    const existingUser = await db.users.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};

    if (email) updateData.email = email;
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (status) updateData.status = status;
    if (password) {
      updateData.password = await hashPassword(password);
    }

    const updatedUser = await db.users.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        status: true,
        date_created: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Admin update user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existingUser = await db.users.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db.users.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Admin delete user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
