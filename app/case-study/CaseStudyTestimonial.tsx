// components/case-studies/CaseStudyTestimonial.tsx
"use client";
import React from "react";
import {CaseStudyTestimonialData} from "@/types/CaseStudyTypes"



// Define the props interface for the component
interface CaseStudyTestimonialProps {
  testimonialData: CaseStudyTestimonialData;
}
export default function CaseStudyTestimonial({
  testimonialData,
}: CaseStudyTestimonialProps) {
  // Step 1: Check if the entire testimonial object exists
  if (!testimonialData) {
    console.warn("CaseStudyTestimonial: No testimonial data provided.");
    return null; // Don't render anything if there's no testimonial object
  }

  // Step 2: Destructure the data for easier access
  // Provide default empty strings for optional fields if they are missing,
  // or a default rating of 0.
  const {
    testimonialQuote,
    testimonialAuthorName,
    testimonialAuthorPosition,
    rating = 0, // Default to 0 if rating is not provided
  } = testimonialData;

  // Step 3: Check if essential data is missing (even if the object exists)
  // We only need the quote and author name to consider it a valid testimonial for display.
  if (!testimonialQuote || !testimonialAuthorName) {
    console.warn(
      "CaseStudyTestimonial: Skipping render due to missing essential quote or author name.",
    );
    return null; // Don't render the section if essential data is missing
  }

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark text-white-light dark:text-dark-dark"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="mt-3 flex justify-center pb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-neutral-600"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
            </svg>
          ))}
        </div>

        {/* Testimonial Quote */}
        <blockquote className="text-body italic font-medium leading-relaxed relative">
          “{testimonialQuote}”
        </blockquote>

        {/* Attribution */}
        <div className="mt-8">
          <p className="text-xl md:text-2xl font-semibold text-brand-primary mb-1">
            {testimonialAuthorName}
          </p>
          {testimonialAuthorPosition && ( // Only render position if it exists
            <p className=" text-gray-400">
              {testimonialAuthorPosition}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}