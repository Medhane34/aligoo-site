// components/case-studies/CaseStudyTestimonial.tsx
"use client";
import React from "react";

import { CaseStudyTestimonialData } from "./[slug]/CaseStudyData"; // Import the type

// Define the props interface for the component
interface CaseStudyTestimonialProps {
  testimonialData: CaseStudyTestimonialData;
}

export default function CaseStudyTestimonial({
  testimonialData,
}: CaseStudyTestimonialProps) {
  // Destructure the data for easier access
  const { testimonialQuote, testimonialAuthorName, testimonialAuthorPosition } =
    testimonialData;

  // Don't render the section if essential data is missing
  if (
    !testimonialQuote ||
    !testimonialAuthorName ||
    !testimonialAuthorPosition
  ) {
    console.warn(
      "CaseStudyTestimonial: Skipping render due to missing quote, author name, or author position.",
    );

    return null;
  }

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark text-white-light dark:text-dark-dark
    "
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Testimonial Quote */}
        <blockquote className="text-body italic font-medium leading-relaxed relative">
          {/* Using dynamic testimonialQuote */}“{testimonialQuote}”
        </blockquote>

        {/* Attribution */}
        <div className="mt-8">
          <p className="text-xl md:text-2xl font-semibold text-brand-primary mb-1">
            {testimonialAuthorName} {/* Using dynamic testimonialAuthorName */}
          </p>
          <p className=" text-gray-400">
            {testimonialAuthorPosition}{" "}
            {/* Using dynamic testimonialAuthorPosition */}
          </p>
        </div>
      </div>
    </section>
  );
}
