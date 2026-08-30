import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { registerSchema } from "@/schemas/auth.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.issues[0].message,
        },
        {
          status: 400,
        }
      );
    }

    const { name, mobile, password } = validation.data;

    const existingUser = await db.user.findUnique({
      where: {
        mobile,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Mobile number already registered",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
      data: {
        name,
        mobile,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        User: {
          id: user.id,
          name: user.name,
          mobile: user.mobile,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.log(error);

    if (error?.code === "P2002") {
      return NextResponse.json(
        {
          message: "Mobile number already registered",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}