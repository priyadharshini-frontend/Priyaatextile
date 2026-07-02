import { NextResponse } from "next/server";
import { createHero, getHeroes } from "@/services/hero.service";

export async function GET() {
  try {
    const heroes = await getHeroes();

    return NextResponse.json({
      success: true,
      data: heroes,
    });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const hero = await createHero(body);

    return NextResponse.json({
      success: true,
      data: hero,
    });
  } catch(error) {
    return NextResponse.json(
      { success: false,
        error:error
       },
      { status: 500 },
     
    );
  }
}