// components/WhyServiceWorksSection.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { AccentText, SectionHeading } from "../ui/typography";

export type Feature = {
  emoji: string;
  title: string;
  description: string;
};

type WhyServiceWorksSectionProps = {
  heading: string;
  subheading?: string;
  features: Feature[];
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.18,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const emojiVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.25, rotate: 8, transition: { type: "spring", stiffness: 300 } },
};

const FeatureCard: React.FC<Feature & { index: number }> = ({ emoji, title, description, index }) => (
  <motion.div
    className="relative bg-white dark:bg-background-dark rounded-xl shadow-md p-6 flex flex-col items-start min-h-[160px] transition-shadow"
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={cardVariants}
    whileHover="hover"
    whileTap="hover"
  >
    {/* Emoji in top-right corner, only animates on hover/tap */}
    <motion.span
      className="absolute top-4 right-4 text-2xl select-none"
      variants={emojiVariants}
      initial={false}
      animate={false}
      whileHover="hover"
      whileTap="hover"
    >
      {emoji}
    </motion.span>
    <div className="font-semibold text-lg mb-2 text-heading">{title}</div>
    <div className="text-body text-gray-600 dark:text-gray-300">{description}</div>
  </motion.div>
);

const WhyServiceWorksSection: React.FC<WhyServiceWorksSectionProps> = ({
  heading,
  subheading,
  features,
}) => (
  <section className="w-full bg-background-light dark:bg-background-dark py-16">
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left column: Headline and subheadline */}
      <div className="flex flex-col justify-center">
        <SectionHeading>{heading}</SectionHeading>
       
        {subheading && (
        <AccentText>{subheading}</AccentText>
        )}
      </div>
      {/* Right column: Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} index={idx} />
        ))}
      </div>
    </div>
  </section>
);

export default WhyServiceWorksSection;
