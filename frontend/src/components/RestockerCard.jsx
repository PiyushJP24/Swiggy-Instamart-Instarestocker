import React, { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { Sheet, SheetContent } from "./ui/sheet";
import QtyStepper from "./QtyStepper";
import { useCart } from "../context/CartContext";

const toneMap = {
  danger: "text-[#e23744]",
  warn: "text-[#e85d04]",
  info: "text-[#e85d04]",
};

// Reusable InstaRestocker prediction card (Screens 2, 3, 4).
export default function RestockerCard({ item }) {
  const [open, setOpen] = useState(false);
  const { getQty, addItem, removeItem } = useCart();
  const hasOptions = item.options && item.options.length > 1;
  const showStrike = item.mrp > item.price;
  const toneClass = toneMap[item.tone] || toneMap.warn;

  return (
    <div className="relative flex flex-col rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm">
      {/* status line */}
      <p className="mb-1 text-[12px] font-semibold text-gray-800">
        Last Bought : <span className="text-[#e85d04]">{item.lastBoughtLabel}</span>
      </p>
      <p className={`mb-2 text-[12px] font-semibold ${toneClass}`}>
        {item.statusText} <span className="font-bold">{item.statusHighlight}</span>
      </p>

      {/* image + badges */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
        {item.discount > 0 && (
          <div className="absolute left-0 top-0 z-10 rounded-br-lg rounded-tl-xl bg-[#ff5200] px-1.5 py-1 text-center leading-none text-white">
            <span className="block text-[11px] font-extrabold">{item.discount}%</span>
            <span className="block text-[9px] font-semibold">OFF</span>
          </div>
        )}
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-[#f5e6c8] px-1.5 py-0.5 text-[9px] font-semibold text-[#7a5c1e]">
          Previously Bought
        </span>
      </div>

      {/* details */}
      <div className="mt-2 flex-1">
        <p className="text-[12px] text-gray-400">{item.brand}</p>
        <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-gray-800">
          {item.name}
        </p>
      </div>

      {/* price + action */}
      <div className="mt-2 flex items-end justify-between">
        <div>
          <p className="text-[12px] text-gray-400">{item.weight}</p>
          <div className="flex items-baseline gap-1.5">
            {showStrike && (
              <span className="text-[11px] text-gray-400 line-through">₹{item.mrp}</span>
            )}
            <span className="text-[15px] font-bold text-gray-900">₹{item.price}</span>
          </div>
        </div>

        {hasOptions ? (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 rounded-lg border border-[#0c831f]/40 bg-white px-2.5 py-1.5 text-[12px] font-bold text-[#0c831f] shadow-sm transition-transform active:scale-95"
          >
            {item.options.length} options <ChevronDown size={14} />
          </button>
        ) : (
          <QtyStepper id={item.id} size="md" />
        )}
      </div>

      {/* options bottom sheet (Screen 4) */}
      {hasOptions && (
        <OptionsSheet
          open={open}
          onClose={() => setOpen(false)}
          item={item}
          getQty={getQty}
          addItem={addItem}
          removeItem={removeItem}
        />
      )}
    </div>
  );
}

function OptionsSheet({ open, onClose, item, getQty, addItem, removeItem }) {
  const [selected, setSelected] = useState(0);
  const total = item.options.reduce((s, o, i) => {
    const oid = `${item.id}-opt-${i}`;
    return s + o.price * (getQty(oid) || 0);
  }, 0);

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="rounded-t-3xl p-0">
        <div className="mx-auto max-w-lg p-5">
          <h3 className="text-[17px] font-bold leading-snug text-gray-900">
            {item.brand} {item.name}
          </h3>
          <div className="mt-4 space-y-3">
            {item.options.map((o, i) => {
              const oid = `${item.id}-opt-${i}`;
              const qty = getQty(oid);
              return (
                <div
                  key={i}
                  onClick={() => setSelected(i)}
                  className="flex items-center gap-3 rounded-2xl bg-gray-50 p-2.5"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                    {o.discount > 0 && (
                      <span className="absolute left-0 top-0 rounded-br-md bg-[#ff5200] px-1 text-[8px] font-bold text-white">
                        {o.discount}%
                      </span>
                    )}
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-gray-800">{o.weight}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[14px] font-bold text-gray-900">₹{o.price}</span>
                      {o.mrp > o.price && (
                        <span className="text-[12px] text-gray-400 line-through">₹{o.mrp}</span>
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-[#e85d04]">{o.per}</p>
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => addItem(oid)}
                      className="rounded-lg border border-[#0c831f]/40 bg-white px-4 py-2 text-[13px] font-bold text-[#0c831f] shadow-sm"
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="flex h-9 w-[104px] items-center justify-between rounded-lg bg-[#0c831f] font-bold text-white">
                      <button onClick={() => removeItem(oid)} className="grid h-full w-8 place-items-center">
                        <Minus size={15} strokeWidth={3} />
                      </button>
                      <span>{qty}</span>
                      <button onClick={() => addItem(oid)} className="grid h-full w-8 place-items-center">
                        <Plus size={15} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="mt-5 flex w-full items-center justify-between rounded-2xl bg-[#0c831f] px-5 py-3.5 font-bold text-white shadow-sm transition-transform active:scale-[0.98]"
          >
            <span className="text-[14px]">Item total : ₹{total || item.options[selected].price}</span>
            <span className="text-[15px]">Confirm</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
