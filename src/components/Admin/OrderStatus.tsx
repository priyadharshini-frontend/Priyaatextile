"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

interface Props {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatus({
  orderId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateStatus = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Order status updated successfully");
        router.refresh();

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3 items-center">

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="PENDING">PENDING</option>
        <option value="PAID">PAID</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="DELIVERED">DELIVERED</option>
      
      </select>

      <button
        onClick={updateStatus}
        disabled={loading}
        className="bg-[#7A1F3D] text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Saving..." : "Save"}
      </button>

    </div>
  );
}