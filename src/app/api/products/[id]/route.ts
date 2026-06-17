import { NextRequest,NextResponse } from "next/server";
import db from "@/lib/db";


export async function  GET(req:NextRequest,{params}:{params:Promise<{id:string}>})
{
  try {
    const { id } = await params;

    const product = await db.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        subCategory: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }

}

  
