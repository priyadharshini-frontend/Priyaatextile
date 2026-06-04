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

interface DecodedToken extends TokenPayload {
  sessionId: string;
}

export function generateToken(payload: TokenPayload, sessionId: string): string {
  return jwt.sign({ ...payload, sessionId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
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
  const decoded = verifyToken(token);
  if (!decoded || !decoded.sessionId) {
    return null;
  }

  const session = await db.sessions.findUnique({
    where: { id: decoded.sessionId },
  });

  if (!session || session.status === "inactive") {
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

export function generateSessionToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSession(
  userId: string,
  ipAddress: string | null | undefined
): Promise<{ sessionId: string; sessionToken: string }> {
  const sessionId = randomUUID();
  const sessionToken = generateSessionToken();

  await db.sessions.create({
    data: {
      id: sessionId,
      status: "active",
      date_created: new Date(),
      token: sessionToken,
      ip_address: ipAddress ?? null,
    },
  });

  return { sessionId, sessionToken };
}

export async function deleteSession(sessionId: string): Promise<void> {
  await db.sessions.delete({
    where: { id: sessionId },
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
