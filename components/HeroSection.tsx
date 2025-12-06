// components/HeroSection.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ButtonAtom from "./atoms/ButtonAtom";
import HeadingAtom from "./atoms/HeadingAtom";
import BadgeAtom from "./atoms/BadgeAtom";
import ParallaxBackground from "./molecules/ParallaxBackground";
import CreativeCore from "./molecules/CreativeCore";
import ConstellationBackground from "./molecules/ConstellationBackground";

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
  lang?: "en" | "am";
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
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

const subheadingVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5
    },
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
  lang = "en",
}: HeroSectionProps) {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark mt-[-60px] xs:p-4 sm:mt-[-80px] sm:p-6 md:mt-[-105px] md:p-9 mt-50">

      {/* Background Animation */}
      {/* <ParallaxBackground /> */}
      <ConstellationBackground />


      <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-4 relative z-10">
        <motion.section
          animate="visible"
          className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto"
          initial="hidden"
          variants={sectionVariants}
        >
          {/* Badge */}
          {badgeText && (
            <motion.div variants={badgeVariants}>
              <BadgeAtom variant="outline" icon={<span>🔥</span>}>
                {badgeText}
              </BadgeAtom>
            </motion.div>
          )}

          {/* Headline */}
          {/* Headline */}
          <motion.div
            className={`text-center flex flex-col items-center justify-center gap-0 md:gap-1`}
            variants={headingVariants}
          >
            <HeadingAtom
              size="xl"
              variant="default"
              align="center"
              title={headlineText1}
              className="leading-tight dark:text-gray-100"
            />
            <HeadingAtom
              size="xl"
              variant="default"
              align="center"
              title={headlineText2}
              className="leading-tight bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent pb-2"
            />
            {headlineText3 && (
              <HeadingAtom
                size="xl"
                variant="default"
                align="center"
                title={headlineText3}
                className="leading-tight dark:text-gray-100 -mt-2" // Slight negative margin to pull 3rd line closer if needed
              />
            )}
          </motion.div>

          {/* Subheading */}
          <motion.p
            className={`text-center text-lg sm:text-xl text-text-light dark:text-gray-300 max-w-2xl font-medium leading-relaxed ${lang === "am" ? "font-amharicBody" : ""}`}
            variants={subheadingVariants}
          >
            {subheading}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            variants={buttonContainerVariants}
          >
            <Link href={primaryButtonUrl} className="w-full sm:w-auto">
              <ButtonAtom
                variant="primary"
                size="lg"
                fullWidth={true} // Full width on mobile, auto on desktop via CSS 
                shimmer={true}
              >
                {primaryButtonText}
              </ButtonAtom>
            </Link>

            <Link href={secondaryButtonUrl} className="w-full sm:w-auto">
              <ButtonAtom
                variant="outline"
                size="lg"
                fullWidth={true}
              >
                {secondaryButtonText}
              </ButtonAtom>
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}