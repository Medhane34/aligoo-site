// components/ProcessStepsSection.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  DocumentTextIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { AccentText, SectionHeading } from "../ui/typography";

export type ProcessStep = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type ProcessStepsSectionProps = {
  heading: string;
  subheading?: string;
  steps: ProcessStep[];
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

const arrowVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: (i: number) => ({
    opacity: 1,
    pathLength: 1,
    transition: {
      delay: 0.18 * (i + 1), // Arrow appears after the next card
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const CurvyDottedArrow: React.FC<{ index: number }> = ({ index }) => (
  <motion.div
    className="hidden md:flex items-center justify-center"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
      <motion.path
        d="M10 30 C 40 0, 80 60, 110 30"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
        fill="none"
        variants={arrowVariants}
        custom={index}
      />
      <polygon
        points="110,30 104,26 106,30 104,34"
        fill="#94a3b8"
      />
    </svg>
  </motion.div>
);

const ProcessStepsSection: React.FC<ProcessStepsSectionProps> = ({
  heading,
  subheading,
  steps,
}) => (
  <section className="w-full bg-background-light dark:bg-background-dark py-16">
    <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
      <SectionHeading>{heading}</SectionHeading>
      
      {subheading && (
        <AccentText>{subheading}</AccentText>
        
      )}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-0 w-full">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <motion.div
              className="
                flex flex-col items-center
                px-4 py-6
                flex-1
                min-w-[220px] max-w-[320px]
                mx-auto
                bg-transparent
              "
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4 border-2 border-white bg-white/80 shadow-md">
                {step.icon}
              </div>
              <div className="text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">
                Step {idx + 1}
              </div>
              <div className="text-heading font-semibold mb-2 text-center">{step.title}</div>
              <div className="text-body text-center max-w-xs mx-auto">{step.description}</div>
            </motion.div>
            {idx < steps.length - 1 && <CurvyDottedArrow index={idx} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessStepsSection;
