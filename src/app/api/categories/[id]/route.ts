    import { NextResponse } from "next/server";
    import db from "@/lib/db";

    export async function GET(request:Request,{params}:any) {

        try{
            const category=await db.category.findUnique({
                where:{
                    id:params.id,
                },
            
            })
            

            if(!category){
                return NextResponse.json({
                    message:"Category Not Found"
                },{
                    status:404
                })
            }

            return NextResponse.json(category)

        }
        catch(error){
  console.log("FULL ERROR:", error);

            return NextResponse.json({
                message:"Internal Serve Error"
            },{
                status:5000
            })
        }
        
    }

 export async function PUT(request:Request,{params}:any){
    try{
        const body=await request.json()

        const UpdatedCategory=await db.category.update({
            where:{
                id:params.id,
            },
            data:{
                name:body.name,

            }
        })
        return NextResponse.json(UpdatedCategory)

    }
    catch(error){
        return NextResponse.json({
            message:"update Failed"
        },{
            status:500
        })
    }
 }
// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     if (!id) {
//       return NextResponse.json(
//         { error: "Category id is required" },
//         { status: 400 }
//       );
//     }

//     const existingCategory = await db.category.findUnique({
//       where: { id },
//     });

//     if (!existingCategory) {
//       return NextResponse.json(
//         { message: "Category not found" },
//         { status: 404 }
//       );
//     }

//     await db.category.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: "Deleted successfully" });
//   } catch (error) {
//     return NextResponse.json(
//       { error: String(error) },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(request:Request, { params }) {
  console.log("PARAMS:", params);
  return Response.json(params);
}