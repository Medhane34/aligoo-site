// components/HeroSection.jsx
"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Link from "next/link"; // Import Link for internal navigation

// Assuming `title` is a utility function from your primitives that applies common styles
import { title } from "@/components/primitives"; 

// --- Framer Motion Variants (Keep as is, they are fine) ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const subheadingVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
// --- End Framer Motion Variants ---


// Define the props interface for better type safety (if using TypeScript)
// For JavaScript, this acts as good documentation.
interface HeroSectionProps {
  headlineText1?: string; // e.g., "Make"
  headlineText2?: string; // e.g., "beautiful" (with color)
  headlineText3?: string; // e.g., "websites regardless of your design experience."
  subheading: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  badgeText?: string; // Optional badge text
}

// Update the component to accept props
export default function HeroSection({
  headlineText1 = "Make", // Default values for headline parts
  headlineText2 = "beautiful",
  headlineText3 = "websites regardless of your design experience.",
  subheading,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  badgeText, // Optional badge text prop
}: HeroSectionProps) { // Add the props to the function signature
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark mt-[-60px] xs:p-4 sm:mt-[-80px] sm:p-6 md:mt-[-105px] md:p-9">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full bg-background-light dark:bg-background-dark [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [&>div]:bg-[size:14px_24px] [&>div]:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
          <div />
        </div>
      </div>
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-4">
        <motion.section
          animate="visible"
          className="z-20 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6"
          initial="hidden"
          variants={sectionVariants}
        >
          {/* Badge (now optional via prop) */}
          {badgeText && (
            <motion.div variants={badgeVariants}>
              <Button
                className="h-8 xs:px-3 xs:py-1 sm:h-9 sm:px-[14px] sm:py-1.5 md:px-[18px] md:py-2 overflow-hidden border-1 text-small font-normal leading-5 text-text-light dark:text-text-dark"
                endContent={
                  <span>😎</span>
                }
                radius="full"
                variant="bordered"
              >
                {badgeText} {/* Use badgeText prop */}
              </Button>
            </motion.div>
          )}

          {/* Headline (using props) */}
          <motion.div
            className="text-center text-heading font-bold leading-[0.8] sm:leading-[0.8] tracking-tighter sm:text-[64px]"
            variants={headingVariants}
          >
            <div className="relative">
              <div className="inline-block max-w-[90%] xs:max-w-md sm:max-w-lg md:max-w-xl text-center text-text-light dark:text-text-dark justify-center relative z-10">
                <span className={title()}>{headlineText1} </span>
                <span className={title({ color: "violet" })}>{headlineText2} </span>
                <br />
                <span className={title()}>
                  {headlineText3}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Sub-heading (using prop) */}
          <motion.p
            className="text-center text-body font-normal leading-6 sm:leading-7 text-text-light dark:text-text-dark w-full xs:w-[90%] sm:w-[466px] md:w-[550px]"
            variants={subheadingVariants}
          >
            {subheading} {/* Use subheading prop */}
          </motion.p>

          {/* Buttons (using props and Link component) */}
          <motion.div
            className="flex flex-row items-center justify-center gap-6 sm:flex-row"
            variants={buttonContainerVariants}
          >
            <motion.div variants={buttonVariants}>
              <Link href={primaryButtonUrl} passHref>
                <Button
                  className="w-[163px] h-10 px-[16px] py-[10px] text-small font-medium leading-5 bg-gradient-to-r from-brand-primary-light to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary-darker"
                  radius="full"
                >
                  {primaryButtonText} {/* Use primaryButtonText prop */}
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Link href={secondaryButtonUrl} passHref>
                <Button
                  className="h-10 w-[163px] border-2 dark:border-white border-brand-primary-light px-[16px] py-[10px] text-text-light dark:text-text-dark font-medium leading-5"
                
                  radius="full"
                  variant="bordered"
                >
                  {secondaryButtonText} {/* Use secondaryButtonText prop */}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}