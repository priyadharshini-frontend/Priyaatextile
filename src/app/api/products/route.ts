import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request) {
  try {
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

    // 1. Validate
    if (!name || !price || !categoryId || !subCategoryId) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    // 2. Check category
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 406 }
      );
    }

    // 3. Check subcategory
    const subCategory = await db.subCategory.findUnique({
      where: { id: subCategoryId },
    });

    if (!subCategory) {
      return NextResponse.json(
        { message: "SubCategory not found" },
        { status: 406 }
      );
    }

    // 4. Create product
    const product = await db.product.create({
      data: {
        name,
        description,
        price: Number(price),
        discount: Number(discount) || 0,
        stock: Number(stock) || 0,
        images: images || [],
        categoryId,
        subCategoryId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}