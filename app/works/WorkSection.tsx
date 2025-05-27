// components/WorkSection.tsx

"use client";
import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { AccentText, SectionHeading } from "@/components/ui/typography";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { fetchCaseStudies } from './casestudydata';
import { useEffect } from 'react';
import Link from "next/link";

// Define the CaseStudy type on the client side for type checking
type CaseStudy = {
  _id: string;
  title: string;
  imageUrl: string;
  service: string;
  slug: string; // The URL path for the case study
};
interface WorkSectionProps {
  caseStudiesData: CaseStudy[];
}


export default function WorkSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("All Services");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Derive filter options from the fetched data
  const filterOptions = ["All Services", ...Array.from(new Set(caseStudies.map(study => study.service)))];

  const filteredCaseStudies = selectedFilter === "All Services"
    ? caseStudies
    : caseStudies.filter(study => study.service === selectedFilter);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterSelect = (filter: React.SetStateAction<string>) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
  };

  // Fetch case studies on component mount
  useEffect(() => {
    async function loadCaseStudies() {
      try {
        const data = await fetchCaseStudies();
        console.log("Fetched Case Studies:", data);
        const normalizedData: CaseStudy[] = data.map((item: any) => ({
          _id: item._id,
          title: item.title,
          stats: item.stats,
          imageUrl: item.imageUrl,
          service: item.service,
          slug: item.slug ?? "",
        }));
        setCaseStudies(normalizedData);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching case studies:", err);
        setError(err.message || "Failed to fetch case studies");
        setLoading(false);
      }
    }

    loadCaseStudies();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <p className="text-center py-8">Loading case studies...</p>;
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">Error: {error}</p>;
  }  
  

  return (
    <section className="px-4 py-12 text-center sm:px-8 bg-background-light dark:bg-background-dark"> {/* Responsive padding */}
      {/* Section Header */}
      <div className="space-y-2 mb-8">
        <AccentText>Our Impact</AccentText>
        <SectionHeading className="text-3xl font-bold tracking-tight">The Transformation Wall</SectionHeading>
      </div>

      {/* Filter Section (Heading and Filter - always in a row, responsive widths) */}
      <div className="container mx-auto mb-8 flex flex-row sm:flex-row items-center justify-between gap-4 px-0 sm:px-4"> {/* px-0 for container, use gap on inner elements */}
        <h3 className="text-xl font-semibold text-gray-900 text-left w-full sm:w-auto">Explore Transformations</h3>
        <div className="relative text-right w-full sm:w-auto" ref={dropdownRef}>
          <Button
            onClick={toggleDropdown}
            size="sm"
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {selectedFilter}
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full sm:w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"> {/* w-full on mobile, fixed width on desktop */}
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu-button">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect(option)}
                    className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${selectedFilter === option ? 'font-semibold' : ''}`}
                    role="menuitem"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Case Study Cards Grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"> {/* Responsive grid */}
        {filteredCaseStudies.map((study) => (
          <Card key={study._id} className="relative overflow-hidden w-full"> {/* Card takes full width of its grid cell */}
            <Link href={`/case-study/${study.slug}`} className="block h-[280px] w-full relative"> {/* Set a flexible height for the image/card wrapper */}
              <Image
                removeWrapper
                alt={study.title}
                className="z-0 w-full h-full object-cover transition-opacity duration-300"
                src={study.imageUrl}
              />
              <div className="absolute top-2 left-2 bg-accent-500 text-white text-tiny font-bold py-1 px-2 rounded-md z-10">{study.service}</div>
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100 p-4"> {/* Add padding to overlay */}
                <h4 className="text-white font-medium text-large mb-2 underline text-center text-lg md:text-xl"> {/* Responsive font sizes */}
                  {study.title}
                </h4>

              </div>
            </Link>
          </Card>
        ))}
      </div>

      {/* Optional CTA below the cards */}
      {/* <div className="mt-8 text-center">
        <Button>Want this for your brand? Let's talk.</Button>
      </div> */}
    </section>
  );
}