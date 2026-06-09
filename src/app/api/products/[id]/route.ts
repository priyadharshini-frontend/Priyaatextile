import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const {
      name,
      description,
      price,
      discount,
      stock,
      images,
      categoryId,
      subCategoryId,
    } = body;

    // 1. Check product exists
    const existing = await db.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // 2. Update product
    const updated = await db.product.update({
      where: { id },
      data: {
        name,
        description,
        price: Number(price),
        discount: Number(discount),
        stock: Number(stock),
        images,
        categoryId,
        subCategoryId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
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

    // 1. Check if product exists
    const existing = await db.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // 2. Delete product
    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}