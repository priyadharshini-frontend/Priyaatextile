import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, categoryId } = body;

    // 1. Validate input
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    if (!name || !categoryId) {
      return NextResponse.json(
        { message: "Enter all the details" },
        { status: 400 },
      );
    }

    // 2. Check category exists
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 },
      );
    }

    // 3. Create subcategory
    const subcategory = await db.subCategory.create({
      data: {
        name,
        slug,
        categoryId,
      },
    });

    // 4. Success response
    return NextResponse.json(
      {
        success: true,
        message: "Subcategory created successfully",
        data: subcategory,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    const subcategories = await db.subCategory.findMany({
      where: categoryId ? { categoryId } : {},
    });

    return NextResponse.json({
      success: true,
      data: subcategories,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching subcategories" },
      { status: 500 },
    );
  }
}
