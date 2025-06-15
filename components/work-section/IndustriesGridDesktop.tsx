// components/IndustriesWeWorkedWith.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionHeading, AccentText } from "@/components/ui/typography";

const industries = [
  { name: "Fashion & Apparel", emoji: "🧥" },
  { name: "Food & Beverage", emoji: "🍽️" },
  { name: "Health & Wellness", emoji: "🏥" },
  { name: "Coaching & Personal Brands", emoji: "🧘‍♀️" },
  { name: "Real Estate & Construction", emoji: "🏠" },
  { name: "Retail & eCommerce", emoji: "🛍️" },
  { name: "Education & Online Courses", emoji: "🎓" },
  { name: "Tech & Startups", emoji: "📱" },
  { name: "Faith-Based Orgs", emoji: "✝️" },
  { name: "Beauty & Self-Care", emoji: "🪞" },
  { name: "Automotive (Coming Soon)", emoji: "🚗" },
  { name: "Finance (Coming Soon)", emoji: "🏦" },
  { name: "Travel & Hospitality", emoji: "✈️" },
  { name: "Arts & Culture", emoji: "🎭" },
  { name: "Sports & Fitness", emoji: "🏀" },
];

const textVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const IndustriesWeWorkedWith = () => {
  // Split industries into groups for specific row column counts (for desktop)
  const row1Industries = industries.slice(0, 6); // First 6 for 6 columns
  const row2Industries = industries.slice(6, 11); // Next 5 for 5 columns
  const row3Industries = industries.slice(11, 15); // Next 4 for 4 columns

  return (
    <section className="bg-background-light dark:bg-background-dark py-16 md:py-24 overflow-hidden text-text-light dark:text-text-dark">
      
      {/* Mobile: Horizontal Scroll Carousel */}
      <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
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

      {/* Desktop: Original Multi-Row, Multi-Column Grid */}
      <div className="hidden md:flex flex-col items-center text-small gap-4">
        {/* Row 1: 6 Columns */}
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
        {/* Row 2: 5 Columns */}
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
        {/* Row 3: 4 Columns */}
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
    </section>
  );
};

export default IndustriesWeWorkedWith;
