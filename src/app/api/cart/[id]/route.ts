import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { quantity } = body;

    const item = await db.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update quantity",
      },
      {
        status: 500,
      }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.cartItem.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Item removed",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove item",
      },
      {
        status: 500,
      }
    );
  }
}