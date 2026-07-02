
import { NextResponse } from "next/server";
import { updateHero, deleteHero, getHeroById } from "@/services/hero.service";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const hero = await getHeroById(id);

  return NextResponse.json(hero);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const hero = await updateHero(id, body);

  return NextResponse.json(hero);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await deleteHero(id);

  return NextResponse.json({
    success: true,
  });
}
