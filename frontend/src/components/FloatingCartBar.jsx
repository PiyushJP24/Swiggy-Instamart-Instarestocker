import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import { useCart } from "../context/CartContext";
import { IMG } from "../mock";

// Floating cart bar shown above the bottom nav (Screens 1 & 3).
export default function FloatingCartBar({ bottomOffset = "bottom-[58px] md:bottom-4" }) {
  const navigate = useNavigate();
  const { totals, detailedCart } = useCart();

  if (totals.itemCount === 0) return null;
  const thumb = detailedCart[0]?.image || IMG.milk;

  return (
    <div className={`fixed left-0 right-0 z-30 px-3 ${bottomOffset}`}>
      <div className="mx-auto flex max-w-6xl items-center gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-[0_-2px_16px_rgba(0,0,0,0.12)] ring-1 ring-gray-100">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-gray-50">
          <img src={thumb} alt="" className="h-full w-full object-cover" />
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#ff5200] text-[10px] font-bold text-white">
            {totals.itemCount}
          </span>
        </div>
        <div className="flex-1 leading-tight">
          <p className="flex items-center gap-1 text-[15px] font-bold text-gray-900">
            {totals.itemCount} {totals.itemCount === 1 ? "Item" : "Items"} | ₹{totals.subtotal}
            <ChevronUp size={15} className="text-gray-600" />
          </p>
          <p className="text-[12px] font-semibold text-[#0c831f]">
            ₹{totals.savings > 0 ? totals.savings : 11} saved, more coming up!
          </p>
        </div>
        <button
          onClick={() => navigate("/cart")}
          className="rounded-xl bg-[#0c831f] px-5 py-2.5 text-[15px] font-bold text-white shadow-sm transition-transform active:scale-95 hover:bg-[#0a6d19]"
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
}
