"use server";

import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import db from "./db";
import { JwtPayload } from "jsonwebtoken";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = verifyToken(token);

  // ✅ type guard
  if (typeof decoded === "string") return null;

  const payload = decoded as JwtPayload & { userId: string };

  if (!payload.userId) return null;

  const user = await db.user.findUnique({
    where: { id: payload.userId },
  });

  return user;
}