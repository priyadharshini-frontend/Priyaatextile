import { NextResponse } from "next/server";
import { getActiveReels } from "@/services/reels.service";

export async function GET() {
  try {
    const reels = await getActiveReels();

    return NextResponse.json({
      success: true,
      data: reels,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}