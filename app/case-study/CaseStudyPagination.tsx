// components/case-studies/CaseStudyPagination.tsx
"use client";
import React from 'react';
import Link from 'next/link'; // Import Next.js Link component for client-side navigation
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"; // Import icons
import { CaseStudyPaginationData } from "@/types/CaseStudyTypes"; // Import the type for pagination data

// Define the props interface for the component
interface CaseStudyPaginationProps {
  paginationData: CaseStudyPaginationData;
}

export default function CaseStudyPagination({ paginationData }: CaseStudyPaginationProps) {
  // Destructure the data for easier access
  const { previousCaseStudy, nextCaseStudy } = paginationData;

  return (
    <nav className="py-12 px-4 sm:px-6 lg:px-8 bg-brand-primary border-t border-gray-200 text-white">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">

        {/* Previous Case Study Link/Disabled State */}
        {previousCaseStudy ? (
          <Link className="group flex items-center gap-2 text-left" href={`/case-study/${previousCaseStudy.slug}`}>
            <ChevronLeftIcon aria-hidden="true" className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            <div>
              <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Previous Case Study</p>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {previousCaseStudy.title}
              </h3>
            </div>
          </Link>
        ) : (
          // Render a disabled-like div if there's no previous case study
          <div className="w-auto opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-2 text-left">
              <ChevronLeftIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-300"
              />
              <div>
                <p className="text-sm text-gray-400">Previous Case Study</p>
                <h3 className="text-base sm:text-lg font-semibold text-gray-500">
                  No previous
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Next Case Study Link/Disabled State */}
        {nextCaseStudy ? (
          <Link className="group flex items-center gap-2 text-right ml-auto" href={`/case-study/${nextCaseStudy.slug}`}>
            <div>
              <p className="text-sm group-hover:text-gray-300 transition-colors">Next Case Study</p>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {nextCaseStudy.title}
              </h3>
            </div>
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 text-blue-400 group-hover:text-blue-600 transition-colors" />
          </Link>
        ) : (
          // Render a disabled-like div if there's no next case study
          <div className="w-auto ml-auto opacity-80 cursor-not-allowed">
            <div className="flex items-center gap-2 text-right">
              <div>
                <p className="text-sm text-gray-400">Next Case Study</p>
                <h3 className="text-base sm:text-lg font-semibold text-gray-500">
                  No next
                </h3>
              </div>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5 text-gray-100" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}