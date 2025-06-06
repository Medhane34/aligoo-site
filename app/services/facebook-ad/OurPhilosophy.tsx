"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Divider } from "@heroui/divider";
import { AccentText, SectionHeading } from "@/components/ui/typography";

const headingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
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

const AdPhilosophy = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.5", "end 0.5"],
  });

  const step1Range = [0, 0.25];
  const step2Range = [0.25, 0.5];
  const step3Range = [0.5, 0.75];
  const step4Range = [0.75, 1];

  const getStepStyle = (range: number[]) => ({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    scale: useTransform(scrollYProgress, range, [0.8, 1.2], { clamp: false }),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    opacity: useTransform(scrollYProgress, range, [0.6, 1], { clamp: false }),
  });

  return (
    <div
      ref={timelineRef}
      className="py-16 bg-background-light dark:bg-background-dark "
    >
      {/* Top Heading and Subheading */}
      <motion.div
        className="container mx-auto px-4 text-center mb-12"
        initial="hidden"
        variants={headingContainerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <motion.div
          className="font-bold text-text-light dark:text-text-dark"
          variants={headingVariants}
        >
          <SectionHeading className="text-heading uppercase">
            The C4 Method™ — Click. Capture. Convert. Compound.{" "}
          </SectionHeading>
        </motion.div>
        <motion.div
          className="mt-4 text-lg text-gray-700 dark:text-gray-300"
          variants={headingVariants}
        >
           <AccentText className="normal-case">           The 4-stage ad system we use to turn strangers into superfans.
</AccentText>
        </motion.div>
      </motion.div>

      {/* Timeline */}
      <div className="relative container mx-auto px-4">
        <Divider
          className="absolute top-0 left-1/2 -ml-0.5 w-0.5 h-full bg-gray-300 dark:bg-gray-600 z-0"
          orientation="vertical"
        />

        {/* Click Step (Left) */}
        <div className="relative mb-12 md:flex md:items-center md:justify-start">
          <motion.div
            className="absolute top-0 left-1/2 -ml-4 w-6 h-6 rounded-full bg-pink-500 z-10 flex items-center justify-center text-white font-semibold text-small"
            style={getStepStyle(step1Range)}
          >
            1
          </motion.div>
          <motion.div
            className="mt-4 md:mr-8 md:text-left md:w-1/2"
            initial="hidden"
            variants={stepVariantsLeft}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <h3 className="text-heading font-semibold text-brand-primary-light dark:text-white mb-2">
              Click
            </h3>
            <p className=" text-body text-gray-700 dark:text-gray-300 text-text-light dark:text-text-dark">
              We create thumb-stopping ads that get attention, fast.
              Visual-first, message-driven, tailored to pain and desire.
            </p>
          </motion.div>
        </div>

        {/* Capture Step (Right) */}
        <div className="relative mb-12 md:flex md:items-center md:justify-end">
          <motion.div
            className="absolute top-0 left-1/2 -ml-4 w-6 h-6 rounded-full bg-blue-500 z-10 flex items-center justify-center text-white font-semibold"
            style={getStepStyle(step2Range)}
          >
            2
          </motion.div>
          <motion.div
            className="mt-4 md:ml-8 md:text-right md:w-1/2"
            initial="hidden"
            variants={stepVariantsRight}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <h3 className="text-heading font-semibold text-brand-primary-light dark:text-white dark:text-white mb-2">
              Capture
            </h3>
            <p className=" text-body text-gray-700 dark:text-gray-300">
              We don’t let interest go to waste. We drive clicks to custom-built
              funnels that turn curiosity into action.
            </p>
          </motion.div>
        </div>

        {/* Convert Step (Left) */}
        <div className="relative mb-12 md:flex md:items-center md:justify-start">
          <motion.div
            className="absolute top-0 left-1/2 -ml-4 w-6 h-6 rounded-full bg-green-500 z-10 flex items-center justify-center text-white font-semibold"
            style={getStepStyle(step3Range)}
          >
            3
          </motion.div>
          <motion.div
            className="mt-4 md:mr-8 md:text-left md:w-1/2"
            initial="hidden"
            variants={stepVariantsLeft}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <h3 className="text-heading font-semibold text-brand-primary-light dark:text-white dark:text-white mb-2">
              Convert
            </h3>
            <p className="text-body text-gray-700 dark:text-gray-300">
              We nurture leads with follow-ups that speak to their objections,
              not just their inbox.
            </p>
          </motion.div>
        </div>

        {/* Compound Step (Right) */}
        <div className="relative md:flex md:items-center md:justify-end">
          <motion.div
            className="absolute top-0 left-1/2 -ml-4 w-6 h-6 rounded-full bg-yellow-500 z-10 flex items-center justify-center text-white font-semibold"
            style={getStepStyle(step4Range)}
          >
            4
          </motion.div>
          <motion.div
            className="mt-4 md:ml-8 md:text-right md:w-1/2"
            initial="hidden"
            variants={stepVariantsRight}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <h3 className="text-heading font-semibold text-brand-primary-light dark:text-white dark:text-white mb-2">
              Compound
            </h3>
            <p className="text-body text-gray-700 dark:text-gray-300">
              We don’t stop at “it worked.” We test, optimize, and scale
              what&apos;s converting to get even more from your ad spend.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Headline and Description */}
      <motion.div
        className="container mx-auto px-4 text-center mt-16"
        initial="hidden"
        variants={headingContainerVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <motion.h2
          className="text-subheading font-bold text-gray-900 dark:text-white"
          variants={headingVariants}
        >
          Unlock Predictable Growth with the C4 Method™
        </motion.h2>
        <motion.p
          className="mt-4 text-body text-gray-700 dark:text-gray-300"
          variants={headingVariants}
        >
          Our signature 4-stage system is engineered to transform your Facebook
          ad spend into a consistent stream of loyal customers.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AdPhilosophy;
