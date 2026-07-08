import { NextResponse } from "next/server";

export function middleware() {
  console.log("🔥 Middleware executed");
  return NextResponse.next();
}