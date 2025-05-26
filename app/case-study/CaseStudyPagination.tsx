// components/case-studies/CaseStudyPagination.tsx
"use client";
import React from 'react';
import Link from 'next/link'; // Import Next.js Link component for client-side navigation
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"; // Import icons
import { CaseStudyPaginationData } from './[slug]/CaseStudyData'; // Import the type for pagination data

// Define the props interface for the component
interface CaseStudyPaginationProps {
  paginationData: CaseStudyPaginationData;
}

export default function CaseStudyPagination({ paginationData }: CaseStudyPaginationProps) {
  // Destructure the data for easier access
  const { previousCaseStudy, nextCaseStudy } = paginationData;

  // Debugging: Log the data received by the component
  console.log("CaseStudyPagination received paginationData:", paginationData);
  console.log("Previous Case Study:", previousCaseStudy);
  console.log("Next Case Study:", nextCaseStudy);

  return (
    <nav className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">

        {/* Previous Case Study Link/Disabled State */}
        {previousCaseStudy ? (
          <Link href={`/case-study/${previousCaseStudy.slug}`} className="group flex items-center gap-2 text-left">
            <ChevronLeftIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
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
              <ChevronLeftIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
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
          <Link href={`/case-study/${nextCaseStudy.slug}`} className="group flex items-center gap-2 text-right ml-auto">
            <div>
              <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Next Case Study</p>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                {nextCaseStudy.title}
              </h3>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
          </Link>
        ) : (
          // Render a disabled-like div if there's no next case study
          <div className="w-auto ml-auto opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-2 text-right">
              <div>
                <p className="text-sm text-gray-400">Next Case Study</p>
                <h3 className="text-base sm:text-lg font-semibold text-gray-500">
                  No next
                </h3>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}