// components/CTABottomSection.jsx
"use client";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export interface CTABottomSectionProps {
  heading: string;
  subheading: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;

}

const sectionVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const textVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } } };
const buttonVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeInOut" } } };

export default function CTABottomSection({
  heading,
  subheading,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
}: CTABottomSectionProps) {
  return (
    <motion.section
      className="bg-background-light dark:bg-background-dark py-12 md:py-16 lg:py-20"
      initial="hidden"
      variants={sectionVariants}
      viewport={{ once: true }}
      whileInView="visible"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-center md:text-left gap-8 md:gap-0 lg:gap-12">
          <motion.div className="flex flex-col items-center md:items-start space-y-2 max-w-lg" variants={sectionVariants}>
            <motion.h2 className="text-heading font-semibold text-gray-900 dark:text-white" variants={textVariants}>
              {heading}
            </motion.h2>
            <motion.p className="text-subheading text-gray-600 dark:text-gray-300" variants={textVariants}>
              {subheading}
            </motion.p>
          </motion.div>
          <motion.div className="flex flex-row items-center justify-center gap-4 w-full md:w-auto" variants={sectionVariants}>
            <motion.div variants={buttonVariants} className="flex-1 min-w-0">
              <Link href={primaryButtonUrl}>
                <Button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-brand-primary-light to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary-darker shadow-lg transition-all duration-300 w-full">
                  {primaryButtonText}
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants} className="flex-1 min-w-0">
              <Link href={secondaryButtonUrl}>
                <Button className="text-brand-primary-light dark:text-brand-primary-dark rounded-full px-8 py-3 hover:text-brand-primary-dark dark:hover:text-white transition-colors duration-300 border border-brand-primary-light dark:border-brand-primary-dark hover:border-brand-primary-dark dark:hover:border-white w-full bg-transparent">
                  📅 {secondaryButtonText}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
