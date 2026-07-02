import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import db from "@/lib/db";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
  console.log("BODY:", body);
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shipping,
       buyNow,
  productId,
  quantity,
    } = body;
    // console.log("Shipping:", shipping);

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
        },
        { status: 400 }
      );
    }


    // ✅ 3. GET LOGGED-IN USER (PUT IT HERE)

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

console.log("USER ID:", userId);
  // 4.READ CART
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

console.log("Cart:", cart);
const totalAmount = cart.items.reduce((sum, item) => {
  const price = item.product.salesPrice ?? item.product.price;
  return sum + price * item.quantity;
}, 0);

// console.log("Total Amount:", totalAmount);



    // 5.create order
    

const order = await db.order.create({
    include: {
    user: true,
  },
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

// console.log("ORDER CREATED:", order);



// const emailResult=await sendOrderConfirmationEmail({
//   to: order.user.email,
//   customerName: order.shippingName,
//   orderId: order.id,
//   totalAmount: order.totalAmount,
// });


await db.orderItem.createMany({
  data: cart.items.map((item) => ({
    orderId: order.id,
    productId: item.productId,
    quantity: item.quantity,
    price: item.product.salesPrice ?? item.product.price,
  })),
});
for (const item of cart.items) {
  await db.product.update({
    where: {
      id: item.productId,
    },
    data: {
      stock: {
        decrement: item.quantity,
      },
    },
  });
}

console.log("STOCK UPDATED");

await db.cartItem.deleteMany({
  where: {
    cartId: cart.id,
  },
});

console.log("CART CLEARED");

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      orderId: order.id,
    });




  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }




}