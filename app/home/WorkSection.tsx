// components/sections/WorkSection.tsx
"use client";
import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import Link from "next/link";

import { AccentText, SectionHeading } from "@/components/ui/typography";

// Animation variants remain unchanged
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
};

const fallbackCategory = "Case Study Category";
const fallbackChallenge = "This is a sample challenge description for the case study.";
const fallbackOutcome = "This is a sample outcome description for the case study.";

export default function WorkSection({ casestudyPosts }: HomeCaseStudyWrapper) {
  const paddedCaseStudyPosts = [
    ...casestudyPosts,
    ...Array(5 - casestudyPosts.length).fill(placeholderCaseStudy),
  ].slice(0, 5);

  return (
    <section className="w-full text-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <motion.div
        className="container flex flex-col xs:grid-cols-2 md:flex-row items-center justify-between"
        initial="hidden"
        variants={headerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <motion.div
          className="space-y-2 mb-8 xs:mb-4 xs:col-2 sm:col-3 md:col-4 lg:col-5"
          variants={headerVariants}
        >
          <motion.div variants={headerVariants}>
            <AccentText className="text-left">What We Do</AccentText>
          </motion.div>
          <motion.div variants={headerVariants}>
            <SectionHeading className="text-heading font-bold tracking-tight">
              Our Work
            </SectionHeading>
          </motion.div>
        </motion.div>
        <motion.button
          className="justify-left px-8 py-3 border border-transparent text-left font-medium rounded-full text-white
            bg-gradient-to-r from-brand-primary-light to-brand-primary-dark
            hover:from-brand-primary-dark hover:to-brand-primary-darker
            shadow-lg transition-all duration-300"
          variants={headerVariants}
        >
          MORE CASE STUDIES 🏗️
        </motion.button>
      </motion.div>

      <div className="max-w-full overflow-x-hidden mx-auto max-w-6xl">
        <div className="gap-4 grid grid-cols-12 grid-rows-2 px-4 sm:px-8">
          <motion.div
            className="col-span-12 grid grid-cols-12 gap-4"
            initial="hidden"
            variants={cardContainerVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {paddedCaseStudyPosts.slice(0, 3).map((study, index) => (
              <motion.div
                key={study._id + index}
                className="col-span-12 sm:col-span-4"
                variants={cardVariants}
              >
                <Link href={`/case-study/${study.slug}`}>
                  <Card
                    className="
                      relative h-[300px] rounded-none overflow-hidden cursor-pointer group
                    "
                  >
                    <Image
                      removeWrapper
                      alt={study.title || "Case study image"}
                      className="z-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      src={study.imageUrl || "https://heroui.com/images/card-example-4.jpeg"}
                    />
                    <CardHeader
                      className="absolute z-10 top-1 flex-col !items-start opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                    >
                      <p className="text-tiny text-white uppercase font-bold">
                        {study.service || fallbackCategory}
                      </p>
                      <h4 className="text-white font-medium text-large">
                        {study.title}
                      </h4>
                    </CardHeader>
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
                        rounded-tl-xl
                      "
                    />
                    <div
                      className="
                        absolute top-0 left-0 rounded-xl
                        w-[3px] h-0
                        bg-gradient-to-b from-blue-500 to-purple-500
                        opacity-0
                        group-hover:h-1/2
                        group-hover:opacity-100
                        transition-all duration-300 ease-out
                        z-30
                        rounded-tl-xl
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
                        rounded-tr-xl
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
                        rounded-tr-xl
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
                      "
                    >
                      <div
                        className="
                          h-full
                          flex flex-col justify-end
                          text-white
                        "
                      >
                        <p className="text-base font-semibold mb-2">The Challenge:</p>
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                          {study.challenge || fallbackChallenge}
                        </p>
                        <p className="text-base font-semibold mb-2">The Outcome:</p>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {study.outcome || fallbackOutcome}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="col-span-12 sm:col-span-5"
            initial="hidden"
            variants={additionalCardVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <Link href={`/case-study/${paddedCaseStudyPosts[3].slug}`}>
              <Card
                className="
                  relative h-[300px] rounded-none overflow-hidden cursor-pointer group
                "
              >
                <Image
                  removeWrapper
                  alt={paddedCaseStudyPosts[3].title || "Case study image"}
                  className="z-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={paddedCaseStudyPosts[3].imageUrl || "https://heroui.com/images/card-example-6.jpeg"}
                />
                <CardHeader className="absolute z-10 top-1 flex-col items-start opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                  <p className="text-tiny text-white uppercase font-bold">
                    {paddedCaseStudyPosts[3].service || fallbackCategory}
                  </p>
                  <h4 className="text-white font-medium text-large">
                    {paddedCaseStudyPosts[3].title}
                  </h4>
                </CardHeader>
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
                    rounded-tl-xl
                  "
                />
                <div
                  className="
                    absolute top-0 left-0 rounded-xl
                    w-[3px] h-0
                    bg-gradient-to-b from-blue-500 to-purple-500
                    opacity-0
                    group-hover:h-1/2
                    group-hover:opacity-100
                    transition-all duration-300 ease-out
                    z-30
                    rounded-tl-xl
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
                    rounded-tr-xl
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
                    rounded-tr-xl
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
                  "
                >
                  <div
                    className="
                      h-full
                      flex flex-col justify-end
                      text-white
                    "
                  >
                    <p className="text-base font-semibold mb-2">The Challenge:</p>
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                      {paddedCaseStudyPosts[3].challenge || fallbackChallenge}
                    </p>
                    <p className="text-base font-semibold mb-2">The Outcome:</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {paddedCaseStudyPosts[3].outcome || fallbackOutcome}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            className="col-span-12 sm:col-span-7"
            initial="hidden"
            variants={additionalCardVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <Link href={`/case-study/${paddedCaseStudyPosts[4].slug}`}>
              <Card
                className="
                  relative h-[300px] rounded-none overflow-hidden cursor-pointer group
                "
              >
                <Image
                  removeWrapper
                  alt={paddedCaseStudyPosts[4].title || "Case study image"}
                  className="z-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={paddedCaseStudyPosts[4].imageUrl || "https://heroui.com/images/card-example-5.jpeg"}
                />
                <CardHeader className="absolute z-10 top-1 flex-col items-start opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                  <p className="text-tiny text-white uppercase font-bold">
                    {paddedCaseStudyPosts[4].service || fallbackCategory}
                  </p>
                  <h4 className="text-white font-medium text-large">
                    {paddedCaseStudyPosts[4].title}
                  </h4>
                </CardHeader>
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
                    rounded-tl-xl
                  "
                />
                <div
                  className="
                    absolute top-0 left-0 rounded-xl
                    w-[3px] h-0
                    bg-gradient-to-b from-blue-500 to-purple-500
                    opacity-0
                    group-hover:h-1/2
                    group-hover:opacity-100
                    transition-all duration-300 ease-out
                    z-30
                    rounded-tl-xl
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
                    rounded-tr-xl
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
                    rounded-tr-xl
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
                  "
                >
                  <div
                    className="
                      h-full
                      flex flex-col justify-end
                      text-white
                    "
                  >
                    <p className="text-base font-semibold mb-2">The Challenge:</p>
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                      {paddedCaseStudyPosts[4].challenge || fallbackChallenge}
                    </p>
                    <p className="text-base font-semibold mb-2">The Outcome:</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {paddedCaseStudyPosts[4].outcome || fallbackOutcome}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}