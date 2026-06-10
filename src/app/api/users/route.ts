import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/curentUser";
import { cookies } from "next/headers";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json(user);
  const cookieStore = await cookies();

const token = cookieStore.get("token")?.value;

console.log("TOKEN:", token);

if (!token) {
  return NextResponse.json(
  { message: "User not found" },
  { status: 404 }
);

}
}