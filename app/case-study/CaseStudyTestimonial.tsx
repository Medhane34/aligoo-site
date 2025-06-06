// components/case-studies/CaseStudyTestimonial.tsx
"use client";
import React from 'react';
import { CaseStudyTestimonialData } from '@/src/sanity/queries'; // Import the type

// Define the props interface for the component
interface CaseStudyTestimonialProps {
  testimonialData: CaseStudyTestimonialData;
}

export default function CaseStudyTestimonial({ testimonialData }: CaseStudyTestimonialProps) {
  // Destructure the data for easier access
  const {
    testimonialQuote,
    testimonialAuthorName,
    testimonialAuthorPosition,
  } = testimonialData;

  // Debugging: Log the data received by the component
  console.log("CaseStudyTestimonial received testimonialData:", testimonialData);
  console.log("Testimonial Quote:", testimonialQuote);
  console.log("Testimonial Author Name:", testimonialAuthorName);
  console.log("Testimonial Author Position:", testimonialAuthorPosition);


  // Don't render the section if essential data is missing
  if (!testimonialQuote || !testimonialAuthorName || !testimonialAuthorPosition) {
    console.warn("CaseStudyTestimonial: Skipping render due to missing quote, author name, or author position.");
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        {/* Testimonial Quote */}
        <blockquote className="text-3xl md:text-4xl italic font-medium text-gray-900 leading-relaxed relative">
          {/* Using dynamic testimonialQuote */}
          “{testimonialQuote}”
        </blockquote>

        {/* Attribution */}
        <div className="mt-8">
          <p className="text-xl md:text-2xl font-semibold text-blue-600 mb-1">
            {testimonialAuthorName} {/* Using dynamic testimonialAuthorName */}
          </p>
          <p className="text-lg md:text-xl text-gray-600">
            {testimonialAuthorPosition} {/* Using dynamic testimonialAuthorPosition */}
          </p>
        </div>
      </div>
    </section>
  );
}