import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { success } from "zod";
import { error } from "console";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      description,
      price,
      salesPrice,
      stock,
      image,
      brand,
      isFeatured,
      isActive,
      size,
      categoryId,
      subCategoryId,
      
    } = body;

    // 1. Validate
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    if (!name || !price || !categoryId || !subCategoryId ||!description) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 },
      );
    }

    // 2. Check category
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 406 },
      );
    }

    // 3. Check subcategory
    const subCategory = await db.subCategory.findUnique({
      where: { id: subCategoryId },
    });

    if (!subCategory) {
      return NextResponse.json(
        { message: "SubCategory not found" },
        { status: 406 },
      );
    }

    // 4. Create product
    const product = await db.product.create({
      data: {
       name,
       slug,
      description,
      price:Number(price),
      salesPrice:salesPrice?Number(salesPrice):null,
      stock:Number(stock)||0,
      image,
      brand,
      isFeatured:Boolean(isFeatured),
      isActive:isActive??true,
      size,
      categoryId,
      subCategoryId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error:any) {
    console.log(error);
    if(error.code==="P2002"){
      return NextResponse.json({
        success:false,
        message:"Duplicate slug (already Exists"
      },{
        status:409
      })
    }

    return NextResponse.json(
      { message: "Internal Server Error",
      error: String(error)},
      { status: 500},
    );
  }
}

export async function GET(request:NextRequest) {
  try {
    const search=request.nextUrl.searchParams.get("search")||"";
    const sort = request.nextUrl.searchParams.get("sort") || "featured";
    console.log("Sorted",sort)
    //  console.log("Search Value:", search);
let orderBy = {};

switch (sort) {
  case "newest":
    orderBy = { createdAt: "desc" };
    break;

  case "price-low":
    orderBy = { salesPrice: "asc" };
    break;

  case "price-high":
    orderBy = { salesPrice: "desc" };
    break;

  default:
    orderBy = { createdAt: "desc" };
}
    const products = await db.product.findMany({
      where:search
      ?{
        name:{
          contains:search,
          mode:"insensitive"
        }
      }
      :{},
      include: {
        category: true,
        subCategory: true,
      },
    orderBy,
    });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to fetch Products" },
      { status: 500},
    );
  }
}
