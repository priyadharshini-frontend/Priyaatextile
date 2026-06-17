"use client";

import { useState } from "react";

export default function ProductQuantity() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>

      <p className="font-semibold mb-3">
        Quantity
      </p>

      <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setQuantity((q) => Math.max(1, q - 1))
          }
          className="w-10 h-10 border rounded-lg"
        >
          -
        </button>

        <span>{quantity}</span>

        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="w-10 h-10 border rounded-lg"
        >
          +
        </button>

      </div>

    </div>
  );
}