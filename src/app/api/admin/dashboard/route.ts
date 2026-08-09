import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function GET() {
  try {
    const [
      productCount,
      orderCount,
      revenueResult,
      recentOrders,
    ] = await Promise.all([
      // Total products
      db.product.count({
        where: {
          isActive: true,
        },
      }),

      // Total orders
      db.order.count(),

      // Revenue from successful orders
      db.order.aggregate({
        _sum: {
          totalAmount: true,
        },
        where: {
          status: {
            in: [
              "PAID",
              "SHIPPED",
              "DELIVERED",
            ],
          },
        },
      }),

      // Latest 5 orders
      db.order.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
        select: {
          id: true,
          totalAmount: true,
          status: true,
          createdAt: true,
          shippingName: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products: productCount,
        orders: orderCount,
        revenue:
          revenueResult._sum.totalAmount || 0,
        recentOrders,
      },
    });
  } catch (error) {
    console.error(
      "Dashboard API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load dashboard data",
      },
      {
        status: 500,
      }
    );
  }
}