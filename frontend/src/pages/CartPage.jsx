import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, GripHorizontal } from "lucide-react";
import Header from "../components/Header";
import QtyStepper from "../components/QtyStepper";
import RestockerCard from "../components/RestockerCard";
import { useCart } from "../context/CartContext";
import { getRestockPredictions } from "../mock";

// Screen 2 (collapsed) + Screen 3 (expanded InstaRestocker)
export default function CartPage() {
  const navigate = useNavigate();
  const { detailedCart, totals, removeItem, clearCart } = useCart();
  const [expanded, setExpanded] = useState(false);
  const predictions = getRestockPredictions();
  const shown = expanded ? predictions : predictions.slice(0, 2);

  const freeDeliveryGap = Math.max(0, 68 - totals.subtotal);

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-28 md:pb-10">
      <Header title="Your Cart" showBack />

      <main className="mx-auto max-w-6xl px-4 pt-4 md:grid md:grid-cols-[1fr_360px] md:gap-6 md:px-6">
        {/* LEFT column */}
        <div>
          {/* saved banner */}
          <div className="rounded-xl bg-[#dff5e3] px-4 py-3 text-[13px] font-medium text-gray-700">
            <span className="font-bold text-[#0c831f]">₹{Math.max(11, totals.savings)} saved!</span>{" "}
            {freeDeliveryGap > 0 ? (
              <>Add items worth <span className="font-bold text-gray-900">₹{freeDeliveryGap}</span> to get Free Delivery</>
            ) : (
              <>You&apos;ve unlocked <span className="font-bold text-gray-900">FREE DELIVERY</span></>
            )}
          </div>

          {/* review items */}
          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-gray-900">Review Items</h2>
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-[13px] font-semibold text-gray-500 transition hover:text-[#e23744]"
              >
                Clear cart <Trash2 size={14} />
              </button>
            </div>

            {detailedCart.length === 0 && (
              <p className="py-6 text-center text-[14px] text-gray-400">Your cart is empty.</p>
            )}

            <div className="divide-y divide-gray-100">
              {detailedCart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-gray-400">{item.weight}</p>
                  </div>
                  <QtyStepper id={item.id} size="md" />
                  <div className="w-14 text-right">
                    {item.mrp > item.price && (
                      <span className="block text-[11px] text-gray-400 line-through">₹{item.mrp * item.qty}</span>
                    )}
                    <span className="text-[14px] font-bold text-gray-900">₹{item.price * item.qty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* InstaRestocker */}
          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mx-auto mb-2 flex w-full flex-col items-center"
              aria-label="Expand restocker"
            >
              <GripHorizontal size={22} className="text-gray-300" />
            </button>
            <h3 className="text-center text-[19px] font-extrabold text-gray-900">
              Are you forgetting something?
            </h3>
            <p className="mb-4 text-center text-[15px] font-semibold text-gray-500">
              Stock up before you run out!
            </p>

            <div
              className={`grid grid-cols-2 gap-3 ${
                expanded ? "max-h-[520px] overflow-y-auto no-scrollbar" : ""
              }`}
            >
              {shown.map((it) => (
                <RestockerCard key={it.id} item={it} />
              ))}
            </div>

            {!expanded && predictions.length > 2 && (
              <button
                onClick={() => setExpanded(true)}
                className="mx-auto mt-4 block text-[13px] font-bold text-[#0c831f]"
              >
                Show {predictions.length - 2} more suggestions
              </button>
            )}
          </div>
        </div>

        {/* RIGHT sidebar (desktop bill) */}
        <aside className="mt-4 hidden md:block">
          <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-[16px] font-bold text-gray-900">Bill Summary</h3>
            <div className="space-y-2 text-[14px] text-gray-600">
              <div className="flex justify-between"><span>Item total</span><span>₹{totals.subtotal}</span></div>
              <div className="flex justify-between"><span>Savings</span><span className="text-[#0c831f]">-₹{totals.savings}</span></div>
              <div className="flex justify-between"><span>Handling Fee</span><span>₹5</span></div>
            </div>
            <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-[16px] font-bold text-gray-900">
              <span>To Pay</span><span>₹{totals.subtotal + 5}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full rounded-xl bg-[#0c831f] py-3 text-[15px] font-bold text-white transition-transform active:scale-95 hover:bg-[#0a6d19]"
            >
              Proceed to Pay
            </button>
          </div>
        </aside>
      </main>

      {/* Mobile sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-100 bg-white px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[18px] font-extrabold text-gray-900">₹{totals.subtotal + 5}</p>
            <button className="text-[12px] font-bold text-[#0c831f]">View Detailed Bill</button>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="rounded-xl bg-[#0c831f] px-10 py-3 text-[15px] font-bold text-white transition-transform active:scale-95"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
