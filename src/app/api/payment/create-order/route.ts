import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";
import { getRazorpay } from "@/lib/razorpay";

function calculateShipping(
  state: string,
  quantity: number,
  isFirstOrder: boolean
) {
  // First order = FREE SHIPPING
  if (isFirstOrder) {
    return 0;
  }

  if (!state) {
    return 0;
  }

  const baseShipping =
    state.trim().toLowerCase() === "tamil nadu"
      ? 75
      : 100;

  if (quantity <= 1) {
    return baseShipping;
  }

  return baseShipping + (quantity - 1) * 25;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("=================================");
    console.log("CREATE PAYMENT ORDER");
    console.log("REQUEST BODY:", body);
    console.log("=================================");

    const {
      buyNow,
      productId,
      quantity,
      state,
    } = body;

    // --------------------------------
    // AUTHENTICATION
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
          message: "Invalid token",
        },
        { status: 401 }
      );
    }

    const userId = (payload as any).userId;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID not found",
        },
        { status: 401 }
      );
    }

    // --------------------------------
    // RAZORPAY
    // --------------------------------

    const razorpay = getRazorpay();

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

    console.log("User ID:", userId);

    console.log(
      "Previous Order:",
      previousOrder?.id || "NONE"
    );

    console.log(
      "Is First Order:",
      isFirstOrder
    );

    // =================================
    // BUY NOW
    // =================================

    if (buyNow === true) {
      console.log("MODE: BUY NOW");

      if (
        !productId ||
        !quantity ||
        quantity < 1
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid product or quantity",
          },
          { status: 400 }
        );
      }

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
            message: "Product not found",
          },
          { status: 404 }
        );
      }

      console.log("BUY NOW PRODUCT:", {
        id: product.id,
        name: product.name,
        price: product.price,
        salesPrice: product.salesPrice,
        stock: product.stock,
      });

      if (product.stock < quantity) {
        return NextResponse.json(
          {
            success: false,
            message: "Product out of stock",
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

      const shipping =
        calculateShipping(
          state || "",
          quantity,
          isFirstOrder
        );

      // --------------------------------
      // TOTAL
      // --------------------------------

      const total =
        subtotal + shipping;

      console.log(
        "BUY NOW SUBTOTAL:",
        subtotal
      );

      console.log(
        "BUY NOW SHIPPING:",
        shipping
      );

      console.log(
        "BUY NOW TOTAL:",
        total
      );

      // --------------------------------
      // RAZORPAY ORDER
      // --------------------------------

      const amountInPaise =
        Math.round(total * 100);

      console.log(
        "RAZORPAY AMOUNT PAISE:",
        amountInPaise
      );

      console.log(
        "RAZORPAY AMOUNT INR:",
        amountInPaise / 100
      );

      const razorpayOrder =
        await razorpay.orders.create({
          amount: amountInPaise,

          currency: "INR",

          receipt: `receipt_${Date.now()}`,
        });

      console.log(
        "RAZORPAY ORDER ID:",
        razorpayOrder.id
      );

      console.log(
        "RAZORPAY ORDER AMOUNT:",
        razorpayOrder.amount
      );

      // --------------------------------
      // RESPONSE
      // --------------------------------

      return NextResponse.json({
        success: true,

        id: razorpayOrder.id,

        amount: razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        subtotal,

        shipping,

        total,

        isFirstOrder,

        buyNow: true,

        productId,

        quantity,
      });
    }

    // =================================
    // CART CHECKOUT
    // =================================

    console.log("MODE: CART CHECKOUT");

    const cart =
      await db.cart.findFirst({
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

    if (
      !cart ||
      cart.items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty",
        },
        { status: 400 }
      );
    }

    console.log(
      "CART ITEMS:",
      cart.items.map((item) => ({
        id: item.id,

        productId:
          item.productId,

        name:
          item.product.name,

        price:
          item.product.salesPrice ??
          item.product.price,

        quantity:
          item.quantity,
      }))
    );

    // --------------------------------
    // SUBTOTAL
    // --------------------------------

    const subtotal =
      cart.items.reduce(
        (sum, item) => {
          const price =
            item.product.salesPrice ??
            item.product.price;

          return (
            sum +
            price * item.quantity
          );
        },
        0
      );

    // --------------------------------
    // TOTAL QUANTITY
    // --------------------------------

    const totalQuantity =
      cart.items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );

    // --------------------------------
    // SHIPPING
    // --------------------------------

    const shipping =
      calculateShipping(
        state || "",
        totalQuantity,
        isFirstOrder
      );

    // --------------------------------
    // FINAL TOTAL
    // --------------------------------

    const total =
      subtotal + shipping;

    console.log(
      "CART SUBTOTAL:",
      subtotal
    );

    console.log(
      "CART QUANTITY:",
      totalQuantity
    );

    console.log(
      "CART SHIPPING:",
      shipping
    );

    console.log(
      "CART TOTAL:",
      total
    );

    // --------------------------------
    // RAZORPAY ORDER
    // --------------------------------

    const amountInPaise =
      Math.round(total * 100);

    console.log(
      "RAZORPAY AMOUNT PAISE:",
      amountInPaise
    );

    console.log(
      "RAZORPAY AMOUNT INR:",
      amountInPaise / 100
    );

    const razorpayOrder =
      await razorpay.orders.create({
        amount: amountInPaise,

        currency: "INR",

        receipt: `receipt_${Date.now()}`,
      });

    console.log(
      "RAZORPAY ORDER:",
      razorpayOrder
    );

    // --------------------------------
    // RESPONSE
    // --------------------------------

    return NextResponse.json({
      success: true,

      id: razorpayOrder.id,

      amount: razorpayOrder.amount,

      currency:
        razorpayOrder.currency,

      subtotal,

      shipping,

      total,

      isFirstOrder,

      buyNow: false,
    });
  } catch (error: any) {
    console.error(
      "CREATE ORDER ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error?.message ||
          "Failed to create Razorpay order",
      },
      {
        status: 500,
      }
    );
  }
}