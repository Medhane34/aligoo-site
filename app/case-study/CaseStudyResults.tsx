// components/case-studies/CaseStudyResults.tsx
"use client";
import React from 'react';
import { AccentText, SectionHeading } from "@/components/ui/typography";
import { CaseStudyResultsData, ResultStatItem } from '@/src/sanity/queries'; // Import the types

// Define the props interface for the component
interface CaseStudyResultsData {
  resultsData: CaseStudyResultsData;
}

export default function CaseStudyResults({ resultsData }: CaseStudyResultsProps) {
  // Destructure the data for easier access
  const {
    resultsHeading,
    resultsBody,
    resultsStat1,
    resultsStat2,
    resultsStat3,
  } = resultsData;

  // Debugging: Log the data received by the component
  console.log("CaseStudyResults received resultsData:", resultsData);
  console.log("Results Heading:", resultsHeading);
  console.log("Results Body:", resultsBody);
  console.log("Results Stat 1:", resultsStat1);
  console.log("Results Stat 2:", resultsStat2);
  console.log("Results Stat 3:", resultsStat3);

  // Helper function to render a single stat block
  const renderStatBlock = (stat: ResultStatItem | undefined, index: number) => {
    // Return null if the stat item is undefined or missing essential data
    if (!stat || !stat.value || !stat.label) {
      console.warn(`Results stat block at index ${index} is missing crucial data (value or label). Skipping render.`);
      return null;
    }

    // You can customize colors based on index or add them to Sanity
    const statColors = ["text-blue-600", "text-green-600", "text-purple-600"];
    const currentColor = statColors[index % statColors.length]; // Cycle through colors

    return (
      <div className="text-left">
        <h4 className={`text-5xl lg:text-6xl font-bold ${currentColor}`}>
          {stat.value}
        </h4>
        <h5 className="text-xl md:text-2xl font-semibold text-gray-900 mt-2">
          {stat.label}
        </h5>
        {stat.description && ( // Only render description if it exists
          <p className="text-base text-gray-600 mt-1">
            {stat.description}
          </p>
        )}
      </div>
    );
  };

  // Don't render the entire section if main heading or body is missing
  if (!resultsHeading || !resultsBody) {
    console.warn("CaseStudyResults: Skipping render due to missing heading or body text.");
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-screen-xl mx-auto">
        {/* Two-Column Grid for Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Left Column: Main Narrative */}
          <div>
            <AccentText className="text-left md:text-left">The Outcome</AccentText> {/* Hardcoded as per schema */}
            <SectionHeading className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mt-2 text-left md:text-left">
              {resultsHeading}
            </SectionHeading>
            <p className="text-lg md:text-xl text-gray-700 mt-6 leading-relaxed text-left md:text-left">
              {resultsBody}
            </p>
          </div>

          {/* Right Column: Vertically Listed Stats */}
          <div className="space-y-10 mt-8 md:mt-0">
            {renderStatBlock(resultsStat1, 0)}
            {renderStatBlock(resultsStat2, 1)}
            {renderStatBlock(resultsStat3, 2)}
          </div>
        </div>
      </div>
    </section>
  );
}