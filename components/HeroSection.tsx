// components/HeroSection.tsx
"use client";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { MyButton, MyOutlineButton } from "./custom/extendVariants";
import { title } from "@/components/primitives";

export interface HeroSectionProps {
  badgeText?: string;
  headlineText1: string;
  headlineText2: string;
  headlineText3?: string;
  subheading: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
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
    transition: { staggerChildren: 0.2 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HeroSection({
  badgeText,
  headlineText1,
  headlineText2,
  headlineText3,
  subheading,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  lang = "en", // Add lang prop, default to "en"

}: HeroSectionProps & { lang?: "en" | "am" }) {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark mt-[-60px] xs:p-4 sm:mt-[-80px] sm:p-6 md:mt-[-105px] md:p-9">
      {/* ...background pattern... */}
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-4">
        <motion.section
          animate="visible"
          className="z-20 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6"
          initial="hidden"
          variants={sectionVariants}
        >
          {/* Badge */}
          {badgeText && (
            <motion.div variants={badgeVariants}>
              <Button
                className="h-8 xs:px-3 xs:py-1 sm:h-9 sm:px-[14px] sm:py-1.5 md:px-[18px] md:py-2 overflow-hidden border text-small font-normal leading-5 text-text-light dark:text-text-dark"
                endContent={<span>😎</span>}
                radius="full"
                variant="bordered"
              >
                {badgeText}
              </Button>
            </motion.div>
          )}

          {/* Headline */}
          <motion.div
            className={`text-center text-heading font-bold leading-[0.8] sm:leading-[0.8] tracking-tighter sm:text-[64px] ${lang === "am" ? "font-amharicHeading" : ""}`}
            variants={headingVariants}
          >
            <div className="relative">
              <div className={`inline-block max-w-[90%] xs:max-w-md sm:max-w-lg md:max-w-xl text-center text-text-light dark:text-text-dark justify-center relative z-10`}>
                <span className={title()}>{headlineText1} </span>
                <span className={title({ color: "violet" })}>
                  {headlineText2}{" "}
                </span>
                {headlineText3 && (
                  <>
                    <br />
                    <span className={title()}>{headlineText3}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className={`text-center text-body font-normal leading-6 sm:leading-7 text-text-light dark:text-text-dark w-full xs:w-[90%] sm:w-[466px] md:w-[550px] ${lang === "am" ? "font-amharicBody" : ""}`}
            variants={subheadingVariants}
          >
            {subheading}
          </motion.p>

          {/* Buttons (unchanged) */}
          <motion.div
            className="flex flex-row items-center justify-center gap-6 sm:flex-row"
            variants={buttonContainerVariants}
          >
            <motion.div variants={buttonVariants}>
              <Link passHref href={primaryButtonUrl}>
                <MyButton>
                  {primaryButtonText}
                </MyButton>
              </Link>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Link passHref href={secondaryButtonUrl}>
                <MyOutlineButton>
                  {secondaryButtonText}
                </MyOutlineButton>
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}