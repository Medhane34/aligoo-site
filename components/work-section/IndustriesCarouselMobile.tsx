"use client";
import React from "react";
import { Industry } from "@/app/[lang]/works/IndustriesWeWorkedWith";

export default function IndustriesCarouselMobile({ industries = [] }: { industries?: Industry[] }) {
  if (!Array.isArray(industries) || industries.length === 0) return null;
  return (
    <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2 pt-2">
      <div className="flex gap-3 snap-x snap-mandatory">
        {industries.map((industry, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-2 min-w-[180px] max-w-[220px] text-sm text-white border border-transparent hover:border-purple-500 hover:scale-105 transition-all duration-300"
          >
            <span className="text-lg">{industry.emoji}</span>
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">{industry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
