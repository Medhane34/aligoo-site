// components/case-studies/CaseStudyOverview.tsx

"use client";
import React from 'react';
import { Image } from "@heroui/image";
import { AccentText, SectionHeading, Paragraph } from "@/components/ui/typography"; // Ensure Paragraph is imported

// Define the props type: overviewDescription is now a string
interface CaseStudyOverviewProps {
  title: string;
  overviewDescription: string; // Now a plain string due to GROQ modification
  heroImageUrl?: string;
  heroImageAlt?: string;
}

export default function CaseStudyOverview({
  title,
  overviewDescription,
  heroImageUrl,
  heroImageAlt,
}: CaseStudyOverviewProps) {



  // Split the description into multiple paragraphs based on double newlines
  // This helps break up the text if the editor used newlines in Sanity.
  const paragraphs = overviewDescription.split('\n\n').filter(p => p.trim() !== '');

  return (
    <section className="relative z-10 py-24 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Column: Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <AccentText>Case Study</AccentText>
          <SectionHeading>
            {title} {/* Dynamic Heading */}
          </SectionHeading>
          {/* Render each paragraph */}
          {paragraphs.map((p, index) => (
            <Paragraph key={index}>
              {p}
            </Paragraph>
          ))}
        </div>
        {/* Right Column: Image */}
        <div className="w-full md:w-1/2">
          {heroImageUrl && ( // Conditionally render image if URL exists
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                isBlurred
                src={heroImageUrl} // Dynamic Image URL
                alt={heroImageAlt || title} // Dynamic Image Alt Text, fallback to title
                width={800} // Adjust as needed
                height={600} // Adjust as needed
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}