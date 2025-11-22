"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionHeading, AccentText } from "@/components/ui/typography";
import React from "react";

export interface ProcessStep {
  icon: string;
  heading: string;
  description: string;
}

export interface ProcessSectionProps {
  sectionHeading: string;
  accentText: string;
  steps: ProcessStep[];
  lang: 'en' | 'am'; // Added
}

const stepVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  complete: { opacity: 1, scale: 1 },
};

const descriptionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } },
  initialInactive: { opacity: 0.5, y: 20 },
};

export default function ProcessSection({
  sectionHeading,
  accentText,
  steps,
  lang,
}: ProcessSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setActiveStep(0), 500);
      return () => clearTimeout(timer);
    } else {
      setActiveStep(-1);
    }
  }, [isInView]);

  useEffect(() => {
    if (isInView && activeStep < steps.length - 1 && activeStep >= 0) {
      const timer = setTimeout(() => setActiveStep((prev) => prev + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView, activeStep, steps.length]);

  return (
    <motion.div
      ref={sectionRef}
      className="py-16 text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1, transition: { duration: 1 } } : {}}
    >
      <div className="container mx-auto px-4 text-center">
        <div className="space-y-2 mb-8">
          <SectionHeading className="text-3xl font-bold tracking-tight uppercase">
            {sectionHeading}
          </SectionHeading>
          <AccentText className="normal-case">{accentText}</AccentText>
        </div>

        <div className="flex justify-around mb-8 relative">
          {Array.from({ length: steps.length }).map((_, index) => (
            <React.Fragment key={index}>
              <motion.div
                className={`relative w-12 h-12 rounded-full border-2 ${
                  activeStep >= index
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-600"
                } flex items-center justify-center font-semibold bg-background-light dark:bg-background-dark`}
                variants={stepVariants}
                initial="initial"
                animate={activeStep >= index ? "animate" : "initial"}
              >
                {steps[index].icon ? (
                  <span className="text-2xl">{steps[index].icon}</span>
                ) : (
                  index + 1
                )}
              </motion.div>
             {/*  {index < steps.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-300 absolute top-1/2 left-full -translate-y-1/2" />
              )} */}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 md:gap-y-12 px-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={descriptionVariants}
              initial="initial"
              animate={activeStep >= index ? "animate" : "initialInactive"}
            >
              <h3 className="text-xl font-semibold mb-2 text-brand-primary-light dark:text-text-dark">
                {step.heading}
              </h3>
              <motion.p className="text-white-600 text-sm">
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}