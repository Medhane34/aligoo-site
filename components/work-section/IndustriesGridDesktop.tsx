"use client";
import React from "react";
import { Industry } from "@/app/[lang]/works/IndustriesWeWorkedWith";

export default function IndustriesGridDesktop({ industries = [] }: { industries?: Industry[] }) {
  if (!Array.isArray(industries) || industries.length === 0) return null;
  const row1Industries = industries.slice(0, 6);
  const row2Industries = industries.slice(6, 11);
  const row3Industries = industries.slice(11, 15);

  return (
    <div className="hidden md:flex flex-col items-center text-small gap-4">
      <div className="grid grid-cols-6 gap-x-4 gap-y-6">
        {row1Industries.map((industry, index) => (
          <div
            key={index}
            className="flex items-center justify-center space-x-2 text-center bg-gray-800 rounded-xl p-3 border border-transparent hover:border-purple-500 hover:scale-105 transition-all duration-300 min-h-[60px] max-w-[200px] w-full text-sm"
          >
            <span className="text-lg">{industry.emoji}</span>
            <span className="text-white font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              {industry.name}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-x-4 gap-y-6">
        {row2Industries.map((industry, index) => (
          <div
            key={index}
            className="flex items-center justify-center space-x-2 text-center bg-gray-800 rounded-xl p-3 border border-transparent hover:border-purple-500 hover:scale-105 transition-all duration-300 min-h-[60px] max-w-[200px] w-full text-sm"
          >
            <span className="text-lg">{industry.emoji}</span>
            <span className="text-white font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              {industry.name}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        {row3Industries.map((industry, index) => (
          <div
            key={index}
            className="flex items-center justify-center space-x-2 text-center bg-gray-800 rounded-xl p-3 border border-transparent hover:border-purple-500 hover:scale-105 transition-all duration-300 min-h-[60px] max-w-[200px] w-full text-sm"
          >
            <span className="text-lg">{industry.emoji}</span>
            <span className="text-white font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              {industry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
