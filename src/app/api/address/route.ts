import { NextRequest, NextResponse } from "next/server";
import { addressSchema } from "@/schemas/address.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData =
      addressSchema.safeParse(body);

    return NextResponse.json({
      success: true,
      message: "Address Valid",
      data: validatedData,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.errors?.[0]?.message || "Validation Failed",
      },
      {
        status: 400,
      }
    );
  }
}