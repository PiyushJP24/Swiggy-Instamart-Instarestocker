import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftCircle, ShoppingBag, LayoutGrid, RotateCcw, Tag } from "lucide-react";

const ITEMS = [
  { key: "swiggy", label: "Swiggy", icon: ArrowLeftCircle, path: "/", accent: true },
  { key: "instamart", label: "Instamart", icon: ShoppingBag, path: "/" },
  { key: "categories", label: "Categories", icon: LayoutGrid, path: "/" },
  { key: "reorder", label: "Reorder", icon: RotateCcw, path: "/reorder" },
  { key: "offers", label: "Offers", icon: Tag, path: "/" },
];

// Mobile bottom nav (hidden on desktop where we surface tabs in the header row).
export default function BottomNav({ active = "instamart" }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white md:hidden">
      <div className="mx-auto flex max-w-6xl items-stretch justify-between px-2">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          const isActive =
            it.key === active ||
            (it.path !== "/" && location.pathname === it.path);
          const color = it.accent
            ? "text-[#ff5200]"
            : isActive
            ? "text-gray-900"
            : "text-gray-400";
          return (
            <button
              key={it.key}
              onClick={() => navigate(it.path)}
              className="flex flex-1 flex-col items-center gap-1 py-2"
            >
              <Icon size={22} className={color} strokeWidth={isActive ? 2.4 : 2} />
              <span className={`text-[11px] font-semibold ${color}`}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
