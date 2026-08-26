import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";

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
    } = body;

    // --------------------------------
    // VALIDATION
    // --------------------------------

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !shipping
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // VERIFY RAZORPAY SIGNATURE
    // --------------------------------

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (
      generatedSignature !== razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // GET USER
    // --------------------------------

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Token",
        },
        { status: 401 }
      );
    }

    const userId = (payload as any).userId;

    // --------------------------------
    // PREVENT DUPLICATE ORDER
    // --------------------------------

    const existingOrder =
      await db.order.findFirst({
        where: {
          razorpayOrderId: razorpay_order_id,
        },
      });

    if (existingOrder) {
      return NextResponse.json({
        success: true,
        message: "Order already processed",
        orderId: existingOrder.id,
      });
    }

    // --------------------------------
    // CHECK FIRST ORDER
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

    const isFirstOrder = !previousOrder;

    // --------------------------------
    // GET CART
    // --------------------------------

    const cart = await db.cart.findFirst({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // CALCULATE SUBTOTAL
    // --------------------------------

    const subtotal = cart.items.reduce(
      (sum, item) => {
        const price =
          item.product.salesPrice ??
          item.product.price;

        return sum + price * item.quantity;
      },
      0
    );

    const totalQuantity = cart.items.reduce(
      (total, item) => {
        return total + item.quantity;
      },
      0
    );

    // --------------------------------
    // CALCULATE SHIPPING
    // --------------------------------

    const shippingAmount =
      calculateShipping(
        shipping.state,
        totalQuantity,
        isFirstOrder
      );

    const totalAmount =
      subtotal + shippingAmount;

    // --------------------------------
    // VERIFY RAZORPAY AMOUNT
    // --------------------------------

    const razorpayOrder =
      await db.$queryRaw<
        { amount: number }[]
      >`
        SELECT 0 as amount
      `;

    // --------------------------------
    // CREATE ORDER
    // --------------------------------

    const order = await db.order.create({
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
          create: cart.items.map(
            (item) => ({
              productId:
                item.productId,

              quantity:
                item.quantity,

              price:
                item.product
                  .salesPrice ??
                item.product.price,
            })
          ),
        },
      },

      include: {
        items: true,
      },
    });

    // --------------------------------
    // UPDATE STOCK
    // --------------------------------

    for (const item of cart.items) {
      await db.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement:
              item.quantity,
          },
        },
      });
    }

    // --------------------------------
    // CLEAR CART
    // --------------------------------

    await db.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    console.log(
      "ORDER CREATED:",
      order.id
    );

    return NextResponse.json({
      success: true,
      message:
        "Payment verified successfully",
      orderId: order.id,
      subtotal,
      shipping: shippingAmount,
      total: totalAmount,
      isFirstOrder,
    });
  } catch (error: any) {
    console.error(
      "PAYMENT VERIFY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Payment verification failed",
      },
      { status: 500 }
    );
  }
}