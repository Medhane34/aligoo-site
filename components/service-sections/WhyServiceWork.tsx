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
    transition: { staggerChildren: 0.2 },
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
    transition: { staggerChildren: 0.2 },
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

type Stat = {
  value: string;
  label: string;
};

type Props = {
  heading: string;
  highlight: string;
  paragraph1: string;
  paragraph2: string;
  stats: Stat[];
};

const WhyServiceWorks: React.FC<Props> = ({
  heading,
  highlight,
  paragraph1,
  paragraph2,
  stats,
}) => {
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
          {heading}{" "}
          <span className="text-brand-primary">{highlight}</span>
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
        <motion.div className="md:w-2/5 text-body" variants={textVariants}>
          <p>{paragraph1}</p>
        </motion.div>
        <motion.div className="md:w-3/5 text-body" variants={textVariants}>
          <p>{paragraph2}</p>
        </motion.div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={statsContainerVariants}
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={statVariants}>
            <div className="text-4xl font-bold">{stat.value}</div>
            <p className="text-sm text-brand-primary">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WhyServiceWorks;
