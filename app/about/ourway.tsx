"use client";
import React, { useState } from "react";
import { Button } from "@heroui/button"; // Assuming Button is imported if not already globally available
import { Image } from "@heroui/image"; // Assuming Image component is available
import { motion } from "framer-motion";

const OurWayPoints = [
  {
    number: "01",
    heading: "Add your first product",
    description:
      "Effortlessly list your initial offerings with intuitive tools and guided setup.",
  },
  {
    number: "02",
    heading: "Customize your store",
    description:
      "Tailor your online presence to reflect your brand's unique style and identity.",
  },
  {
    number: "03",
    heading: "Set up payments",
    description:
      "Integrate secure and diverse payment options to ensure smooth transactions.",
  },
  // Add more points as needed for "Our Way"
];

const AligooMarketingFix = () => {
  const [activeTab, setActiveTab] = useState("problem"); // 'problem' or 'ourWay'

  const handleTabChange = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const tabNavVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  const problemLeftVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const problemRightContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const problemRightVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const ourWayImagesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const ourWayImageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const ourWayListContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const ourWayListVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="py-16 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 text-text-light dark:text-text-dark">
        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center border-gray-200"
          initial="hidden"
          variants={tabNavVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.button
            className={`py-2 px-4 font-semibold ${
              activeTab === "problem"
                ? "text-text-light dark:text-text-dark border-b-2 border-brand-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            variants={tabNavVariants}
            onClick={() => handleTabChange("problem")}
          >
            ❌ The Problem
          </motion.button>
          <motion.button
            className={`py-2 px-4 font-semibold ${
              activeTab === "ourWay"
                ? "text-text-light dark:text-text-dark border-b-2 border-brand-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            variants={tabNavVariants}
            onClick={() => handleTabChange("ourWay")}
          >
            ✅ Our Way
          </motion.button>
        </motion.div>

        {/* The problem Tab Content */}
        <div className="mt-8">
          {activeTab === "problem" && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8"
              initial="hidden"
              viewport={{ once: true }}
              whileInView="visible"
            >
              {/* Left: Image + Testimonial Box */}
              <motion.div className="relative" variants={problemLeftVariants}>
                <Image
                  alt="Merchant testimonial"
                  className="rounded-xl shadow-2xl object-cover z-0"
                  height={500}
                  src="https://heroui.com/images/hero-card-complete.jpeg"
                  width={500}
                />
                <motion.div
                  className="absolute m-[-25] bottom-0 right-[54] bg-gray-900 bg-opacity-90 text-white p-6 rounded-xl max-w-sm shadow-xl z-13"
                  variants={problemLeftVariants}
                >
                  <p className="text-lg italic">
                    “Aligoo gave us the clarity and execution power we needed to
                    scale fast.”
                  </p>
                  <p className="mt-4 font-semibold text-subheading">
                    Jessica Wise
                    <br />
                    <span className="text-small opacity-75">CEO, Hell Babes</span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Right: Headline, Text, Stats */}
              <motion.div
                className="space-y-6"
                variants={problemRightContainerVariants}
              >
                <motion.h2
                  className="text-4xl font-bold text-text-light dark:text-text-dark text-heading"
                  variants={problemRightVariants}
                >
                  Aligoo has your back
                </motion.h2>
                <motion.p
                  className="text-gray-600 dark:text-gray-400 text-body"
                  variants={problemRightVariants}
                >
                  Whether you need help dialing in your offer, ramping up
                  performance creatives, or scaling ad spend efficiently—our
                  team is built to deliver outcomes.
                </motion.p>
                <motion.div
                  className="space-y-4"
                  variants={problemRightContainerVariants}
                >
                  <motion.div variants={problemRightVariants}>
                    <h3 className="text-2xl font-semibold text-brand-primary">
                      $3M+
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Revenue driven for clients
                    </p>
                  </motion.div>
                  <motion.div variants={problemRightVariants}>
                    <h3 className="text-2xl font-semibold text-brand-primary">
                      200%+
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Average return on ad spend
                    </p>
                  </motion.div>
                  <motion.div variants={problemRightVariants}>
                    <h3 className="text-2xl font-semibold text-brand-primary">
                      0% B.S.
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      We care about results, not vanity
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* The Solution Tab Content */}

          {activeTab === "ourWay" && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-8"
              initial="hidden"
              viewport={{ once: true }}
              whileInView="visible"
            >
              {/* Left Column: Images Side by Side with Offset */}
              <motion.div
                className="flex justify-center items-center gap-12 relative"
                variants={ourWayImagesContainerVariants}
              >
                <motion.div
                  className="relative z-10"
                  variants={ourWayImageVariants}
                >
                  <Image
                    alt="E-commerce Dashboard"
                    className="rounded-xl shadow-2xl object-cover"
                    height={300}
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    width={300}
                  />
                </motion.div>
                <motion.div
                  className="relative -mt-8 -ml-8 z-0"
                  variants={ourWayImageVariants}
                >
                  <Image
                    alt="Cashier Interaction"
                    className="rounded-xl shadow-xl object-cover"
                    height={300}
                    src="https://heroui.com/images/card-example-4.jpeg"
                    width={300}
                  />
                </motion.div>
              </motion.div>

              {/* Right Column: Numbered List */}
              <motion.div
                className="space-y-8 text-left"
                variants={ourWayListContainerVariants}
              >
                {OurWayPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    variants={ourWayListVariants}
                  >
                    <span className="text-4xl font-bold text-brand-primary flex-shrink-0 mt-1">
                      {point.number}
                    </span>
                    <div>
                      <h3 className="text-subheading font-bold text-text-light dark:text-text-dark mb-1">
                        {point.heading}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-body">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
          {/* CTA Button - placed outside the tab content grid */}
          <div className="mt-12 text-center">
            <Button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              Take your shot
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AligooMarketingFix;
