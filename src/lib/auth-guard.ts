// src/lib/auth-guard.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "./auth";

export async function requireAuth() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = verifyToken(token);

  if (!payload || typeof payload === "string") {
    redirect("/login");
  }

  return payload;
}

export async function requireAdmin() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = verifyToken(token);

  if (!payload || typeof payload === "string") {
    redirect("/login");
  }

  if ((payload as any).role !== "ADMIN") {
    redirect("/");
  }

  return payload;
}