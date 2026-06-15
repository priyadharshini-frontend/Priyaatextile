import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
//   console.log("Middleware Path:", req.nextUrl.pathname);

  const token = req.cookies.get("token")?.value;
//   console.log("Token exists:", !!token);

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  const decoded = verifyToken(token);

  // Invalid or expired token → redirect to login
  if (!decoded || typeof decoded === "string") {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  const payload = decoded as {
    userId: string;
    role: string;
  };

//   console.log("Decoded Payload:", payload);

  // Only ADMIN can access admin routes
  if (payload.role !== "ADMIN") {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // ADMIN → allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
  ],
};