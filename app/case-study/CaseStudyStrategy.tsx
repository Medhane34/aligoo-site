// components/case-studies/CaseStudyGoals.tsx
"use client";
import React from 'react';
import { AccentText, SectionHeading } from "@/components/ui/typography";
import { CaseStudyGoalData } from './[slug]/CaseStudyData'; // Import the type

// This interface now directly matches the data fetched by fetchCaseStudyGoalDataBySlug
interface CaseStudyGoalsProps {
  goalTitle: string; // Or simply string, but this is more explicit
  goalBody: string;   // Or simply string
  // If you later add an accent text field for this section in Sanity, add it here too
  // goalAccentText?: string;
}

export default function CaseStudyGoals({
  goalTitle,
  goalBody,
  // goalAccentText = "Our Goal", // Default if you add an optional accent text field
}: CaseStudyGoalsProps) {
  // You can set a default accent text if your schema doesn't have a specific field for it,
  // or if it's always the same for all goal sections.
  const defaultAccentText = "Our Goal"; // This text is hardcoded in the component if not passed.

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-background-light dark:bg-background-dark 
    text-text-primary-light dark:text-text-primary-dark   
     "
    >
      {" "}
      {/* Added a light background for distinction */}
      <div className="max-w-3xl mx-auto">
        {/* Accent Text (using a default if no prop is passed) */}
        <AccentText className="text-center">
          {defaultAccentText} {/* Using the default text here */}
        </AccentText>

        {/* Heading */}
        <SectionHeading className="text-heading md:text-4xl font-bold tracking-tight">
          {goalTitle}
        </SectionHeading>

        {/* Body Text */}
        <p className="text-body mt-6 leading-relaxed">{goalBody}</p>
      </div>
    </section>
  );
}