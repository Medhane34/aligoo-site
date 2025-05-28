// components/IndustriesWeWorkedWith.jsx
'use client'
import React from 'react';

// Define your industry data with emojis
const industries = [
  { name: 'Fashion & Apparel', emoji: '🧥' },
  { name: 'Food & Beverage', emoji: '🍽️' },
  { name: 'Health & Wellness', emoji: '🏥' },
  { name: 'Coaching & Personal Brands', emoji: '🧘‍♀️' },
  { name: 'Real Estate & Construction', emoji: '🏠' },
  { name: 'Retail & eCommerce', emoji: '🛍️' },
  { name: 'Education & Online Courses', emoji: '🎓' },
  { name: 'Tech & Startups', emoji: '📱' },
  { name: 'Faith-Based Orgs', emoji: '✝️' },
  { name: 'Beauty & Self-Care', emoji: '🪞' },
  { name: 'Automotive (Coming Soon)', emoji: '🚗' },
  { name: 'Finance (Coming Soon)', emoji: '🏦' },
  { name: 'Travel & Hospitality', emoji: '✈️' }, // Added for more rows
  { name: 'Arts & Culture', emoji: '🎭' },
  { name: 'Sports & Fitness', emoji: '🏀' },
];

const IndustriesWeWorkedWith = () => {
  // Split industries into groups for specific row column counts
  const row1Industries = industries.slice(0, 6); // First 6 for 6 columns
  const row2Industries = industries.slice(6, 11); // Next 5 for 5 columns
  const row3Industries = industries.slice(11, 15); // Next 4 for 4 columns (adjust slice if you have more)

  return (
    <section className="bg-gray-950 py-16 md:py-24  overflow-hidden ">
      <div className="container mx-auto px-4 text-center mb-12 md:mb-16">
        {/* Section Intro Copy */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          We’ve Worked with All Kinds of Awesome
        </h2>
        <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto">
          From solopreneurs to scaling brands, we’ve helped dozens of businesses in different industries stand out, show up, and sell smarter. Here&apos;s just a taste of the industries we&apos;ve collaborated with:
        </p>
      </div>

      {/* Industries Grid - Designed for specific row column counts */}
      <div className="flex flex-col lg:gap-1 xs:gap-4 md:gap-6 items-center text-small"> {/* Use flex column to stack rows, center them */}

        {/* Row 1: 6 Columns */}
        <div className="
            grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6
            xl-gap-2 lg-gap-x-1 md:gap-x-6 md:gap-y-6 // Specific gap for this row
            px-4 // Keep initial padding for mobile view
            -mx-4 xs:-mx-4 sm:-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 // Negative margins for bleed effect
            justify-items-center
          ">
          {row1Industries.map((industry, index) => (
            <div
              key={index}
              className="
                flex items-center justify-center space-x-2 text-center // Align emoji and text horizontally
                bg-gray-800 rounded-xl p-3 xs:p-0 md:p-4 lg:p-1 // Slightly less padding for horizontal layout
                border border-transparent
                hover:border-purple-500 hover:scale-105 transition-all duration-300 ease-in-out
                min-h-[60px] max-w-[200px] w-full // Adjusted min-height for horizontal content, max-width for control
                text-sm
              "
            >
              <span className="text-small"> {/* Smaller emoji for inline */}
                {industry.emoji}
              </span>
              <p className="text-white text-small md:text-base font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis"> {/* Prevent text wrap */}
                {industry.name}
              </p>
            </div>
          ))}
        </div>

        {/* Row 2: 5 Columns */}
        <div className="
            grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5
            gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-6 // Specific gap for this row
            px-4 // Keep initial padding for mobile view
            -mx-4 xs:-mx-4 sm:-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 // Negative margins for bleed effect
            justify-items-center
          ">
          {row2Industries.map((industry, index) => (
            <div
              key={index}
              className="
                flex items-center justify-center space-x-2 text-center
                bg-gray-800 rounded-xl p-3 md:p-4
                border border-transparent
                hover:border-purple-500 hover:scale-105 transition-all duration-300 ease-in-out
                min-h-[60px] max-w-[200px] w-full
              "
            >
              <span className="text-2xl md:text-3xl">
                {industry.emoji}
              </span>
              <p className="text-white text-sm md:text-base font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                {industry.name}
              </p>
            </div>
          ))}
        </div>

        {/* Row 3: 4 Columns */}
        <div className="
            grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4
            gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-6 // Specific gap for this row
            px-4 // Keep initial padding for mobile view
            -mx-4 xs:-mx-4 sm:-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 // Negative margins for bleed effect
            justify-items-center
          ">
          {row3Industries.map((industry, index) => (
            <div
              key={index}
              className="
                flex items-center justify-center space-x-2 text-center
                bg-gray-800 rounded-xl p-3 md:p-4
                border border-transparent
                hover:border-purple-500 hover:scale-105 transition-all duration-300 ease-in-out
                min-h-[60px] max-w-[200px] w-full
              "
            >
              <span className="text-2xl md:text-3xl">
                {industry.emoji}
              </span>
              <p className="text-white text-sm md:text-base font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                {industry.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustriesWeWorkedWith;