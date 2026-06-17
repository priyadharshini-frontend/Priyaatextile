type CartStore = {
  cart: any;

  fetchCart: () => Promise<void>;

  addToCart: (
    productId: string
  ) => Promise<void>;

  removeItem: (
    id: string
  ) => Promise<void>;
};