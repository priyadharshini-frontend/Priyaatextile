import { NextResponse } from "next/server";
import db from "@/lib/db";


export async function POST(request:Request){
    try{
        const body=await request.json()

        const{name}=body

        if(!name){
            return NextResponse.json({
                message:"Name or Slug not exists"
            },{
                status:400
            })
        }

            
        const slug =name.toLowerCase().replace(/\s+/g,"-")


        const existing= await db.category.findUnique({
            where:{slug},
        })

        if(existing){
            return NextResponse.json({
                message:"Category Already Exixts"
            })
        }

        const category =await db.category.create({
            data:{
                name,
                slug,
            }
        })
        return NextResponse.json({
            success:true,
            message:"Category Created Sucessfully",
            data:category,
        },{
            status:201
        })
    }
    catch(error){
        return NextResponse.json({
            message:"Internal server Error"
        },{
            status:500
        })
    }
}
export async function GET() {
    try{
        const category=await db.category.findMany({

            include:{
                subCategories:true,
            },
            orderBy:{
                created:"desc"
            }
        })
        return NextResponse.json({
            success:"true",
            data:category,
        })

    }
    catch(error){
        return NextResponse.json({
            message:"Internal Server Error"
        },{
            status:500
        })
    }
    
}