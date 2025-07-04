"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionHeading, AccentText } from "@/components/ui/typography";
import IndustriesCarouselMobile from "@/components/work-section/IndustriesCarouselMobile";
import IndustriesGridDesktop from "@/components/work-section/IndustriesGridDesktop";
import { textVariants } from "@/lib/motions";

export interface Industry {
  name: string;
  emoji: string;
}
export interface IndustriesWeWorkedWithProps {
  sectionHeading: string;
  accentText: string;
  industries: Industry[];
}

const IndustriesWeWorkedWith = ({
  sectionHeading,
  accentText,
  industries = [],
}: IndustriesWeWorkedWithProps) => (
  <section className="bg-background-light dark:bg-background-dark md:py-24 overflow-hidden text-text-light dark:text-text-dark">
    <motion.div
      className="container mx-auto px-4 text-center"
      initial="hidden"
      viewport={{ once: true }}
      whileInView="visible"
    >
      <motion.div variants={textVariants}>
        <SectionHeading className="text-heading uppercase">
          {sectionHeading}
        </SectionHeading>
      </motion.div>
      <motion.div className="text-heading pb-2 xs:pb-1 sm:pb-4" variants={textVariants}>
        <AccentText className="normal-case">{accentText}</AccentText>
      </motion.div>
    </motion.div>
    <div className="block md:hidden">
      <IndustriesCarouselMobile industries={industries} />
    </div>
    <div className="hidden md:block">
      <IndustriesGridDesktop industries={industries} />
    </div>
  </section>
);

export default IndustriesWeWorkedWith;
