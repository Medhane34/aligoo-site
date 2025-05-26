// components/case-studies/CaseStudyImageGallery.tsx
"use client";
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { AccentText, SectionHeading } from "@/components/ui/typography";
import { CaseStudyImageGalleryData, GalleryImageItem } from '@/src/sanity/queries'; // Import the types

// Define the props interface for the component
interface CaseStudyImageGalleryProps {
  imageGalleryData: CaseStudyImageGalleryData;
}

export default function CaseStudyImageGallery({ imageGalleryData }: CaseStudyImageGalleryProps) {
  // Destructure the data for easier access
  const {
    galleryHeading,
    galleryDescription,
    galleryImage1,
    galleryImage2,
    galleryImage3,
  } = imageGalleryData;

  // Combine the individual image objects into an array for easier mapping
  // Filter out any undefined blocks if they aren't populated in Sanity
  const galleryImages: (GalleryImageItem | undefined)[] = [
    galleryImage1,
    galleryImage2,
    galleryImage3,
  ].filter(Boolean); // Filters out any undefined or null values

  // Debugging: Log the data received by the component
  console.log("CaseStudyImageGallery received imageGalleryData:", imageGalleryData);
  console.log("Gallery Heading:", galleryHeading);
  console.log("Gallery Description:", galleryDescription);
  console.log("Processed Gallery Images for rendering:", galleryImages);


  // Don't render the section if no gallery data or no images are available
  if (!galleryHeading || galleryImages.length === 0) {
    console.warn("CaseStudyImageGallery: Skipping render due to missing heading or images.");
    return null;
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        <div className="space-y-2 mb-12 text-center">
          <AccentText>Visual Story</AccentText> {/* This could also be dynamic if added to Sanity */}
          <SectionHeading className="text-3xl font-bold tracking-tight">
            {galleryHeading}
          </SectionHeading>
          {galleryDescription && ( // Only render if description exists
            <p className="max-w-3xl mx-auto text-lg text-gray-700 mt-4">
              {galleryDescription}
            </p>
          )}
        </div>

        {/* Dynamic 3-Column Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((imgItem, index) => {
            // Ensure imgItem is not undefined (though filter(Boolean) should handle this)
            if (!imgItem || !imgItem.imageUrl) {
                console.warn(`Gallery image at index ${index} is missing crucial data (imageUrl). Skipping.`);
                return null;
            }

            return (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={imgItem.imageUrl}
                  alt={imgItem.imageAlt || `Gallery image ${index + 1}`} // Fallback alt text
                  width={600} // Recommended: Adjust based on your common gallery image sizes
                  height={400} // Recommended: Adjust based on your common gallery image sizes
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  priority={false} // Gallery images are typically not above-the-fold
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
                />
                {imgItem.caption && ( // Only render caption if it exists
                  <p className="mt-3 text-sm text-gray-600 text-center">
                    {imgItem.caption}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}