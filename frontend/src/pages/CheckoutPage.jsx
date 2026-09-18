import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

const TIP_OPTIONS = [
  { value: 10, label: "₹10" },
  { value: 20, label: "₹20", tag: "Most Tipped" },
  { value: 30, label: "₹30" },
];

// Screen 5 — Checkout / bill summary
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { totals } = useCart();
  const [tip, setTip] = useState(0);

  const mrpTotal = totals.mrpTotal || 545;
  const savings = totals.savings || 43;
  const subtotal = totals.subtotal || (mrpTotal - savings);
  const handling = 5;
  const deliveryFee = 30; // waived with Swiggy One
  const originalToPay = subtotal + handling + deliveryFee + tip;
  const toPay = subtotal + handling + tip;

  return (
    <div className="min-h-screen bg-[#f0f0f0] pb-28">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2.5">
          <button
            onClick={() => navigate(-1)}
            className="grid h-9 w-9 place-items-center rounded-full text-gray-800 hover:bg-gray-100"
            aria-label="Back"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="leading-tight">
            <p className="text-[11px] text-gray-400">Your Cart</p>
            <p className="flex items-center gap-1 text-[14px] font-bold text-gray-900">
              14 mins to HOME
              <span className="font-normal text-gray-400">| C-17 Sai appartment sector 13...</span>
              <ChevronDown size={15} className="text-gray-500" />
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-3">
        {/* saved banner */}
        <div className="rounded-xl bg-[#dff5e3] px-4 py-3 text-[13px] font-medium text-gray-700">
          <span className="font-bold text-[#0c831f]">₹{savings + deliveryFee} saved!</span> on this order,
          including <span className="font-bold text-[#0c831f]">₹16</span> with Swiggy One!
        </div>

        {/* tip card */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <p className="max-w-[75%] text-[13px] font-medium text-gray-600">
            A small tip, a big gesture! Tip your delivery partner to show your appreciation for their hard work.
          </p>
          <div className="mt-4 flex gap-3">
            {TIP_OPTIONS.map((t) => {
              const active = tip === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => setTip(active ? 0 : t.value)}
                  className={`relative flex-1 rounded-xl border py-2.5 text-[15px] font-bold transition ${
                    active
                      ? "border-[#0c831f] bg-[#eafaf0] text-[#0c831f]"
                      : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
                  }`}
                >
                  {t.label}
                  {t.tag && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#ff5200] px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {t.tag}
                    </span>
                  )}
                </button>
              );
            })}
            <button className="flex-1 rounded-xl border border-gray-200 bg-white py-2.5 text-[15px] font-bold text-gray-800 hover:border-gray-300">
              Other
            </button>
          </div>
        </div>

        {/* bill details */}
        <div className="mt-4">
          <h3 className="mb-2 text-[16px] font-bold text-gray-900">Bill Details</h3>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <Row label="MRP Total" value={`₹${mrpTotal}`} />
            <Row label="Item Savings" value={`-₹${savings}`} valueClass="text-[#0c831f]" />
            <Row label="Handling Fee (incl GST)" value={`₹${handling}`} underline />
            <div className="my-2 border-t border-dashed border-gray-200" />
            <Row
              label="Delivery Tip"
              value={tip > 0 ? `₹${tip}` : "Add a tip"}
              valueClass={tip > 0 ? "text-gray-900" : "text-[#ff5200] font-semibold"}
            />
            <div className="flex items-center justify-between py-1.5 text-[14px]">
              <span className="text-gray-600 underline decoration-dotted underline-offset-2">
                <span className="font-extrabold text-[#0c831f]">one</span> Delivery Partner Fee
              </span>
              <span className="text-gray-500">
                <span className="line-through">₹{deliveryFee}</span>{" "}
                <span className="font-bold text-[#0c831f]">FREE</span>
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3 text-[16px] font-bold text-gray-900">
              <span>To Pay</span>
              <span>
                <span className="mr-1.5 text-[14px] font-normal text-gray-400 line-through">
                  ₹{originalToPay}
                </span>
                ₹{toPay}
              </span>
            </div>
          </div>
        </div>

        {/* cancellation note */}
        <h3 className="mt-5 text-[16px] font-bold text-gray-900">
          Review your order to avoid cancellations
        </h3>
        <div className="mt-2 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-[13px] text-gray-600">
            <span className="font-bold text-[#e23744]">NOTE:</span> Orders cannot be cancelled and are
            non-refundable once packed for delivery.
          </p>
          <button className="mt-2 text-[13px] font-bold text-[#ff5200]">
            Read Cancellation Policy
          </button>
        </div>
      </main>

      {/* footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div>
            <p className="text-[18px] font-extrabold text-gray-900">₹{toPay}</p>
            <button className="text-[12px] font-bold text-[#0c831f]">View Detailed Bill</button>
          </div>
          <button
            onClick={() => toast.success("Order placed!", { description: `Paying ₹${toPay} — arriving in 14 mins.` })}
            className="rounded-xl bg-[#0c831f] px-10 py-3.5 text-[15px] font-bold text-white transition-transform active:scale-95 hover:bg-[#0a6d19]"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = "text-gray-900", underline }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-[14px]">
      <span className={`text-gray-600 ${underline ? "underline decoration-dotted underline-offset-2" : ""}`}>
        {label}
      </span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}
