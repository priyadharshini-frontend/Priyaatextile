import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { success } from "zod";
import { error } from "console";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      productCode,
      name,
      description,
      price,
      salesPrice,
      stock,
      image,
      brand,
      isFeatured,
      isBestSeller,
      isArrival,
      isActive,
      size,
      categoryId,
      subCategoryId,
      
    } = body;

    // 1. Validate
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    if (!name || !price || !categoryId || !subCategoryId ||!description ||!productCode) {
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
       productCode,
       name,
       slug,
      description,
      price:Number(price),
      salesPrice:salesPrice?Number(salesPrice):null,
      stock:Number(stock)||0,
      image,
      brand,
      isFeatured:Boolean(isFeatured),
      isBestSeller:Boolean(isBestSeller),
      isArrival:Boolean(isArrival),
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

export async function GET(request: NextRequest) {
  try {
    // Query Params
    const search = request.nextUrl.searchParams.get("search") || "";
    const category = request.nextUrl.searchParams.get("category") || "";
    const subcategory =
      request.nextUrl.searchParams.get("subcategory") || "";
    const type = request.nextUrl.searchParams.get("type") || "";
    const featured =
      request.nextUrl.searchParams.get("featured") || "";
    const sale = request.nextUrl.searchParams.get("sale") || "";
    const sort = request.nextUrl.searchParams.get("sort") || "newest";

    const page = Number(
      request.nextUrl.searchParams.get("page") || 1
    );

    const limit = Number(
      request.nextUrl.searchParams.get("limit") || 12
    );
    const maxPrice = Number(
  request.nextUrl.searchParams.get("maxPrice") || 0
);

    // Sorting
    let orderBy: any = {};

    switch (sort) {
      case "newest":
        orderBy = {
          createdAt: "desc",
        };
        break;

      case "oldest":
        orderBy = {
          createdAt: "asc",
        };
        break;

      case "price-low":
        orderBy = {
          salesPrice: "asc",
        };
        break;

      case "price-high":
        orderBy = {
          salesPrice: "desc",
        };
        break;

      case "name":
        orderBy = {
          name: "asc",
        };
        break;

      default:
        orderBy = {
          createdAt: "desc",
        };
    }

    // Dynamic Filters
    const where: any = {
      isActive: true,
    };

    // Search
    if (search) {
      where.OR = [
    {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      productCode: {
        contains: search,
        mode: "insensitive",
      },
    },
  ];
    }

    // Category
    if (category) {
      where.category = {
        slug: category,
      };
    }

    // Sub Category
    if (subcategory) {
      where.subCategory = {
        slug: subcategory,
      };
    }

    // Featured
    if (featured === "true") {
      where.isFeatured = true;
    }

    // New Arrival
    if (type === "new") {
      where.isArrival = true;
    }

    // Best Seller
    if (type === "bestseller") {
      where.isBestSeller = true;
    }

    // Sale Products
    if (sale === "true") {
      where.salesPrice = {
        not: null,
      };
    }

    //price
    if (maxPrice > 0) {
  where.price = {
    lte: maxPrice,
  };
}

    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: true,
          subCategory: true,
        },
        orderBy,
        skip,
        take: limit,
      }),

      db.product.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      {
        status: 500,
      }
    );
  }
}
