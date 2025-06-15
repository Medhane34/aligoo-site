"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";

import { AccentText } from "@/components/ui/typography";
import { SectionHeading } from "@/components/ui/typography";
const processStepsData = [
  {
    heading: "👉 Get Started",
    description:
      "Fill out our contact form — tell us about your biz, your goals, your challenges, your wildest dreams (ok, maybe not all of them... yet). The more you share, the better we show up for you.",
  },
  {
    heading: "📅 Book a Call",
    description:
      "Once we get your info, we’ll reach out to lock in a discovery call. This is where we listen hard, ask the right questions, and map out your best next move. Strategy mode: activated. 🚀",
  },
  {
    heading: "📑 Get Your Proposal",
    description:
      "No copy-paste offers here. You’ll get a tailored game plan packed with smart strategies, clear deliverables, transparent pricing, and realistic timelines. No fluff. No surprises.",
  },
  {
    heading: "🏗️ Let’s Build Together",
    description:
      "When you say go, we get moving. Expect regular updates, smooth communication, and work that actually delivers results — not just pretty reports.",
  },
];

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

const dividerVariants = {
  initial: { width: 0, opacity: 0, backgroundColor: "transparent" },
  animate: {
    width: "100%",
    opacity: 1,
    backgroundColor: "hsl(var(--tw-colors-blue-500))",
    transition: { duration: 0.6, delay: 0.5 },
  },
};

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setActiveStep(0);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setActiveStep(-1);
    }
  }, [isInView]);

  useEffect(() => {
    if (
      isInView &&
      activeStep < processStepsData.length - 1 &&
      activeStep >= 0
    ) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isInView, activeStep, processStepsData.length]);

  return (
    <motion.div
      ref={sectionRef}
      className="py-16 text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1, transition: { duration: 1 } } : {}}
    >
      <div className="container mx-auto px-4 text-center ">
        <div className="space-y-2 mb-8">
          <SectionHeading className="text-3xl font-bold tracking-tight uppercase">
            {" "}
            Our Process{" "}
          </SectionHeading>
          <AccentText className="normal-case">
            How We Go From “Let’s Talk” to “Let’s Launch”{" "}
          </AccentText>
        </div>

        <div className="flex justify-around mb-8 relative">
          {Array.from({ length: processStepsData.length }).map((_, index) => (
            <React.Fragment key={index}>
              <motion.div
                className={`relative w-12 h-12 rounded-full border-2 ${
                  activeStep >= index
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-600"
                } flex items-center justify-center font-semibold`}
                variants={stepVariants}
                initial="initial"
                animate={activeStep >= index ? "animate" : "initial"}
              >
                {activeStep > index ? (
                  <CheckIcon className="w-6 h-6" />
                ) : (
                  index + 1
                )}
              </motion.div>
              {index < processStepsData.length - 1 && (
                <motion.div // Corrected line: only one motion.div
                  className="absolute top-1/2 left-[calc(100%+1rem)] -translate-y-1/2 h-0.5 bg-gray-300"
                  variants={dividerVariants}
                  initial="initial"
                  animate={activeStep > index ? "animate" : "initial"}
                  style={{
                    width:
                      activeStep > index ? "calc(calc(100% / 4) - 2rem)" : 0,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 md:gap-y-12 px-4">
          {processStepsData.map((step, index) => (
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
};

export default ProcessSection;
