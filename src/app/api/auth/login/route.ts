import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { comparePassword, generateToken } from "@/lib/auth";
import { loginSchema } from "@/schemas/auth.schema";


export async function POST(req: NextRequest) {
  try {
    // Get request body
    const body = await req.json();

    // Validate using Zod
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    // Extract validated data
    const { email, password } = result.data;

    // Find user by email
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    // User not found
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    // Verify password
    const isValid = await comparePassword(
      password,
      user.password
    );

    if (!isValid) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    // Generate JWT token
    const token = generateToken(user.id,user.role);

    // Create response
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    // Set HttpOnly cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);

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