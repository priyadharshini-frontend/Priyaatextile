import { NextRequest,NextResponse } from "next/server";
import db from "@/lib/db";


export async function PUT(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
  try{
    const {id}=await params;
    const body =await request.json();
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



     if (!name || !price || !categoryId || !subCategoryId || !description) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

     // Check Product
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }


       // Check Category
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

       // Check SubCategory
    const subCategory = await db.subCategory.findUnique({
      where: { id: subCategoryId },
    });

    if (!subCategory) {
      return NextResponse.json(
        { success: false, message: "SubCategory not found" },
        { status: 404 }
      );
    }

     const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price: Number(price),
        salesPrice: salesPrice ? Number(salesPrice) : null,
        stock: Number(stock),
        image,
        brand,
        isFeatured: Boolean(isFeatured),
        isActive: Boolean(isActive),
        size,
        categoryId,
        subCategoryId,
      },
    });
     return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
    


  }

  catch(error:any){
     console.log(error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Product with same slug already exists",
        },
        {
          status: 409,
        }

      );
  }

}

 return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  

  
}

export async function DELETE(request:NextRequest,{ params }: { params: Promise<{ id: string }> }){

  try {
    const { id } = await params;

    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

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
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }

}
  
