// lib/product.ts
import { prisma } from "@/lib/prisma";

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  return product;
}
export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: {
      id,
    },
  });
}