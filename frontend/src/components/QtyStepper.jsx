import React from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

// Green quantity stepper used across the app.
// size: "sm" (product card) | "md" (cart rows)
export default function QtyStepper({ id, size = "sm" }) {
  const { getQty, addItem, removeItem } = useCart();
  const qty = getQty(id);

  const dims =
    size === "md"
      ? "h-9 w-[104px] text-[15px]"
      : "h-8 w-[84px] text-[14px]";

  if (qty === 0) {
    return (
      <button
        onClick={() => addItem(id)}
        aria-label="Add item"
        className={`${
          size === "md" ? "h-9 w-[104px]" : "h-8 w-[72px]"
        } grid place-items-center rounded-lg border border-[#0c831f]/40 bg-white font-bold text-[#0c831f] shadow-sm transition-transform active:scale-95 hover:shadow`}
      >
        {size === "md" ? "ADD" : <Plus size={18} strokeWidth={3} />}
      </button>
    );
  }

  return (
    <div
      className={`${dims} flex items-center justify-between rounded-lg bg-[#0c831f] font-bold text-white shadow-sm`}
    >
      <button
        onClick={() => removeItem(id)}
        aria-label="Decrease"
        className="grid h-full w-8 place-items-center transition-transform active:scale-90"
      >
        <Minus size={size === "md" ? 16 : 14} strokeWidth={3} />
      </button>
      <span className="select-none">{qty}</span>
      <button
        onClick={() => addItem(id)}
        aria-label="Increase"
        className="grid h-full w-8 place-items-center transition-transform active:scale-90"
      >
        <Plus size={size === "md" ? 16 : 14} strokeWidth={3} />
      </button>
    </div>
  );
}
