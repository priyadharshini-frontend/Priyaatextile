import { CartItem } from "@/types/cart";

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Premium Kanjivaram Saree",
    price: 2499,
    originalPrice: 3332,
    quantity: 1,
    image: "",
    color: "Red",
    size: "Free Size",
  },
];

export const VALID_PROMO = "SAVE10";
export const PROMO_DISCOUNT_RATE = 0.1;
export const TAX_RATE = 0.12;
export const FREE_SHIPPING_THRESHOLD = 5000;
export const SHIPPING_FEE = 99;