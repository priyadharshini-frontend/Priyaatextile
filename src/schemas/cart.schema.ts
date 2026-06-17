// schemas/cart.schema.ts

import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string().min(1),
});

export const updateCartSchema = z.object({
  quantity: z.number().min(1),
});