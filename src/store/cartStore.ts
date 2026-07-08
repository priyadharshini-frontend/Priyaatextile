import { create } from "zustand";

type CartStore = {
  cartCount: number;
  setCartCount: (count: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,
  setCartCount: (count) =>
    set({ cartCount: count }),
}));