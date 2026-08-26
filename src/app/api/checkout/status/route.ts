import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const payload =
      verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        { status: 401 }
      );
    }

    const userId =
      (payload as any).userId;

    const orderCount =
      await db.order.count({
        where: {
          userId,
        },
      });

    return NextResponse.json({
      success: true,
      isFirstOrder:
        orderCount === 0,
      orderCount,
    });
  } catch (error: any) {
    console.error(
      "CHECKOUT STATUS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Failed to check checkout status",
      },
      { status: 500 }
    );
  }
}