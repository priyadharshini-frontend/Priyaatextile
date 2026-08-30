"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await db.order.update({
    where: { id: orderId },
    data: { status },
  });

  // Refresh the detail page and the orders list so both reflect the change
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath(`/admin/orders`);

  return { success: true };
}
