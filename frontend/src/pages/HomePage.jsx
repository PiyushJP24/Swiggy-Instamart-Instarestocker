import React from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import FloatingCartBar from "../components/FloatingCartBar";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORY_TILES } from "../mock";

// Screen 1 — product grid / storefront
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pb-40 md:pb-28">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pt-4 md:px-6">
        {/* Product grid: 2 cols mobile, up to 5 on desktop */}
        <section className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>

        {/* Summer Store */}
        <section className="mt-10">
          <h2 className="mb-4 text-[20px] font-extrabold text-gray-900">Summer Store</h2>
          <div className="grid grid-cols-4 gap-3 md:max-w-3xl">
            {CATEGORY_TILES.map((c) => (
              <button key={c.id} className="group flex flex-col items-center">
                <div
                  className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl p-3 transition-transform group-hover:-translate-y-1"
                  style={{ backgroundColor: c.bg }}
                >
                  <img
                    src={c.image}
                    alt={c.label}
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
                <span className="mt-2 text-center text-[12px] font-semibold leading-tight text-gray-700">
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Free delivery banner */}
        <section className="mt-10">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm md:max-w-3xl">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[#0c831f]">
              <span className="text-[12px] font-extrabold lowercase text-[#0c831f]">one</span>
            </div>
            <p className="text-[14px] font-medium text-gray-700">
              Add items worth <span className="font-bold text-gray-900">₹68</span> &amp; unlock{" "}
              <span className="font-extrabold text-gray-900">FREE DELIVERY</span>
            </p>
          </div>
        </section>
      </main>

      <FloatingCartBar />
      <BottomNav active="instamart" />
    </div>
  );
}
