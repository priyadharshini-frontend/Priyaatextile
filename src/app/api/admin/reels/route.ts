import { NextRequest, NextResponse } from "next/server";
import { getReels, createReel } from "@/services/reels.service";

export async function GET() {
  try {
    const reels = await getReels();

    return NextResponse.json({
      success: true,
      data: reels,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch reels",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const reel = await createReel(body);

    return NextResponse.json({
      success: true,
      data: reel,
      message: "Reel created successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create reel",
      },
      {
        status: 500,
      }
    );
  }
}