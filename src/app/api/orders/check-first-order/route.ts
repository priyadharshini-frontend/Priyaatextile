import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 401 }
      );
    }

    const userId = (payload as any).userId;

    const previousOrder = await db.order.findFirst({
      where: {
        userId,
        status: {
          in: ["PAID", "SHIPPED", "DELIVERED"],
        },
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({
      success: true,
      isFirstOrder: !previousOrder,
    });
  } catch (error: any) {
    console.error("CHECK FIRST ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to check first order",
      },
      { status: 500 }
    );
  }
}