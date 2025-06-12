// components/sections/WorkSection.tsx
"use client";
import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { AccentText, SectionHeading } from "@/components/ui/typography";

// Animation variants remain unchanged (good)
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const additionalCardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

type CaseStudy = {
  _id: string;
  title: string;
  imageUrl: string;
  service: string;
  hasImage: boolean;
  hasService: boolean;
  slug: string;
  challenge?: string; // Add these for the hover content
  outcome?: string;
};

type HomeCaseStudyWrapper = {
  casestudyPosts: CaseStudy[];
};

const placeholderCaseStudy: CaseStudy = {
  _id: "placeholder",
  title: "Coming Soon",
  imageUrl: "https://heroui.com/images/card-example-4.jpeg",
  service: "Explore More",
  hasImage: true,
  hasService: true,
  slug: "#",
  challenge: "Stay tuned for exciting new case studies!",
  outcome: "More amazing results are on the way!",
};

const fallbackCategory = "Case Study Category";
const fallbackChallenge =
  "This is a sample challenge description for the case study.";
const fallbackOutcome =
  "This is a sample outcome description for the case study.";

export default function WorkSection({ casestudyPosts }: HomeCaseStudyWrapper) {
  // Ensure we always have 5 items for the grid, filling with placeholders if needed
  const paddedCaseStudyPosts = [
    ...casestudyPosts,
    ...Array(5 - casestudyPosts.length).fill(placeholderCaseStudy),
  ].slice(0, 5); // Slice to exactly 5 in case more than 5 are passed

  return (
    <section className="w-full text-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark py-16 md:py-24 lg:py-32">
      {" "}
      {/* Added vertical padding to the section */}
      {/* Centralized content container that defines the "boxed" width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {" "}
        {/* Adjusted max-w and responsive px */}
        {/* Header - Now inside the common container */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:justify-between mb-12 md:mb-16 lg:mb-20" /* Responsive margins */
          initial="hidden"
          variants={headerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {/* Heading Text Group */}
          <motion.div
            className="text-center md:text-left space-y-2 mb-8 md:mb-0" /* Align text based on screen size, remove bottom margin on md+ */
            variants={headerVariants}
          >
            <SectionHeading className="font-bold tracking-tight uppercase">
              Our Work
            </SectionHeading>
            <motion.div variants={headerVariants} />
            <motion.div variants={headerVariants}>
              <AccentText className="normal-case">
                Real Projects. Real Impact.
              </AccentText>
            </motion.div>
          </motion.div>

          {/* Button */}
          <motion.button
            className="px-8 py-3 border border-transparent text-white font-medium rounded-full
              bg-gradient-to-r from-brand-primary-light to-brand-primary-dark
              hover:from-brand-primary-dark hover:to-brand-primary-darker
              shadow-lg transition-all duration-300 whitespace-nowrap" /* Added whitespace-nowrap to prevent button text wrapping */
            variants={headerVariants}
          >
            MORE CASE STUDIES 🏗️
          </motion.button>
        </motion.div>
        {/* Cards Grid - Now simplified and inside the common container */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {" "}
          {/* Unified grid container for all cards, responsive gap */}
          {/* Row 1: First 3 Cards (col-span-12 on xs, sm:col-span-4 for 3-column layout) */}
          {paddedCaseStudyPosts.slice(0, 3).map((study, index) => (
            <motion.div
              key={study._id + index}
              className="col-span-12 sm:col-span-6 lg:col-span-4" /* Responsive column spans: 12 on xs, 6 on sm (2 columns), 4 on lg (3 columns) */
            >
              <Link href={`/case-study/${study.slug}`}>
                <Card
                  className="
                    relative h-[300px] w-full rounded-lg overflow-hidden cursor-pointer group
                    hover:shadow-xl hover:drop-shadow-brand-hover /* Enhanced hover shadow */
                    transition-shadow duration-300
                  "
                >
                  <Image
                    removeWrapper
                    alt={study.title || "Case study image"}
                    className="z-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={
                      study.imageUrl ||
                      "https://heroui.com/images/card-example-4.jpeg"
                    }
                  />
                  <CardHeader className="absolute z-10 top-1 flex-col !items-start opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                    <p className="text-small text-white uppercase font-bold bg-brand-primary rounded-full p-1">
                      {study.service || fallbackCategory}
                    </p>
                    <h4 className="text-white font-medium text-large">
                      {study.title}
                    </h4>
                  </CardHeader>
                  {/* ... (gradient borders - keep as is, they are fine) ... */}
                  <div
                    className="
                      absolute top-0 left-0 
                      w-0 h-[3px]
                      bg-gradient-to-r from-rose-500 to-red-500
                      opacity-0
                      group-hover:w-1/2
                      group-hover:opacity-100
                      transition-all duration-300 ease-out
                      z-30
                      rounded-tl-lg
                    "
                  />
                  <div
                    className="
                      absolute top-0 left-0 rounded-lg
                      w-[3px] h-0
                      bg-gradient-to-r from-rose-500 to-red-500
                      opacity-0
                      group-hover:h-1/2
                      group-hover:opacity-100
                      transition-all duration-300 ease-out
                      z-30
                      rounded-tl-lg
                    "
                  />
                  <div
                    className="
                      absolute top-0 right-0 
                      w-0 h-[3px]
                      bg-gradient-to-r from-rose-500 to-red-500
                      opacity-0
                      group-hover:w-1/2
                      group-hover:opacity-100
                      transition-all duration-300 ease-out
                      z-30
                      rounded-tr-lg
                    "
                  />
                  <div
                    className="
                      absolute top-0 right-0 
                      w-[3px] h-0
                      bg-gradient-to-r from-rose-500 to-red-500
                      opacity-0
                      group-hover:h-1/2
                      group-hover:opacity-100
                      transition-all duration-300 ease-out
                      z-30
                      rounded-tr-lg
                    "
                  />
                  {/* Hover content */}
                  <div
                    className="
                      absolute bottom-0 left-0 right-0
                      h-0
                      bg-black/80
                      flex flex-col justify-end items-start
                      p-6
                      opacity-0
                      group-hover:h-3/4
                      group-hover:opacity-100
                      transition-all duration-500 ease-in-out
                      z-20
                      rounded-b-lg /* Match card border radius */
                    "
                  >
                    <div
                      className="
                        h-full
                        flex flex-col justify-end
                        text-white
                      "
                    >
                      <p className="text-base font-semibold mb-2">
                        The Challenge:
                      </p>
                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        {study.challenge || fallbackChallenge}
                      </p>
                      <p className="text-base font-semibold mb-2">
                        The Outcome:
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {study.outcome || fallbackOutcome}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
          {/* Row 2: Remaining 2 Cards */}
          {/* Note: Instead of separate grid containers for "col-span-5" and "col-span-7",
                     we put them in the same grid and let col-span handle layout.
                     This makes the grid more consistent. */}
          {paddedCaseStudyPosts.slice(3, 5).map((study, index) => (
            <motion.div
              key={
                study._id + index
              } /* Use index for unique key if IDs might be duplicated from placeholders */
              className={`
                col-span-12 sm:col-span-6 /* Each card takes half width on sm, full on xs */
                ${index === 0 ? "lg:col-span-5" : "lg:col-span-7"} /* Apply specific col-span on larger screens */
              `}
              variants={
                additionalCardVariants
              } /* Using the different variant for these */
            >
              <Link href={`/case-study/${study.slug}`}>
                <Card
                  className="
                    relative h-[300px] w-full rounded-lg overflow-hidden cursor-pointer group
                    hover:shadow-xl hover:shadow-purple-500/20
                    transition-shadow duration-300
                  "
                >
                  <Image
                    removeWrapper
                    alt={study.title || "Case study image"}
                    className="z-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={
                      study.imageUrl ||
                      "https://heroui.com/images/card-example-6.jpeg"
                    }
                  />
                  <CardHeader className="absolute z-10 top-1 flex-col !items-start opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                    <p className="text-tiny text-white uppercase font-bold">
                      {study.service || fallbackCategory}
                    </p>
                    <h4 className="text-white font-medium text-large">
                      {study.title}
                    </h4>
                  </CardHeader>
                  {/* ... (gradient borders and hover content - keep as is) ... */}
                  <div
                    className="
                      absolute top-0 left-0 
                      w-0 h-[3px]
                      bg-gradient-to-r from-blue-500 to-purple-500
                      opacity-0
                      group-hover:w-1/2
                      group-hover:opacity-100
                      transition-all duration-300 ease-out
                      z-30
                      rounded-tl-lg
                    "
                  />
                  <div
                    className="
                      absolute top-0 left-0 rounded-lg
                      w-[3px] h-0
                      bg-gradient-to-b from-blue-500 to-purple-500
                      opacity-0
                      group-hover:h-1/2
                      group-hover:opacity-100
                      transition-all duration-300 ease-out
                      z-30
                      rounded-tl-lg
                    "
                  />
                  <div
                    className="
                      absolute top-0 right-0 
                      w-0 h-[3px]
                      bg-gradient-to-l from-blue-500 to-purple-500
                      opacity-0
                      group-hover:w-1/2
                      group-hover:opacity-100
                      transition-all duration-300 ease-out
                      z-30
                      rounded-tr-lg
                    "
                  />
                  <div
                    className="
                      absolute top-0 right-0 
                      w-[3px] h-0
                      bg-gradient-to-b from-purple-500 to-blue-500
                      opacity-0
                      group-hover:h-1/2
                      group-hover:opacity-100
                      transition-all duration-300 ease-out
                      z-30
                      rounded-tr-lg
                    "
                  />
                  <div
                    className="
                      absolute bottom-0 left-0 right-0
                      h-0
                      bg-black/80
                      flex flex-col justify-end items-start
                      p-6
                      opacity-0
                      group-hover:h-3/4
                      group-hover:opacity-100
                      transition-all duration-500 ease-in-out
                      z-20
                      rounded-b-lg
                    "
                  >
                    <div
                      className="
                        h-full
                        flex flex-col justify-end
                        text-white 
                      "
                    >
                      <p className="text-base font-semibold mb-2">
                        The Challenge:
                      </p>
                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        {study.challenge || fallbackChallenge}
                      </p>
                      <p className="text-base font-semibold mb-2">
                        The Outcome:
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {study.outcome || fallbackOutcome}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
