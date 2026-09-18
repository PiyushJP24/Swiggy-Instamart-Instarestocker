import React from "react";
import QtyStepper from "./QtyStepper";

// Product card for the grid (Screen 1).
export default function ProductCard({ product }) {
  const { id, name, brand, weight, price, mrp, discount, image } = product;
  const showStrike = mrp > price;

  return (
    <div className="im-fade-up flex flex-col">
      <div className="relative mb-2 aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-white">
        {discount > 0 && (
          <div className="absolute left-0 top-0 z-10 rounded-br-lg rounded-tl-2xl bg-[#ff5200] px-1.5 py-1 text-center leading-none text-white">
            <span className="block text-[11px] font-extrabold">{discount}%</span>
            <span className="block text-[9px] font-semibold">OFF</span>
          </div>
        )}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute -bottom-3 right-2">
          <QtyStepper id={id} size="sm" />
        </div>
      </div>

      <div className="mt-2 flex-1">
        <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-gray-800">
          {brand} {name.replace(brand, "").trim()}
        </p>
        <p className="mt-1 text-[12px] text-gray-400">{weight}</p>
        <div className="mt-0.5 flex items-baseline gap-1.5">
          <span className="text-[14px] font-bold text-gray-900">₹{price}</span>
          {showStrike && (
            <span className="text-[12px] text-gray-400 line-through">₹{mrp}</span>
          )}
        </div>
      </div>
    </div>
  );
}
