// components/IndustriesCarouselMobile.tsx
"use client";
import React from "react";

const industries = [
  { name: "Fashion & Apparel", emoji: "🧥" },
  { name: "Food & Beverage", emoji: "🍽️" },
  { name: "Health & Wellness", emoji: "🏥" },
  { name: "Coaching & Personal Brands", emoji: "🧘‍♀️" },
  { name: "Real Estate & Construction", emoji: "🏠" },
  { name: "Retail & eCommerce", emoji: "🛍" },
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

const IndustriesCarouselMobile = () => (
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

export default IndustriesCarouselMobile;
