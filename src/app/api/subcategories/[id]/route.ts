import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const subcategory = await db.subCategory.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(subcategory);
  } catch (error) {
    return NextResponse.json({
      message: "internal Server Error",
    });
  }
}
/* ---------------- UPDATE SUBCATEGORY ---------------- */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { name, slug, categoryId } = body;

    // 1. Check if subcategory exists
    const existing = await db.subCategory.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "SubCategory not found" },
        { status: 404 },
      );
    }

    // 2. Update subcategory
    const updated = await db.subCategory.update({
      where: { id },
      data: {
        name,
        slug,
        categoryId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "SubCategory updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ---------------- DELETE SUBCATEGORY ---------------- */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // 1. Check if exists
    const existing = await db.subCategory.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "SubCategory not found" },
        { status: 404 },
      );
    }

    // 2. Delete
    await db.subCategory.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message:
          "Cannot delete this subcategory because products are assigned to it.",
      },
      { status: 500 },
    );
  }
}
