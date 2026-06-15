import { create } from "zustand";
import { Product } from "@/types/product";
interface ProductStore {
  products: Product[];
  loading:boolean,
  search:string, 
  setSearch:(value:string)=>void;

  sort:string,
  setSort:(sort:string)=>void;


  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;


}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading:false,
  search:"",

    sort: "featured", // ✅ initial value
  setSort: (sort) => set({ sort }), // ✅ action
  
  setSearch:(value)=>set({search:value}),
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  

 
}));