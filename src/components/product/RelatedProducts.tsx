"use client";

import { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import { Product } from "@/types/product";
import { productService } from "@/services/product.service";

interface Props {
  productId: string;
  categoryId: string;
  subCategoryId?: string;
}

export default function RelatedProducts({
  productId,
  categoryId,
  subCategoryId,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const data = await productService.getRelatedProducts(
        productId,
        categoryId,
        subCategoryId
      );

      setProducts(data);
    }

    load();
  }, [productId, categoryId, subCategoryId]);

  if (products.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-6">
        Related Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}