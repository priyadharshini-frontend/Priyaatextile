import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shipping,
      productId,
      quantity,
    } = body;

    // -----------------------------
    // Validate Request
    // -----------------------------
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !productId ||
      !quantity
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Verify Razorpay Signature
    // -----------------------------
    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Get Logged In User
    // -----------------------------
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid token",
        },
        {
          status: 401,
        }
      );
    }

    const userId = (payload as any).userId;

    // -----------------------------
    // Get Product
    // -----------------------------
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    // -----------------------------
    // Validate Stock
    // -----------------------------
    if (product.stock < quantity) {
      return NextResponse.json(
        {
          success: false,
          message: "Product out of stock",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Calculate Amount
    // -----------------------------
    const price =
      product.salesPrice ?? product.price;

    const totalAmount = price * quantity;

    // -----------------------------
    // Create Order
    // -----------------------------
    const order = await db.order.create({
      data: {
        userId,

        totalAmount,

        status: "PAID",

        razorpayOrderId: razorpay_order_id,
        paymentId: razorpay_payment_id,

        shippingName: shipping.fullName,
        shippingPhone: shipping.phone,

        shippingAddressLine1: shipping.address,
        shippingAddressLine2: "",

        shippingCity: shipping.city,
        shippingState: shipping.state,
        shippingPostalCode: shipping.pincode,
        shippingCountry: "India",
      },
    });

    // -----------------------------
    // Create Order Item
    // -----------------------------
    await db.orderItem.create({
      data: {
        orderId: order.id,
        productId: product.id,
        quantity,
        price,
      },
    });

    // -----------------------------
    // Update Stock
    // -----------------------------
    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });

    // -----------------------------
    // Success
    // -----------------------------
    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: order.id,
    });

  } catch (error: any) {
    console.error("BUY NOW VERIFY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}