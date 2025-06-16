// components/CTABottomSection.jsx
"use client";

import React from "react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface CTABottomSectionProps {
  heading: string;
  subheading: string;
  firstbuttontext: string;
}

const CTABottomSection: React.FC<CTABottomSectionProps> = ({
  heading,
  subheading,
  firstbuttontext,
}) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      className="bg-background-light dark:bg-background-dark py-12 md:py-16 lg:py-20"
      initial="hidden"
      variants={sectionVariants}
      viewport={{ once: true }}
      whileInView="visible"
    >
      {/* Outer container for the boxed layout on desktop */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {" "}
        {/* Added max-w-4xl for boxed size */}
        {/* Inner flex container to manage layout of text and buttons */}
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-center md:text-left gap-8 md:gap-0 lg:gap-12">
          {/* Text Section */}
          <motion.div
            className="flex flex-col items-center md:items-start space-y-2 max-w-lg"
            variants={textContainerVariants}
          >
            <motion.h2
              className="text-heading font-semibold text-gray-900 dark:text-white"
              variants={textVariants}
            >
              {heading}
            </motion.h2>
            <motion.p
              className="text-subheading text-gray-600 dark:text-gray-300"
              variants={textVariants}
            >
              {subheading}
            </motion.p>
          </motion.div>

          {/* Buttons Section */}
          <motion.div
            className="flex flex-row items-center justify-center gap-4 w-full md:w-auto" // Default to flex-row for mobile
            variants={buttonContainerVariants}
          >
            <motion.div variants={buttonVariants} className="flex-1 min-w-0">
              {" "}
              {/* Use flex-1 to distribute width, min-w-0 to allow shrinking */}
              <Link href="/strategy-session" passHref>
                <Button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-brand-primary-light to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary-darker shadow-lg transition-all duration-300 w-full">
                  {firstbuttontext}
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} className="flex-1 min-w-0">
              {" "}
              {/* Use flex-1 to distribute width, min-w-0 to allow shrinking */}
              <Link href="https://app.reclaim.ai/m/daniel-aregawi/digital-marketing" passHref>
                <Button className="text-brand-primary-light dark:text-brand-primary-dark rounded-full px-8 py-3 hover:text-brand-primary-dark dark:hover:text-white transition-colors duration-300 border border-brand-primary-light dark:border-brand-primary-dark hover:border-brand-primary-dark dark:hover:border-white w-full bg-transparent">
                  📅 Book On Calander
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTABottomSection;
