// components/case-studies/CaseStudyOverview.tsx

"use client";
import React from "react";
import { Image } from "@heroui/image";

import {
  AccentText,
  SectionHeading,
  Paragraph,
} from "@/components/ui/typography"; // Ensure Paragraph is imported

// Define the props type: overviewDescription is now a string
interface CaseStudyOverviewProps {
  overviewTitle: string;
  overviewDescription: string; // Now a plain string due to GROQ modification
  heroImageUrl?: string;
  heroImageAlt?: string;
}

export default function CaseStudyOverview({
  overviewTitle,
  overviewDescription,
  heroImageUrl,
  heroImageAlt,
}: CaseStudyOverviewProps) {
  // Split the description into multiple paragraphs based on double newlines
  // This helps break up the text if the editor used newlines in Sanity.
 /*  const paragraphs = overviewDescription
    .split("\n\n")
    .filter((p) => p.trim() !== "");
 */
  return (
    <section className="relative z-10 py-24 bg-background-primary-light dark:bg-background-primary-dark text-text-primary-light dark:text-text-primary-dark">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center
      gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 px-4 xs:px-5 sm:px-6 md:px-8
      "
      >
        {/* Left Column: Text Content */}
        <div
          className="w-full md:w-1/2 xl:space-y-1 lg:space-y-2 xs:space-y-8 sm:space-y-10 md:space-y-12
        xs:p-4 sm:p-6 md:p-8 lg:p-10
        
        "
        >
        
          <SectionHeading className="text-heading font-bold tracking-tight uppercase">
            {overviewTitle} {/* Dynamic Heading */}
          </SectionHeading>
          <AccentText className="xs:mb-[0] normal-case pb-2">Overview</AccentText>
          {/* Render each paragraph */}
          {/* {paragraphs.map((p, index) => (
            <Paragraph key={index} className="text-body lg:text-body">{p}</Paragraph>
          ))} */}
          <p>{overviewDescription}</p>
        </div>
        {/* Right Column: Image */}
        <div className="w-full md:w-1/2">
          {heroImageUrl && ( // Conditionally render image if URL exists
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                isBlurred
                alt={heroImageAlt || overviewTitle} // Dynamic Image Alt Text, fallback to title
                className="object-cover w-full h-full"
                height={600} // Adjust as needed
                src={heroImageUrl} // Dynamic Image URL
                width={800} // Adjust as needed
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
