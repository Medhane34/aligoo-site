// components/case-studies/CaseStudyResults.tsx
"use client";
import React from 'react';
import { AccentText, SectionHeading } from "@/components/ui/typography";
import { CaseStudyResultsData as ImportedResultsData, ResultStatItem } from './[slug]/CaseStudyData'; // Import the types

// Define the props interface for the component
interface CaseStudyResultsProps {
  resultsData: ImportedResultsData;
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
        <h4 className={`text-heading font-bold ${currentColor}`}>
          {stat.value}
        </h4>
        <h5 className="text-subheading md:text-2xl font-semibold text-white-900 mt-2">
          {stat.label}
        </h5>
        {stat.description && ( // Only render description if it exists
          <p className="text-small text-gray-600 mt-1">{stat.description}</p>
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-backround-primary-light dark:bg-background-primary-dark text-text-primary-light dark:text-text-primary-dark">
      <div className="max-w-screen-xl mx-auto">
        {/* Two-Column Grid for Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">

          {/* Left Column: Main Narrative */}
          <div>
            <SectionHeading className="text-heading md:text-4xl font-bold tracking-tight mt-2 text-left md:text-left uppercase">
              {resultsHeading}
            </SectionHeading>
            <AccentText className="text-left md:text-left normal-case">The Outcome</AccentText> {/* Hardcoded as per schema */}
            <p className="text-body md:text-xl mt-6 leading-relaxed text-left md:text-left">
              {resultsBody}
            </p>
          </div>

          {/* Right Column: Vertically Listed Stats */}
          <div className="space-y-10 xs:space-y-12 mt-8 md:mt-0">
            {renderStatBlock(resultsStat1, 0)}
            {renderStatBlock(resultsStat2, 1)}
            {renderStatBlock(resultsStat3, 2)}
          </div>
        </div>
      </div>
    </section>
  );
}