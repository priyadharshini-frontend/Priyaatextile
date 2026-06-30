import { NextRequest, NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { amount } = body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}