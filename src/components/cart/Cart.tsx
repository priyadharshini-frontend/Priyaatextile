"use client";

import { useEffect, useState } from "react";

import CartItemCard from "@/components/cart/CartItemCard";
import EmptyCart from "@/components/cart/EmptyCart";
import OrderSummary from "@/components/cart/OrderSummary";
import { getCart } from "@/services/cart.service";

// const TAX_RATE = 0.18;
const SHIPPING_FEE = 0;
const FREE_SHIPPING_THRESHOLD = 1000;

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await getCart();

      if (response.success) {
        setCartItems(response.data?.items || []);
      }
    } catch (error) {
      console.log("Cart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product?.salesPrice || item.product?.price || 0) *
        item.quantity,
    0
  );

  // const tax = Math.round(subtotal * TAX_RATE);

  const shipping =
    subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;

  const total = subtotal + shipping - discount;

  const handleQuantityChange = async (
    cartItemId: string,
    quantity: number
  ) => {
    try {
      if (quantity <= 0) {
        await fetch(`/api/cart/${cartItemId}`, {
          method: "DELETE",
        });

        fetchCart();
        return;
      }

      await fetch(`/api/cart/${cartItemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
        }),
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (cartItemId: string) => {
    try {
      await fetch(`/api/cart/${cartItemId}`, {
        method: "DELETE",
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const applyPromo = () => {
    if (promoCode.trim()) {
      setAppliedPromo(promoCode);
      setPromoCode("");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center  flex-col justify-center">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500">Cart is loading</p>

      </div>
    );
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-20 mt-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#1a0f1a]">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-600">
            {cartItems.length} items · ₹
            {subtotal.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={{
                  id: item.id,
                  name: item.product?.name,
                  image: item.product?.image,
                  price:
                    item.product?.salesPrice ||
                    item.product?.price,
                  quantity: item.quantity,
                  originalPrice: item.product?.price || item.product?.salesPrice || 0,
                    color: "",
                  size: "",
                }}
                onQuantityChange={(qty: number) =>
                  handleQuantityChange(item.id, qty)
                }
                onRemove={() => removeItem(item.id)}
                isExpanded={expandedItem === item.id}
                onToggleExpand={() =>
                  setExpandedItem(
                    expandedItem === item.id
                      ? null
                      : item.id
                  )
                }
              />
            ))}
          </div>

          <OrderSummary
            subtotal={subtotal}
           
            
            total={total}
           
          />
        </div>
      </div>
    </div>
  );
}