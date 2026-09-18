import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import BottomNav from "../components/BottomNav";
import FloatingCartBar from "../components/FloatingCartBar";
import RestockerCard from "../components/RestockerCard";
import { getRestockPredictions } from "../mock";

// Screen 4 — Reorder page (reuses the InstaRestocker card pattern)
export default function ReorderPage() {
  const navigate = useNavigate();
  const predictions = getRestockPredictions();

  return (
    <div className="min-h-screen bg-white pb-40 md:pb-28">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
        <div className="relative mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
          <button
            onClick={() => navigate(-1)}
            className="grid h-9 w-9 place-items-center rounded-full text-gray-800 hover:bg-gray-100"
            aria-label="Back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-extrabold tracking-wide text-gray-900">
            REORDER
          </h1>
        </div>
        {/* tabs */}
        <div className="mx-auto flex max-w-6xl gap-8 px-4 md:px-6">
          <button className="pb-3 text-left leading-tight">
            <span className="block text-[15px] font-extrabold text-[#ff5200]">FOOD</span>
            <span className="block text-[12px] font-semibold text-gray-500">delivery</span>
          </button>
          <button className="relative pb-3 text-left leading-tight">
            <span className="block text-[15px] font-extrabold text-[#9c27b0]">INSTAMART</span>
            <span className="block text-[12px] font-semibold text-gray-500">groceries &amp; more</span>
            <span className="absolute -bottom-px left-0 h-[3px] w-full rounded-full bg-[#9c27b0]" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-4 md:px-6">
        <p className="mb-3 text-[13px] font-semibold text-gray-500">From your previous orders</p>
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
          <h3 className="text-center text-[19px] font-extrabold text-gray-900">
            Are you forgetting something?
          </h3>
          <p className="mb-4 text-center text-[15px] font-semibold text-gray-500">
            Stock up before you run out!
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {predictions.map((it) => (
              <RestockerCard key={it.id} item={it} />
            ))}
          </div>
        </div>
      </main>

      <FloatingCartBar />
      <BottomNav active="reorder" />
    </div>
  );
}
