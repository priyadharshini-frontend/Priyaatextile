import { useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { productService } from "@/services/product.service";
import { useProductStore } from "@/store/ProductStore";

export function useProducts() {
  const searchParams = useSearchParams();

  const setProducts = useProductStore((s) => s.setProducts);
  const setLoading = useProductStore((s) => s.setLoading);

  const search = useProductStore((s) => s.search);
  const sort = useProductStore((s) => s.sort);

  const category = searchParams.get("category") || "";
  const subcategory = searchParams.get("subcategory") || "";
  const type = searchParams.get("type") || "";
const sale = searchParams.get("sale") || "";
const featured = searchParams.get("featured") || "";

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await productService.getAll(
        search,
        sort,
        category,
        subcategory,
         type,
  sale,
  featured
        
      );

      setProducts(data.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [
    search,
  sort,
  category,
  subcategory,
  type,
  sale,
  featured,
  setLoading,
  setProducts,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
}