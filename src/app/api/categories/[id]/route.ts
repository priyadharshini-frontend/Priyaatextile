import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

/* ---------------- GET CATEGORY ---------------- */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const category = await db.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("FULL ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ---------------- PUT CATEGORY ---------------- */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedCategory = await db.category.update({
      where: { id },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      { message: "Update Failed" },
      { status: 500 }
    );
  }
}

/* ---------------- DELETE CATEGORY ---------------- */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existingCategory = await db.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    await db.category.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}