import { NextResponse } from "next/server";
import db from "@/lib/db";
import { Category } from "@/components/home/Category";



export async function POST(request) {
//get data from body

try{
  const body =await request.json();

//variables for fields
    const {name,slug}=body;
//conditon checking
    if(!name || !slug){
        return NextResponse.json({
            message:"Name and Slug are required"
        },
        {
            status:400,
        }
    )
    }
    const category =await db.category.create({
        data:{
            name,
            slug
        }
    })
    return NextResponse.json({
        message:"Category created successfully",
        category
    },
{
    status:201,
})
}
catch(error){
    console.log(error)

    return NextResponse.json({
        message:"Something went wrong"
    },{
        status:500,
    })

}
  
}
export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        created: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching categories",
      },
      { status: 500 }
    );
  }
}


