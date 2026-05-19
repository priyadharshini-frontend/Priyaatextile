import { create } from "zustand";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
}));