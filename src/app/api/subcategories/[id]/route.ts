import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const { name, slug, categoryId } = body;

    // 1. Check if subcategory exists
    const existing = await db.subCategory.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "SubCategory not found" },
        { status: 404 }
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
      { status: 500 }
    );
  }
}


export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // 1. Check if exists
    const existing = await db.subCategory.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "SubCategory not found" },
        { status: 404 }
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
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}