// components/case-studies/CaseStudyStrategyContent.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { AccentText, SectionHeading } from "@/components/ui/typography";
import { CaseStudyStrategyData, StrategyBlock } from '@/src/sanity/queries';

// Define the props interface for the component
interface CaseStudyStrategyContentProps {
  strategyData: CaseStudyStrategyData;
}

export default function CaseStudyStrategyContent({ strategyData }: CaseStudyStrategyContentProps) {
  // Destructure the data for easier access
  const {
    strategyIntroHeading,
    strategyIntroBody,
    strategyBlock1,
    strategyBlock2,
    strategyBlock3,
  } = strategyData;

  const defaultStrategyAccentText = "Our Approach"; // Or dynamically fetch if you add a field for it

  // Helper function to render a single strategy block
  const renderStrategyBlock = (block: StrategyBlock | undefined, isImageLeft: boolean) => {
    // Ensure block and its crucial properties exist before attempting to render
    if (!block || !block.heading || !block.imageUrl) {
      // If heading or imageUrl is missing, this block won't render
      return null;
    }

    const textContent = (
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          {block.heading}
        </h3>
        {block.body && ( // Only render paragraph if body has content (not null/undefined/empty string)
            <p className="text-lg text-gray-700 leading-relaxed">
              {block.body}
            </p>
        )}
      </div>
    );

    const imageContent = (
      <div>
        {block.imageUrl && ( // Only render Image component if imageUrl is present
            <Image
              src={block.imageUrl}
              alt={block.imageAlt || `Image for ${block.heading}`} // Fallback alt text
              width={600} // Keep actual width/height for Next.js Image optimization
              height={400} // Adjust these values based on your typical image dimensions
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              priority={false} // Only use priority for above-the-fold images
              sizes="(max-width: 768px) 100vw, 50vw" // Add sizes for better optimization
            />
        )}
      </div>
    );

    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 ${isImageLeft ? 'md:grid-flow-col' : ''}`}>
        {isImageLeft ? (
          <>
            <div className="order-last md:order-first"> {/* Image on left on desktop, last on mobile */}
              {imageContent}
            </div>
            <div className="order-first md:order-last"> {/* Text on right on desktop, first on mobile */}
              {textContent}
            </div>
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header (Strategy Introduction) */}
        <div className="space-y-2 mb-12 text-center">
          <AccentText>{defaultStrategyAccentText}</AccentText>
          <SectionHeading className="text-3xl font-bold tracking-tight">
            {strategyIntroHeading}
          </SectionHeading>
          {strategyIntroBody && ( // Only render if strategyIntroBody has content
            <p className="max-w-3xl mx-auto text-lg text-gray-700 mt-4">
              {strategyIntroBody}
            </p>
          )}
        </div>

        {/* Strategy Block 1: Text Left, Image Right */}
        {strategyBlock1 && renderStrategyBlock(strategyBlock1, false)}

        {/* Strategy Block 2: Image Left, Text Right */}
        {strategyBlock2 && renderStrategyBlock(strategyBlock2, true)}

        {/* Strategy Block 3: Text Left, Image Right */}
        {strategyBlock3 && renderStrategyBlock(strategyBlock3, false)}
      </div>
    </section>
  );
}