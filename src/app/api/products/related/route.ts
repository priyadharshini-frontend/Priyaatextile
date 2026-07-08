import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const productId = searchParams.get("productId");
  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");

  if (!productId || !categoryId) {
    return NextResponse.json([], { status: 200 });
  }

  const products = await db.product.findMany({
    where: {
      id: {
        not: productId,
      },
      categoryId,
      ...(subCategoryId && {
        subCategoryId,
      }),
      isActive: true,
    },
    include: {
      category: true,
      subCategory: true,
    },
    take: 4,
  });

  return NextResponse.json(products);
}