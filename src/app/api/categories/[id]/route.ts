import { NextResponse } from "next/server";
import db from "@/lib/db";


export async function PUT(request,{params}) {
    try{
         const {id}=await params;
    const body=await request.json()
    const {name,slug}=body

    if(!name){
        return NextResponse.json({
            message:"Name is required"

        },{
            status:400
        }
    )
    }
    const category=await db.category.update({
        where:{
            id
        },
        data:{
            name,
            slug,
        },
    })

     return NextResponse.json({
        message:"category updated successfully",
        category
     })


    }
    catch(error){
        console.log(error)
        return NextResponse.json({
            message:"server error"


        })
    }
   
    
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      );
    }

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

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);

    return NextResponse.json(
      { message: "Internalsss server error" },
      { status: 500 }
    );
  }
}