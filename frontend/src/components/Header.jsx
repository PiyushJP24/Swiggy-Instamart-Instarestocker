import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Zap, ChevronLeft } from "lucide-react";

// Top header. On desktop it also renders inline nav tabs.
export default function Header({ title = "Instamart", showBack = false, subtitle }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 md:px-6">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="grid h-9 w-9 place-items-center rounded-full text-gray-800 transition hover:bg-gray-100"
            aria-label="Back"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-[22px] font-extrabold leading-none tracking-tight text-gray-900">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 text-[13px] font-medium text-gray-500">{subtitle}</p>
          ) : (
            !showBack && (
              <p className="mt-1 flex items-center gap-1 text-[13px] font-semibold text-gray-700">
                <Zap size={13} className="fill-[#ff5200] text-[#ff5200]" />
                11 Mins delivery
              </p>
            )
          )}
        </div>

        {!showBack && (
          <button
            className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
