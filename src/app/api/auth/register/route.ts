import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { registerSchema } from "@/schemas/auth.schema";


export async function POST(req: NextRequest) {
  try {

    const body=await req.json();
    const validation=registerSchema.safeParse(body);
    if(!validation.success){
      return NextResponse.json({
        message:validation.error.issues[0].message,
      },{
        status:400
      })
    }

    const {name,email,password}=validation.data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User created Successfully",
        User: {
    id: user.id,
    name: user.name,
    email: user.email,
    
  }
      },
      { status: 201 }
    );
          console.log("user created")

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }


}