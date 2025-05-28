"use client";
import React from "react";
import { motion } from "framer-motion";

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const WhyFacebookAdsWork = () => {
  return (
    <div className="py-16 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Heading */}
      <div className="container mx-auto px-4 text-center mb-12">
        <motion.h2
          className="text-heading font-bold"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
        >
          Why Facebook Ads Still Work (If You Do Them{" "}
          <span className="text-brand-primary">Right</span>)
        </motion.h2>
      </div>

      {/* Two-Column Text */}
      <motion.div
        className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-2 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textContainerVariants}
      >
        {/* First Column */}
        <motion.div className="md:w-2/5 text body" variants={textVariants}>
          <p>
            Many believe Facebook Ads are outdated. We disagree. When executed
            strategically, they remain a powerful tool for reaching your
            audience and driving real results.
          </p>
        </motion.div>

        {/* Second Column */}
        <motion.div className="md:w-3/5 text-body" variants={textVariants}>
          <p>
            The key is in understanding that the platform has evolved. Gone are
            the days of simple boosting. Today, success with Facebook Ads hinges
            on a deep understanding of the{" "}
            <strong className="text-brand-primary">customer journey</strong>,
            crafting ads that speak directly to{" "}
            <em className="italic">user needs and desires</em>, and employing{" "}
            <strong className="text-brand-primary">precision targeting</strong>.
            Without these elements, your ad spend is likely going to waste.
          </p>
        </motion.div>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div
        className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={statsContainerVariants}
      >
        <motion.div variants={statVariants}>
          <div className="text-4xl font-bold">3.04B+</div>
          <p className="text-sm text-brand-primary">Monthly Active Users</p>
        </motion.div>
        <motion.div variants={statVariants}>
          <div className="text-4xl font-bold">1.98B+</div>
          <p className="text-sm text-brand-primary">Daily Active Users</p>
        </motion.div>
        <motion.div variants={statVariants}>
          <div className="text-4xl font-bold">69%</div>
          <p className="text-sm text-brand-primary">Adults Use Facebook</p>
        </motion.div>
        <motion.div variants={statVariants}>
          <div className="text-4xl font-bold">~$12</div>
          <p className="text-sm text-brand-primary">Avg. Ad Spend Per User</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhyFacebookAdsWork;
