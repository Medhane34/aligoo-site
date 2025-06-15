// components/sections/FaqSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

import AccordionItem from "./AccordionItem";
import { SectionHeading, AccentText } from "@/components/ui/typography";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  eyebrow?: string;
  heading: string;
  subheading: string;
  ctaText?: string;
  ctaHref?: string; // <-- Add this line
  faqs: FaqItem[];
}

const leftColumnVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const leftItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const rightColumnVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const faqItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export default function FaqSection({
  eyebrow = "❓ You’ve Got Questions",
  heading = "Let’s Clear Things Up",
  subheading = "No fluff, no vague answers. Just honest responses to the most common questions we get about our services.",
  ctaText = "👉 GOT MORE QUESTIONS? ASK",
  faqs,
}: FaqSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column - Static Content */}
        <motion.div
          className="lg:pr-8"
          initial="hidden"
          variants={leftColumnVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {eyebrow && (
            <motion.div
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              variants={leftItemVariants}
            >
              <SectionHeading className="text-heading uppercase">
                {eyebrow}
              </SectionHeading>
            </motion.div>
          )}

          <motion.div
            className="text-heading sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
            variants={leftItemVariants}
          >
            <AccentText className="normal-case">{heading}</AccentText>
          </motion.div>

          <motion.p
            className="xl:text-body sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            variants={leftItemVariants}
          >
            {subheading}
          </motion.p>
          {ctaText && (
            <motion.div variants={leftItemVariants}>
              <Link href="/strategy-session" passHref>
                <button
                  className="w-[263px] h-10 px-[16px] py-[10px] text-small font-medium leading-5 bg-gradient-to-r from-brand-primary-light to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary-darker rounded-full"
                  type="button"
                >
                  {ctaText}
                </button>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column - FAQ Accordions */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          variants={rightColumnVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={faqItemVariants}>
              <AccordionItem answer={faq.answer} question={faq.question} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
