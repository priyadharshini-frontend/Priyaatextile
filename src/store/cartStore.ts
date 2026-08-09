import { create } from "zustand";
import { getCart } from "@/services/cart.service";

type CartStore = {
  cartCount: number;
  setCartCount: (count: number) => void;
  refreshCartCount: () => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,

  setCartCount: (count) =>
    set({ cartCount: count }),

  refreshCartCount: async () => {
    try {
      const response = await getCart();

      if (response.success) {
        const items = response.data?.items || [];

        const count = items.reduce(
          (total: number, item: any) =>
            total + item.quantity,
          0
        );

        set({ cartCount: count });
      }
    } catch (error) {
      console.error("Cart count error:", error);
    }
  },
}));