// components/IndustriesWeWorkedWith.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

import { SectionHeading, AccentText } from "@/components/ui/typography";

// Define your industry data with emojis
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
  { name: "Travel & Hospitality", emoji: "✈️" }, // Added for more rows
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
  // Split industries into groups for specific row column counts
  const row1Industries = industries.slice(0, 6); // First 6 for 6 columns
  const row2Industries = industries.slice(6, 11); // Next 5 for 5 columns
  const row3Industries = industries.slice(11, 15); // Next 4 for 4 columns (adjust slice if you have more)

  return (
    <section className="bg-background-light dark:bg-background-dark py-16 md:py-24  overflow-hidden text-text-light dark:text-text-dark">
      <motion.div
        className="container mx-auto px-4 text-center mb-12 md:mb-16"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="visible"
      >
        {/* Section Intro Copy */}
        <motion.div variants={textVariants}>
          <SectionHeading className="text-heading uppercase">
            WHO WE’VE HELPED{" "}
          </SectionHeading>
        </motion.div>
        <motion.div
          className="text-heading pb-2 xs:pb-1 sm:pb-4"
          variants={textVariants}
        >
          <AccentText className="normal-case">
            {" "}
            From Startups to Established Giants — We&apos;ve Been There
          </AccentText>
        </motion.div>
      </motion.div>

      {/* Industries Grid - Designed for specific row column counts */}
      <div className="flex flex-col 
      xl:gap-1 lg:gap-1 xs:gap-4 md:gap-6 // row gap 
       items-center text-small">
        {" "}
        {/* Use flex column to stack rows, center them */}
        {/* Row 1: 6 Columns */}
        <div
          className="
            grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6
            xl:gap-x-1 lg:gap-x-1 md:gap-x-6 md:gap-y-6 // Specific gap for the column and row
            px-4 // Keep initial padding for mobile view
            -mx-4 xs:-mx-4 sm:-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 // Negative margins for bleed effect
            justify-items-center
          "
        >
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
              <span className="text-subheading">
                {" "}
                {/* Smaller emoji for inline */}
                {industry.emoji}
              </span>
              <p className="text-white
              xl:text-body lg:text-body md:text-body sm:text-body xs:text-body // font-size
              md:text-base font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis p-2.5 sm:p-3">
                {" "}
                {/* Prevent text wrap */}
                {industry.name}
              </p>
            </div>
          ))}
        </div>
        {/* Row 2: 5 Columns */}
        <div
          className="
           grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5
           xl:gap-x-1 lg:gap-x-1 md:gap-x-6 md:gap-y-6 // Specific gap for the column and row
            px-2 py-1.5 px-4 // Keep initial padding for mobile view
            -mx-4 xs:-mx-4 sm:-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 // Negative margins for bleed effect
            justify-items-center
          "
        >
          {row2Industries.map((industry, index) => (
            <div
              key={index}
              className="
                flex items-center justify-center space-x-2 text-center
                bg-gray-800 rounded-xl 
                xl:p-1 md:p-4 px-2 py-1.5 //padding for industry items 
                border border-transparent
                hover:border-purple-500 hover:scale-105 transition-all duration-300 ease-in-out
                min-h-[60px] max-w-[200px] w-full 
              "
            >
              <span className="text-subheading">{industry.emoji}</span>
              <p className="text-white 
              xl:text-body lg:text-body md:text-body sm:text-body xs:text-body // font-size
               md:text-base font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis p-2.5 sm:p-3 text-subheading">
                {industry.name}
              </p>
            </div>
          ))}
        </div>
        {/* Row 3: 4 Columns */}
        <div
          className="
            grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4
            xl:gap-x-1 lg:gap-x-1 md:gap-x-6 md:gap-y-6 // Specific gap for the column and row
            px-4 // Keep initial padding for mobile view
            -mx-4 xs:-mx-4 sm:-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 // Negative margins for bleed effect
            justify-items-center
          "
        >
          {row3Industries.map((industry, index) => (
            <div
              key={index}
              className="
                flex items-center justify-center space-x-2 text-center
                bg-gray-800 rounded-xl 
                xl:p-1 md:p-4 px-2 py-1.5 //padding for industry items 
                border border-transparent
                hover:border-purple-500 hover:scale-105 transition-all duration-300 ease-in-out
                min-h-[60px] max-w-[200px] w-full
              "
            >
              <span className="text-subheading">{industry.emoji}</span>
              <p className="text-white 
              xl:text-body lg:text-body md:text-body sm:text-body xs:text-body // font-size
              md:text-base font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis p-2.5 sm:p-3">
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
