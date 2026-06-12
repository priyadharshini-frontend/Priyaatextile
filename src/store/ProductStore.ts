import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  isFeatured: boolean;
  isBestSeller: boolean;
}

interface ProductStore {
  products: Product[];

  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      set({
        products: data.data,
      });
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  },
}));