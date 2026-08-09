
"use client";

import { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import EmptyCart from "./EmptyCart";
import { getCart } from "@/services/cart.service";
import { useCartStore } from "@/store/cartStore";


const SHIPPING_FEE = 0;
const FREE_SHIPPING_THRESHOLD = 1000;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

const fetchCart = async () => {
  try {
    setLoading(true);

    const response = await getCart();

    if (response.success) {
      const items = response.data?.items || [];

      setCartItems(items);
    }

    await refreshCartCount();
  } catch (error) {
    console.log("Cart Error:", error);
  } finally {
    setLoading(false);
  }
};

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product?.salesPrice ||
        item.product?.price ||
        0) *
        item.quantity,
    0
  );

 
  const total = subtotal;

  const handleQuantityChange = async (
    cartItemId: string,
    quantity: number
  ) => {
    try {
      if (quantity <= 0) {
        await fetch(`/api/cart/${cartItemId}`, {
          method: "DELETE",
        });

        await fetchCart();
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

      await fetchCart();
    } catch (error) {
      console.log("Quantity Error:", error);
    }
  };

  const removeItem = async (cartItemId: string) => {
    try {
      await fetch(`/api/cart/${cartItemId}`, {
        method: "DELETE",
      });

      await fetchCart();
    } catch (error) {
      console.log("Remove Error:", error);
    }
  };
const refreshCartCount = useCartStore(
  (state) => state.refreshCartCount
);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-dvh w-full sm:max-w-md bg-white z-50 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#1a0f1a]">
              Shopping Cart
            </h2>

            {!loading && cartItems.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "item" : "items"}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-xl"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#8b1e1e] rounded-full animate-spin" />

              <p className="mt-4 text-gray-500 text-sm">
                Loading your cart...
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading && cartItems.length === 0 && (
            <EmptyCart />
          )}

          {/* Cart Items */}
          {!loading && cartItems.length > 0 && (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={{
                    id: item.id,
                    name: item.product?.name,
                    image: item.product?.image,
                    price:
                      item.product?.salesPrice ||
                      item.product?.price ||
                      0,
                    quantity: item.quantity,
                    originalPrice:
                      item.product?.price ||
                      item.product?.salesPrice ||
                      0,
                    color: "",
                    size: "",
                  }}
                  onQuantityChange={(qty: number) =>
                    handleQuantityChange(
                      item.id,
                      qty
                    )
                  }
                  onRemove={() =>
                    removeItem(item.id)
                  }
                  isExpanded={
                    expandedItem === item.id
                  }
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
          )}
        </div>

        {/* Bottom Summary */}
        {!loading && cartItems.length > 0 && (
          <div className="border-t bg-white p-4 shrink-0">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">
                Subtotal
              </span>

              <span className="font-semibold">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold">
                Total
              </span>

              <span className="text-xl font-black text-[#8b1e1e]">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                window.location.href = "/checkout";
              }}
              className="w-full bg-[#8b1e1e] text-white py-3.5 rounded-xl mt-4 font-semibold hover:bg-[#731818] transition"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

