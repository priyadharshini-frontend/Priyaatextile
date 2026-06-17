import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/curentUser";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    console.log("USER =>", user);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product Id is required",
        },
        {
          status: 400,
        }
      );
    }

    // Check product exists
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

    // Find cart
    let cart = await db.cart.findFirst({
      where: {
        userId: user.id,
      },
    });

    // Create cart if missing
    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: user.id,
        },
      });
    }

    // Check existing item
    const existingItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      const updatedItem = await db.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });

      return NextResponse.json({
        success: true,
        message: "Quantity Updated",
        data: updatedItem,
      });
    }

    const cartItem = await db.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Product Added To Cart",
      data: cartItem,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
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

    const cart = await db.cart.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cart",
      },
      {
        status: 500,
      }
    );
  }
}