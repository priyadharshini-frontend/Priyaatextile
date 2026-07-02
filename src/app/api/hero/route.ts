import { NextResponse } from "next/server";
import { getActiveHero } from "@/services/hero.service";

export async function GET() {
  try {
    const hero = await getActiveHero();

    return NextResponse.json({
      success: true,
      data: hero,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}