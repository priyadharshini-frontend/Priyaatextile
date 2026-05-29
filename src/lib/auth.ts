import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import db from "./db";
import { randomUUID } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export interface TokenPayload {
  userId: string;
  email: string;
  role?: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role?: string;
}

export async function validateSession(token: string): Promise<AuthUser | null> {
  const session = await db.sessions.findUnique({
    where: { id: token },
  });

  if (!session || session.status === "inactive") {
    return null;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }

  const user = await db.users.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    role: undefined,
  };
}

export async function createSession(
  token: string,
  ipAddress: string | null | undefined
): Promise<void> {
  await db.sessions.create({
    data: {
      id: token,
      status: "active",
      date_created: new Date(),
      token: token,
      ip_address: ipAddress ?? null,
    },
  });
}

export async function deleteSession(token: string): Promise<void> {
  await db.sessions.delete({
    where: { id: token },
  });
}

export function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

export async function requireAuth(
  req: NextRequest
): Promise<AuthUser | null> {
  const token = extractToken(req);
  if (!token) {
    return null;
  }
  return validateSession(token);
}

export async function requireAdmin(
  req: NextRequest
): Promise<AuthUser | null> {
  const user = await requireAuth(req);
  if (!user) {
    return null;
  }
  if (user.role !== "admin") {
    return null;
  }
  return user;
}
