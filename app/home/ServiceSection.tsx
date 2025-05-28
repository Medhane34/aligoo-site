// components/sections/ServiceSection.tsx
"use client"; // This component needs to be client-side for interactivity (useState, useEffect, useRef)

import React from "react"; // Removed useRef, useState, useEffect as they are no longer needed
// Keep if you plan to use it for animations elsewhere
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Avatar } from "@heroui/avatar";
import Link from "next/link";
import { motion } from "framer-motion";

import { AccentText, SectionHeading } from "@/components/ui/typography";
// Removed classNames as pagination dots are gone

const ServiceSection = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const RightArrow = () => (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Removed carouselRef, activeIndex, setActiveIndex, numItems state and effect
  // Removed scrollToSlide and useEffect for scroll handling
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  const columnContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const accordionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="py-16 overflow-hiddden">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12 space-y-2 xs:space-y-4"
          initial="hidden"
          variants={headingVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.div variants={headingVariants}>
            <AccentText>Our Services</AccentText>
          </motion.div>
          <motion.div variants={headingVariants}>
            <SectionHeading className="text-heading">
              How We Work
            </SectionHeading>
          </motion.div>
        </motion.div>
        {/* Carousel Container - Now just a standard grid for all screen sizes */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-4 mb-12 gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 px-4 xs:px-5 sm:px-6 md:px-8"
          initial="hidden"
          variants={columnContainerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {/* Strategy Column */}
          <motion.div
            className="w-full md:w-auto md:flex-1 p-4 md:p-0 outline-none text-white"
            variants={columnVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 text-heading">
              Strategy
            </h2>
            <p className="text-gray-400 mb-6 text-body">
              We get to know your organisation and industry inside out, putting
              ourselves in your shoes so we can give you smart recommendations
              with a solid reason behind them.
            </p>
            <Accordion showDivider={false}>
              <AccordionItem
                key="1"
                aria-label="Brand Development"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors text-subheading"
                    href="/services/brand-development"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RightArrow />
                  </Link>
                }
                startContent={
                  <Avatar
                    isBordered
                    color="primary"
                    radius="lg"
                    src="/icons/strategy-brand.svg"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                    press to read more
                  </span>
                }
                title={
                  <span className="hover:underline">Brand Development</span>
                }
              >
                <motion.div variants={accordionVariants}>
                  {defaultContent} A detailed explanation of brand development,
                  including market research and identity creation.
                </motion.div>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Digital Marketing"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/digital-marketing"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RightArrow />
                  </Link>
                }
                startContent={
                  <Avatar
                    isBordered
                    color="success"
                    radius="lg"
                    src="/icons/strategy-marketing.svg"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                    press to read more
                  </span>
                }
                title={
                  <span className="hover:underline">Digital Marketing</span>
                }
              >
                <motion.div variants={accordionVariants}>
                  {defaultContent} Covering SEO, social media, and content
                  marketing strategies for online visibility.
                </motion.div>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Content Strategy"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/content-strategy"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RightArrow />
                  </Link>
                }
                startContent={
                  <Avatar
                    isBordered
                    color="warning"
                    radius="lg"
                    src="/icons/strategy-content.svg"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                    press to read more
                  </span>
                }
                title={
                  <span className="hover:underline">Content Strategy</span>
                }
              >
                <motion.div variants={accordionVariants}>
                  {defaultContent} Planning and creation of engaging content
                  tailored to your audience.
                </motion.div>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* Design Column */}
          <motion.div
            className="w-full md:w-auto md:flex-1 p-4 md:p-0 text-white"
            variants={columnVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 text-heading">Design</h2>
            <p className="text-gray-400 mb-6 text-body">
              Great design should look great, work seamlessly, and communicate
              clearly. Every element of your brand should feel connected, with
              thoughtful, lasting choices.
            </p>
            <Accordion showDivider={false}>
              <AccordionItem
                key="4"
                aria-label="Sustainable Web Design"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/sustainable-web-design"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RightArrow />
                  </Link>
                }
                startContent={
                  <Avatar
                    isBordered
                    color="primary"
                    radius="lg"
                    src="/icons/design-web.svg"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                    press to read more
                  </span>
                }
                title={
                  <span className="hover:underline">
                    Sustainable Web Design
                  </span>
                }
              >
                <motion.div variants={accordionVariants}>
                  {defaultContent} Crafting beautiful and efficient websites
                  with a focus on longevity and eco-friendliness.
                </motion.div>
              </AccordionItem>
              <AccordionItem
                key="5"
                aria-label="UX/UI Design"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/ux-ui-design"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RightArrow />
                  </Link>
                }
                startContent={
                  <Avatar
                    isBordered
                    color="success"
                    radius="lg"
                    src="/icons/design-uxui.svg"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                    press to read more
                  </span>
                }
                title={<span className="hover:underline">UX/UI Design</span>}
              >
                <motion.div variants={accordionVariants}>
                  {defaultContent} Creating intuitive and engaging user
                  experiences with visually appealing interfaces.
                </motion.div>
              </AccordionItem>
              <AccordionItem
                key="6"
                aria-label="Copywriting"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/copywriting"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RightArrow />
                  </Link>
                }
                startContent={
                  <Avatar
                    isBordered
                    color="warning"
                    radius="lg"
                    src="/icons/design-copywriting.svg"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                    press to read more
                  </span>
                }
                title={<span className="hover:underline">Copywriting</span>}
              >
                <motion.div variants={accordionVariants}>
                  {defaultContent} Crafting persuasive and clear content that
                  resonates with your target audience and drives action.
                </motion.div>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* Execution Column */}
          <motion.div
            className="w-full md:w-auto md:flex-1 p-4 md:p-0 text-white"
            variants={columnVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 text-heading">
              Execution
            </h2>
            <p className="text-gray-400 mb-6 text-body">
              A great website needs great design—just like a brand or strategy
              needs smart, sustainable, and SEO-focused execution to create a
              lasting impact and drive real results.
            </p>
            <Accordion showDivider={false}>
              <AccordionItem
                key="7"
                aria-label="Sustainable Web Development"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/sustainable-web-development"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RightArrow />
                  </Link>
                }
                startContent={
                  <Avatar
                    isBordered
                    color="primary"
                    radius="lg"
                    src="/icons/execution-development.svg"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                    press to read more
                  </span>
                }
                title={
                  <span className="hover:underline">
                    Sustainable Web Development
                  </span>
                }
              >
                <motion.div variants={accordionVariants}>
                  {defaultContent} Building robust and scalable web solutions
                  with modern technologies and best practices.
                </motion.div>
              </AccordionItem>
              <AccordionItem
                key="8"
                aria-label="Search Engine Optimisation"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/seo"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RightArrow />
                  </Link>
                }
                startContent={
                  <Avatar
                    isBordered
                    color="success"
                    radius="lg"
                    src="/icons/execution-seo.svg"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                    press to read more
                  </span>
                }
                title={
                  <span className="hover:underline">
                    Search Engine Optimisation
                  </span>
                }
              >
                <motion.div variants={accordionVariants}>
                  {defaultContent} Implementing strategies to improve your
                  website&apos;s visibility and ranking on search engines.
                </motion.div>
              </AccordionItem>
              <AccordionItem
                key="9"
                aria-label="Email Marketing"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/email-marketing"
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RightArrow />
                  </Link>
                }
                startContent={
                  <Avatar
                    isBordered
                    color="warning"
                    radius="lg"
                    src="/icons/execution-email.svg"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                    press to read more
                  </span>
                }
                title={<span className="hover:underline">Email Marketing</span>}
              >
                <motion.div variants={accordionVariants}>
                  {defaultContent} Designing and executing effective email
                  campaigns to engage your audience and drive conversions.
                </motion.div>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </motion.div>

        {/* Pagination Dots (Removed) */}
        {/* <div className="flex justify-center mt-8 md:hidden">
                    {Array.from({ length: numItems }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToSlide(index)}
                            className={classNames(
                                'w-2 h-2 rounded-full mx-1 transition-colors duration-300',
                                { 'bg-pink-500': index === activeIndex, 'bg-gray-600': index !== activeIndex }
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div> */}
      </div>
    </div>
  );
};

export default ServiceSection;
