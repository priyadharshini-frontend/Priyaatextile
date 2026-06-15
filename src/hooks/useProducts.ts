import { useEffect } from "react";
import { productService } from "@/services/product.service";
import { useProductStore } from "@/store/ProductStore";

export function useProducts() {
  const setProducts = useProductStore((s) => s.setProducts);
  const setLoading = useProductStore((s) => s.setLoading);
  const search=useProductStore((s)=>s.search);
  const sort = useProductStore((s) => s.sort);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await productService.getAll(search,sort);

      setProducts(data.data || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      console.log("HOOK SORT",sort)
    fetchProducts();
  }, [search,sort]);
}