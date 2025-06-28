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
export interface Service {
  title: string;
  description?: string;
  iconUrl?: string;
  link: string;
}
export interface ServiceColumn {
  title: string;
  description: string;
  services: Service[];
}
export interface ServiceSectionProps {
  sectionHeading: string;
  accentText: string;
  columns: ServiceColumn[];
}

export default function ServiceSection({
  sectionHeading,
  accentText,
  columns,
}: ServiceSectionProps) {

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
    <div className="py-16 overflow-hidden text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4">
        {/* ...section heading and accent text... */}
        <motion.div className="text-center mb-12 space-y-2 xs:space-y-4" /* ...motion props */>
          <SectionHeading className="text-heading uppercase">
            {sectionHeading}
          </SectionHeading>
          <AccentText className="normal-case text-heading">{accentText}</AccentText>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-4 mb-12">
          {columns.map((col, i) => (
            <motion.div key={i} className="w-full md:w-auto md:flex-1 p-4 md:p-0 outline-none text-white">
              <h2 className="text-2xl font-semibold mb-4 text-heading text-text-light dark:text-text-dark">
                {col.title}
              </h2>
              <p className="text-gray-400 mb-6 text-body text-text-light dark:text-text-dark">
                {col.description}
              </p>
              <Accordion showDivider={false}>
                {col.services.map((service, j) => (
                  <AccordionItem
                    key={j}
                    aria-label={service.title}
                    indicator={
                      <Link
                        className="text-pink-400 hover:text-pink-300 transition-colors"
                        href={service.link}
                        rel="noopener noreferrer"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* You can use an icon here if you want */}
                        <span>&rarr;</span>
                      </Link>
                    }
                    startContent={
                      service.iconUrl && (
                        <img
                          src={service.iconUrl}
                          alt={service.title}
                          className="w-8 h-8 rounded-lg"
                        />
                      )
                    }
                    title={
                      <span className="hover:underline text-text-light dark:text-text-dark">
                        {service.title}
                      </span>
                    }
                  >
                    <div className="text-text-light dark:text-text-dark">
                      {service.description}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}