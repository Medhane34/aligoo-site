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
    <div className="py-16 overflow-hiddden text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12 space-y-2 xs:space-y-4 "
          initial="hidden"
          variants={headingVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.div variants={headingVariants}>
        <SectionHeading className="text-heading uppercase">
              What We Do 
            </SectionHeading>
          </motion.div>
          <motion.div variants={headingVariants}>
            <AccentText className="normal-case text-heading">Smart Strategy. Clean Design. Powerful Execution.</AccentText>
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
            <h2 className="text-2xl font-semibold mb-4 text-heading text-text-light dark:text-text-dark">
              Strategy
            </h2>
            <p className="text-gray-400 mb-6 text-body text-text-light dark:text-text-dark">
              We dive deep into your brand, audience, and market — so every move
              we make is backed by insight, not guesswork.
            </p>
            <Accordion showDivider={false}>
              <AccordionItem
                key="1"
                aria-label="Digital Marketing Strategy"
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
                    src="/icons/Digital-Marketing-Icon.png"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm ">
                    press to read more
                  </span>
                }
                title={
                  <span className="hover:underline text-text-light dark:text-text-dark">
                    Digital Marketing Strategy
                  </span>
                }
              >
                <motion.div variants={accordionVariants} className="text-text-light dark:text-text-dark">
                  Make the right moves, in the right channels, at the right
                  time.{" "}
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
                    src="/icons/content-marketing-icon.png"
                  />
                }
                subtitle={<span className="text-gray-400 text-sm"></span>}
                title={
                  <span className="hover:underline text-text-light dark:text-text-dark">Content Strategy</span>
                }
              >
                <motion.div variants={accordionVariants} className="text-text-light dark:text-text-dark">
                  Build a brand story people actually care about.
                </motion.div>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Funnel Mapping"
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
                    src="/icons/funnel-mapping-icon.png"
                  />
                }
                subtitle={<span className="text-gray-400 text-sm"></span>}
                title={<span className="hover:underline text-text-light dark:text-text-dark">Funnel Mapping</span>}
              >
                <motion.div variants={accordionVariants} className="text-text-light dark:text-text-dark">
                  Design journeys that convert strangers into superfans.{" "}
                </motion.div>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* Design Column */}
          <motion.div
            className="w-full md:w-auto md:flex-1 p-4 md:p-0 text-white"
            variants={columnVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 text-heading text-text-light dark:text-text-dark">Design</h2>
            <p className="text-gray-400 mb-6 text-body text-text-light dark:text-text-dark">
              We don’t just make things look good — we design with purpose,
              personality, and performance in mind.
            </p>
            <Accordion showDivider={false}>
              <AccordionItem
                key="4"
                aria-label="Website Design"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/web-design"
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
                    src="/icons/web-design-icon.jpg"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm text-text-light dark:text-text-dark">
                    press to read more
                  </span>
                }
                title={<span className="hover:underline text-text-light dark:text-text-dark">Web Design</span>}
              >
                <motion.div variants={accordionVariants} className="text-text-light dark:text-text-dark">
                  Beautiful, blazing-fast websites that work hard for your
                  brand.
                </motion.div>
              </AccordionItem> 
              {/* Graphic Design Service */}
              <AccordionItem
                key="5"
                aria-label="Graphic Design "
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
                    src="/icons/graphic-design-icon.avif"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                  </span>
                }
                title={<span className="hover:underline text-text-light dark:text-text-dark">Graphic Design</span>}
              >
                <motion.div variants={accordionVariants} className="text-text-light dark:text-text-dark">
                  Scroll-stopping visuals that turn interest into clicks.
                </motion.div>
              </AccordionItem>
              {/* Brand Identity Design Service */}
              <AccordionItem
                key="6"
                aria-label="Brand Identity Design"
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
                  </span>
                }
                title={<span className="hover:underline text-text-light dark:text-text-dark">Brand Identity Design</span>}
              >
                <motion.div variants={accordionVariants} className="text-text-light dark:text-text-dark">
                  Brand Identity Design</motion.div>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* Execution Column */}
          <motion.div
            className="w-full md:w-auto md:flex-1 p-4 md:p-0 text-white"
            variants={columnVariants}
          >
            <h2 className="text-2xl font-semibold mb-4 text-heading text-text-light dark:text-text-dark">
              Execution
            </h2>
            <p className="text-gray-400 mb-6 text-body text-text-light dark:text-text-dark">
              This is where the magic happens. From ads to analytics, we bring
              your strategy to life — and keep optimizing for results.
            </p>
            <Accordion showDivider={false}>

              <AccordionItem
                key="7"
                aria-label="Facebook & Instagram Ads"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/facebook-ad"
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
                    src="/icons/Facebook-Ad-icon.png"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                  press to read more 
                  </span>
                }
                title={
                  <span className="hover:underline text-text-light dark:text-text-dark">
                    Facebook & Instagram Ads
                  </span>
                }
              >
                <motion.div variants={accordionVariants}>
                  Ride the wave of culture and reach Gen Z like never before. </motion.div>
              </AccordionItem>
              <AccordionItem
                key="8"
                aria-label="TikTok Ads"
                indicator={
                  <Link
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                    href="/services/tiktok-ad"
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
                    src="/icons/tiktokicon.png"
                  />
                }
                subtitle={
                  <span className="text-gray-400 text-sm">
                  </span>
                }
                title={<span className="hover:underline text-text-light dark:text-text-dark">TikTok Ads </span>}
              >
                <motion.div variants={accordionVariants} className="text-text-light dark:text-text-dark">
                  Ride the wave of culture and reach Gen Z like never before.</motion.div>
              </AccordionItem>
              <AccordionItem
                key="9"
                aria-label="SEO"
                indicator={
                  <Link
                    className=" hover:text-pink-300 transition-colors"
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
                    color="warning"
                    radius="lg"
                    src="icons/seo-icon.avif"
                  />
                }
          
                title={<span className="hover:underline text-text-light dark:text-text-dark">SEO</span>}
              >
                <motion.div variants={accordionVariants} className="text-text-light dark:text-text-dark">
                 Designing and executing effective SEO
                  campaigns to rank your site on first page  and drive conversions.
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
