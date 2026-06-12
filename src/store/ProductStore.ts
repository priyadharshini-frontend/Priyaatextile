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
  loading:boolean,

  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading:false,

  fetchProducts: async () => {
    try {
      set({loading:true});
      const res = await fetch("/api/products");
      const data = await res.json();

      set({
        products: data.data,
        loading:false,
      });
    } catch (error) {
      console.error("Failed to fetch products", error);
      set({ loading: false });
    }
  },
}));