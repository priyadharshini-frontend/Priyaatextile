import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullname,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      items,
    } = body;

    // Validate required fields
    if (
      !fullname ||
      !phone ||
      !addressLine1 ||
      !city ||
      !state ||
      !postalCode ||
      !country
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields",
        },
        {
          status: 400,
        }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart is empty",
        },
        {
          status: 400,
        }
      );
    }

    let totalAmount = 0;

    const orderItems = [];

    for (const item of items) {
      const product = await db.product.findUnique({
        where: {
          id: item.productId,
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

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            success: false,
            message: `${product.name} is out of stock`,
          },
          {
            status: 400,
          }
        );
      }

      const price = product.salesPrice ?? product.price;

      totalAmount += price * item.quantity;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price,
      });
    }

    return NextResponse.json({
      success: true,
      totalAmount,
      orderItems,
      shippingAddress: {
        fullname,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
      },
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