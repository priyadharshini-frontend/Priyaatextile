import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";
import { getRazorpay } from "@/lib/razorpay";
const calculateShipping = (
  state: string,
  quantity: number,
  isFirstOrder: boolean
) => {
  if (isFirstOrder) {
    return 0;
  }

  if (!state) {
    return 0;
  }

  const baseShipping =
    state === "Tamil Nadu" ? 75 : 100;

  if (quantity <= 1) {
    return baseShipping;
  }

  return baseShipping + (quantity - 1) * 25;
};

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

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !productId ||
      !quantity ||
      !shipping
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // VERIFY SIGNATURE
    // --------------------------------

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET!
        )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment verification failed",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // USER
    // --------------------------------

    const cookieStore =
      await cookies();

    const token =
      cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized",
        },
        { status: 401 }
      );
    }

    const payload =
      verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid token",
        },
        { status: 401 }
      );
    }

    const userId =
      (payload as any).userId;

    // --------------------------------
    // DUPLICATE CHECK
    // --------------------------------

    const existingOrder =
      await db.order.findFirst({
        where: {
          razorpayOrderId:
            razorpay_order_id,
        },
      });

    if (existingOrder) {
      return NextResponse.json({
        success: true,
        message:
          "Order already processed",
        orderId:
          existingOrder.id,
      });
    }

    // --------------------------------
    // FIRST ORDER
    // --------------------------------

    const previousOrder =
      await db.order.findFirst({
        where: {
          userId,
          status: {
            in: [
              "PAID",
              "SHIPPED",
              "DELIVERED",
            ],
          },
        },
        select: {
          id: true,
        },
      });

    const isFirstOrder =
      !previousOrder;

    // --------------------------------
    // PRODUCT
    // --------------------------------

    const product =
      await db.product.findUnique({
        where: {
          id: productId,
        },
      });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product not found",
        },
        { status: 404 }
      );
    }

    // --------------------------------
    // STOCK
    // --------------------------------

    if (
      product.stock < quantity
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product out of stock",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // PRICE
    // --------------------------------

    const price =
      product.salesPrice ??
      product.price;

    const subtotal =
      price * quantity;

    // --------------------------------
    // SHIPPING
    // --------------------------------

    const shippingAmount =
      calculateShipping(
        shipping.state,
        quantity,
        isFirstOrder
      );

    const totalAmount =
      subtotal + shippingAmount;

    // --------------------------------
    // VERIFY RAZORPAY AMOUNT
    // --------------------------------
   const razorpay = getRazorpay();
    const razorpayOrder =
      await razorpay.orders.fetch(
        razorpay_order_id
      );

    if (
      Number(
        razorpayOrder.amount
      ) !==
      Math.round(
        totalAmount * 100
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payment amount does not match order amount",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // CREATE ORDER
    // --------------------------------

    const order =
      await db.order.create({
        data: {
          userId,

          totalAmount,

          status: "PAID",

          razorpayOrderId:
            razorpay_order_id,

          paymentId:
            razorpay_payment_id,

          shippingName:
            shipping.fullName,

          shippingPhone:
            shipping.phone,

          shippingAddressLine1:
            shipping.address,

          shippingAddressLine2:
            "",

          shippingCity:
            shipping.city,

          shippingState:
            shipping.state,

          shippingPostalCode:
            shipping.pincode,

          shippingCountry:
            "India",

          items: {
            create: {
              productId:
                product.id,

              quantity,

              price,
            },
          },
        },
      });

    // --------------------------------
    // STOCK
    // --------------------------------

    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: {
          decrement:
            quantity,
        },
      },
    });

    return NextResponse.json({
      success: true,

      message:
        "Order placed successfully",

      orderId:
        order.id,

      subtotal,

      shipping:
        shippingAmount,

      total:
        totalAmount,

      isFirstOrder,
    });
  } catch (error: any) {
    console.error(
      "BUY NOW VERIFY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      },
      { status: 500 }
    );
  }
}