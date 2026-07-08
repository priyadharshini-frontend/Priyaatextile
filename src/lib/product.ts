// lib/product.ts
import db from "./db";

export async function getProductBySlug(slug: string) {
  const product = await db.product.findUnique({
    where: { slug },
  });

  return product;
}
export async function getProductById(id: string) {
  return db.product.findUnique({
    where: {
      id,
    },
  });
}