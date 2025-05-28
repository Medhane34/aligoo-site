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

const values = () => {
  return (
    <div className="py-16 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Row */}
          <motion.div
            className="row-span-1"
            initial="hidden"
            variants={headingContainerVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <motion.h2
              className="text-heading font-bold text-text-light dark:text-text-dark mb-4"
              variants={headingItemVariants}
            >
              High-impact services
            </motion.h2>
            <motion.p
              className="text-gray-600 text-body mb-6"
              variants={headingItemVariants}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              sit amet eros vel ipsum elementum.
            </motion.p>
            <motion.button
              className="nline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white

 bg-gradient-to-r from-brand-primary-light to-brand-primary-dark // <-- NEW: Gradient using custom colors

 hover:from-brand-primary-dark hover:to-brand-primary-darker // <-- NEW: Hover state using custom colors

 shadow-lg transition-all duration-300"
              variants={headingItemVariants}
            >
              Get in touch
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
              <CpuChipIcon className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Project management
              </h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <LightBulbIcon className="h-8 w-8 text-orange-500 mb-2" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Process development
              </h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <Cog6ToothIcon className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Operations & delegations
              </h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <UserGroupIcon className="h-8 w-8 text-white-500 mb-2" />
              <h3 className="font-semibold text-lg text-white-900 mb-2">
                Human resources
              </h3>
              <p className="text-white-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
              <CheckCircleIcon className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Quality assurance
              </h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default values;
