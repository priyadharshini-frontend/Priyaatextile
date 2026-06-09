
import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import db from "./db";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }
  const decoded = verifyToken(token);

  if (!decoded) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });

  return user;
}