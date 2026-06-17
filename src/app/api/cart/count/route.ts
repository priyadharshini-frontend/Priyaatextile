// api/cart/count/route.ts

import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/curentUser";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({
        count: 0,
      });
    }

    const cart = await db.cart.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      count: cart?.items.length || 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        count: 0,
      },
      {
        status: 500,
      }
    );
  }
}