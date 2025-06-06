"use client";
import React from "react";
import {
  CheckCircleIcon,
  Cog6ToothIcon,
  CpuChipIcon,
  LightBulbIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"; // Example icons from Heroicons
import { motion } from "framer-motion";

import {
  AccentText,
  SectionHeading,
  Paragraph,
} from "@/components/ui/typography";

const headingContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const headingItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const Values = () => {
  return (
    <div className="py-16 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Row */}
          <motion.div
            className="row-span-1"
            initial="hidden"
            variants={headingContainerVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <motion.div
              className="font-bold text-text-light dark:text-text-dark mb-4"
              variants={headingItemVariants}
            >
              <SectionHeading className="text-heading">WHAT WE STAND FOR</SectionHeading>
              
            </motion.div>
            <motion.div
              className="text-gray-600 text-body mb-6"
              variants={headingItemVariants}
            >
              <AccentText className="normal-case">Our Work Is Rooted in Purpose, Not Hype</AccentText>
            </motion.div>
            <motion.button
              className="w-[163px] h-10 px-[16px] py-[10px] text-small font-medium leading-5 bg-gradient-to-r from-brand-primary-light to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary-darker rounded-full"
              variants={headingItemVariants}
            >
              🤳 Get in touch
            </motion.button>
          </motion.div>

          {/* First Row - Card 1 */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            initial="hidden"
            variants={cardVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                💡 Clarity Over Clutter
              </h3>
              <p className="text-gray-600 text-sm">
                We say what we mean — no fluff, no jargon. Our communication
                stays simple, honest, and clear at every step.
              </p>
            </div>
          </motion.div>

          {/* First Row - Card 2 */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            initial="hidden"
            variants={cardVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                🎯 Strategy First, Always
              </h3>
              <p className="text-gray-600 text-sm">
                Before we design, we dig deep. Smart strategy leads the way so
                your brand gets real, lasting results.
              </p>
            </div>
          </motion.div>

          {/* Second Row - Card 3 */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            initial="hidden"
            variants={cardVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <div>

              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                🤝 People Before Pixels
              </h3>
              <p className="text-gray-600 text-sm">
                We’re not just in the business of marketing — we’re in the
                business of people. Empathy drives our process, and your goals
                guide our decisions.
              </p>
            </div>
          </motion.div>

          {/* Second Row - Card 4 */}
          <motion.div
            className="bg-brand-primary rounded-lg shadow-md p-6 flex flex-col justify-between"
            initial="hidden"
            variants={cardVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <div>

              <h3 className="font-semibold text-lg text-white-900 mb-2">
                ✨ Details Make the Magic
              </h3>
              <p className="text-white-600 text-sm">
                We obsess over the small things that others overlook. From
                pixels to punctuation, excellence lives in the details.
              </p>
            </div>
          </motion.div>

          {/* Second Row - Card 5 */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            initial="hidden"
            variants={cardVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <div>
              
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                🚀 Progress, Not Perfection
              </h3>
              <p className="text-gray-600 text-sm">
                We move fast, learn faster, and optimize everything. Growth is
                our compass — and momentum is the mission.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Values;
