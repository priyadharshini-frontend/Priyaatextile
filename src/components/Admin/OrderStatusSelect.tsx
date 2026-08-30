"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "./actions";
import type { OrderStatus } from "./actions";

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function OrderStatusSelect({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: OrderStatus;
}) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as OrderStatus;
    const prevStatus = status;

    setStatus(newStatus);
    setError(null);

    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, newStatus);
      } catch (err) {
        // Roll back the UI if the update fails
        setStatus(prevStatus);
        setError("Failed to update status. Try again.");
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <select
        value={status}
        onChange={handleChange}
        disabled={isPending}
        className={`px-4 py-2 rounded-full text-sm font-semibold border-none outline-none cursor-pointer disabled:opacity-60 ${
          statusStyles[status] || "bg-gray-100 text-gray-600"
        }`}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s} className="bg-white text-gray-900">
            {s}
          </option>
        ))}
      </select>

      {isPending && <span className="text-xs text-gray-400">Updating…</span>}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
