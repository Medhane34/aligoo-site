"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Divider } from "@heroui/divider";
import { SectionHeading, AccentText } from "@/components/ui/typography";

export type AdPhilosophyStep = {
  title: string;
  description: string;
  color: string; // e.g., "bg-pink-500"
};

export interface AdPhilosophySectionProps {
  heading: string;
  accentText: string;
  steps: AdPhilosophyStep[];
  bottomHeading: string;
  bottomText: string;
}

const headingContainerVariants = {
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
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const stepVariantsLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const stepVariantsRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const TimelineStepCircle: React.FC<{
  scrollYProgress: MotionValue<number>;
  range: number[];
  color: string;
  idx: number;
}> = ({ scrollYProgress, range, color, idx }) => {
  const style = {
    scale: useTransform(scrollYProgress, range, [0.8, 1.2], { clamp: false }),
    opacity: useTransform(scrollYProgress, range, [0.6, 1], { clamp: false }),
  };

  return (
    <motion.div
      className={`absolute top-0 left-1/2 -ml-4 w-6 h-6 rounded-full ${color} z-10 flex items-center justify-center text-white font-semibold text-small`}
      style={style}
    >
      {idx + 1}
    </motion.div>
  );
};

export default function AdPhilosophySection({
  heading,
  accentText,
  steps,
  bottomHeading,
  bottomText,
}: AdPhilosophySectionProps) {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.5", "end 0.5"],
  });

  // For 4 steps, define ranges for animation
  const stepRanges = [
    [0, 0.25],
    [0.25, 0.5],
    [0.5, 0.75],
    [0.75, 1],
  ];

  return (
    <div ref={timelineRef} className="py-16 bg-background-light dark:bg-background-dark">
      {/* Top Heading and Subheading */}
      <motion.div
        className="container mx-auto px-4 text-center mb-12"
        initial="hidden"
        variants={headingContainerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <motion.div className="font-bold text-text-light dark:text-text-dark" variants={headingVariants}>
          <SectionHeading className="text-heading uppercase">{heading}</SectionHeading>
        </motion.div>
        <motion.div className="mt-4 text-lg text-gray-700 dark:text-gray-300" variants={headingVariants}>
          <AccentText className="normal-case">{accentText}</AccentText>
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <div className="relative container mx-auto px-4">
        <Divider className="absolute top-0 left-1/2 -ml-0.5 w-0.5 h-full bg-gray-300 dark:bg-gray-600 z-0" orientation="vertical" />

        {steps.map((step, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`relative mb-12 md:flex md:items-center ${isLeft ? "md:justify-start" : "md:justify-end"}`}
            >
              <TimelineStepCircle
                scrollYProgress={scrollYProgress}
                range={stepRanges[idx] || [0, 1]}
                color={step.color}
                idx={idx}
              />
              <motion.div
                className={`mt-4 ${isLeft ? "md:mr-8 md:text-left md:w-1/2" : "md:ml-8 md:text-right md:w-1/2"}`}
                initial="hidden"
                variants={isLeft ? stepVariantsLeft : stepVariantsRight}
                viewport={{ once: true }}
                whileInView="visible"
              >
                <h3 className="text-heading font-semibold text-brand-primary-light dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-body text-gray-700 dark:text-gray-300">{step.description}</p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Bottom Headline and Description */}
      <motion.div
        className="container mx-auto px-4 text-center mt-16"
        initial="hidden"
        variants={headingContainerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <motion.h2 className="text-subheading font-bold text-gray-900 dark:text-white" variants={headingVariants}>
          {bottomHeading}
        </motion.h2>
        <motion.p className="mt-4 text-body text-gray-700 dark:text-gray-300" variants={headingVariants}>
          {bottomText}
        </motion.p>
      </motion.div>
    </div>
  );
}
