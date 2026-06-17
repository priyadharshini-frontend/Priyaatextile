import { CartItem } from "@/types/cart";

interface CartItemCardProps {
  item: CartItem;
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  isExpanded,
  onToggleExpand,
}: CartItemCardProps) {
  const itemTotal = item.price * item.quantity;

  const itemSaved =
    (item.originalPrice - item.price) *
    item.quantity;

  return (
    <div className="group p-6 bg-white rounded-2xl border border-[#eadfce] overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(139,30,30,0.1)] transition-all duration-300">
      <div className="flex gap-6">
        <div className="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400 text-sm">
          Product Image
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#1a0f1a] mb-1">
                {item.name}
              </h3>

              <div className="flex gap-2 flex-wrap text-xs">
                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                  Color: {item.color}
                </span>

                <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                  {item.size}
                </span>
              </div>
            </div>

            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <div className="flex gap-2 items-baseline">
                <p className="text-2xl font-black text-[#8b1e1e]">
                  ₹{itemTotal.toLocaleString("en-IN")}
                </p>

                <p className="text-sm text-gray-400 line-through">
                  ₹{(
                    item.originalPrice *
                    item.quantity
                  ).toLocaleString("en-IN")}
                </p>
              </div>

              <p className="text-xs text-green-500 font-semibold">
                Save ₹
                {itemSaved.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#f9f6f2] rounded-lg p-1">
              <button
                onClick={() =>
                  onQuantityChange(item.quantity - 1)
                }
                className="w-8 h-8 bg-white rounded"
              >
                −
              </button>

              <span className="w-8 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  onQuantityChange(item.quantity + 1)
                }
                className="w-8 h-8 bg-white rounded"
              >
                +
              </button>
            </div>
          </div>

          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: isExpanded
                ? "200px"
                : "0px",
              opacity: isExpanded ? 1 : 0,
            }}
          >
            <div className="pt-4 border-t border-gray-200">
              <p>✓ 100% Authentic</p>
              <p>✓ Free Returns</p>
              <p>✓ Secure Packaging</p>
            </div>
          </div>

          <button
            onClick={onToggleExpand}
            className="text-xs font-semibold text-[#8b1e1e] mt-3"
          >
            {isExpanded
              ? "▼ Hide Details"
              : "▶ Show Details"}
          </button>
        </div>
      </div>
    </div>
  );
}