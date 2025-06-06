// components/WorkSection.tsx

"use client";
import React, { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { fetchCaseStudies } from "./casestudydata";
import { useEffect } from "react";
import Link from "next/link";

// Define the CaseStudy type on the client side for type checking
type CaseStudy = {
  _id: string;
  title: string;
  imageUrl: string;
  service: string;
  slug: string;
  stats?: any;
};

interface WorkSectionProps {
  initialCaseStudies: CaseStudy[];
  totalPosts: number;
  postsPerPage: number;
}

export default function WorkSection({
  initialCaseStudies,
  totalPosts,
  postsPerPage,
}: WorkSectionProps) {
  // Initialize caseStudies with initialCaseStudies from props
  const [caseStudies, setCaseStudies] =
    useState<CaseStudy[]>(initialCaseStudies);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Set to false initially as we have initial data
  const [error, setError] = useState<string | null>(null);

  const [selectedFilter, setSelectedFilter] = useState("All Services");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalPages = useMemo(() => {
    return Math.ceil(totalPosts / postsPerPage);
  }, [totalPosts, postsPerPage]);

  const filterOptions = useMemo(() => {
    return [
      "All Services",
      ...Array.from(new Set(caseStudies.map((study) => study.service))),
    ];
  }, [caseStudies]);

  const filteredCaseStudies = useMemo(() => {
    return selectedFilter === "All Services"
      ? caseStudies
      : caseStudies.filter((study) => study.service === selectedFilter);
  }, [caseStudies, selectedFilter]);

  // Effect to fetch new data when currentPage changes
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
      } catch (err: any) {
        console.error("Error fetching paginated case studies:", err);
        setError(err.message || "Failed to fetch paginated case studies");
      } finally {
        setLoading(false);
      }
    };

    loadPaginatedCaseStudies();
    // This effect should only re-run if currentPage or postsPerPage changes.
    // initialCaseStudies is only relevant for the *initial* state, not for subsequent fetches.
  }, [currentPage, postsPerPage]); // REMOVED initialCaseStudies from dependencies

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleFilterSelect = useCallback((filter: string) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading && caseStudies.length === 0) {
    // Only show loading if no data is present
    return (
      <div className="flex justify-center items-center py-20 min-h-[300px]">
        {" "}
        {/* Added min-h and padding */}
        <Spinner
          color="primary"
          label="Loading case studies..."
          size="lg"
        />{" "}
        {/* Choose 'primary' or another suitable color */}
      </div>
    );
  }

  if (error) {
    return <p className="text-center py-8 text-red-500">Error: {error}</p>;
  }

  return (
    <section className="px-4 py-12 text-center sm:px-8 bg-background-light dark:bg-background-dark">
      {/* Section Header */}
      <div className="space-y-1 sm:space-y-2 mb-5 xs:mb-6 sm:mb-8">
        <AccentText>Our Impact</AccentText>
        <SectionHeading className="text-3xl font-bold tracking-tight">
          The Transformation Wall
        </SectionHeading>
      </div>
      {/* Filter Section (Heading and Filter - always in a row, responsive widths) */}
      <div className="container mx-auto mb-8 flex flex-row sm:flex-row items-center justify-between gap-4 px-0 sm:px-4">
        {" "}
        {/* px-0 for container, use gap on inner elements */}
        <h3 className="text-xl font-semibold text-gray-900 text-left w-full sm:w-auto">
          Explore Transformations
        </h3>
        <div ref={dropdownRef} className="relative text-right w-full sm:w-auto">
          <Button
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-brand-primary text-sm font-medium text-text-light dark:text-text-dark hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            size="sm"
            onClick={toggleDropdown}
          >
            {selectedFilter}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 ml-2 h-5 w-5"
            />
          </Button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 xs:mt-2 w-full xs:w-40 sm:w-40 md:w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div
                aria-labelledby="options-menu-button"
                aria-orientation="vertical"
                className="py-1"
                role="menu"
              >
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-3 xs:px-4 py-1 xs:py-2 text-small text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${selectedFilter === option ? "font-semibold" : ""}`}
                    role="menuitem"
                    onClick={() => handleFilterSelect(option)}
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
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredCaseStudies.length > 0 ? (
          filteredCaseStudies.map((study) => (
            <Card key={study._id} className="relative overflow-hidden w-full  hover:drop-shadow-brand-hover transition-all duration-300">
              <Link
                className="block h-[280px] w-full relative"
                href={`/case-study/${study.slug}`}
              >
                <Image
                  removeWrapper
                  alt={study.title}
                  className="z-0 w-full h-full object-cover transition-opacity duration-300 brightness-75 xs:brightness-100"
                  src={study.imageUrl}
                />
                <div className="absolute top-2 left-2 bg-brand-primary text-white text-tiny font-bold py-1 px-2 rounded-full z-10">
                  {study.service}
                </div>
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-100 p-4">
                  <h4 className="text-white font-medium text-large mb-2 underline text-center text-lg md:text-xl">
                    {study.title}
                  </h4>
                </div>
              </Link>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No case studies found for this filter.
          </p>
        )}
      </div>

      {/* HeroUI Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12">
          <Pagination
            loop
            showControls
            color="primary"
            initialPage={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
            // You can add more props like variant, radius, size if needed
          />
        </div>
      )}
    </section>
  );
}
