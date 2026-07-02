export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;

  originalPrice?: number;
  color?: string;
  size?: string;
}