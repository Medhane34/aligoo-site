"use client";
// components/sections/FaqSection.tsx
import React from "react";
import { motion } from "framer-motion";

import AccordionItem from "./AccordionItem";

import { SectionHeading, AccentText } from "@/components/ui/typography";

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

export default function FaqSection() {
  const faqs = [
    {
      question: "❓ How soon can I expect results?",
      answer:
        "💬 It depends on your offer, audience, and budget — but most campaigns see traction within 1–2 weeks. That said, we usually run tests for 2–4 weeks before scaling to ensure we're making smart decisions based on real data.",
    },
    {
      question:
        "❓ Will you handle everything or do I need to prepare anything?",
      answer:
        "💬 We handle the strategy, targeting, ad creation, and performance tracking. All we need from you is a strong offer, some input on your ideal customer, and access to your page/ad account. We make the rest easy.",
    },
    {
      question: "❓ Do you also create the visuals and copy?",
      answer:
        "💬 Yes — we craft ad copy, design creatives, and even edit short-form video ads if needed. Everything is tested for performance, not just pretty looks.",
    },
    {
      question: "❓ What if the ads don’t work?",
      answer:
        "💬 No agency can guarantee sales — but we guarantee action. If a campaign isn’t converting, we’ll dig in, pivot, and test new angles. Our focus is on continuous improvement, not cookie-cutter solutions.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="max-w-(--breakpoint-xl) mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column - Static Content */}
        <motion.div
          className="lg:pr-8"
          initial="hidden"
          variants={leftColumnVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.div
            className="text-sm font-semibold uppercase tracking-wider mb-2"
            variants={leftItemVariants}
          >
            <SectionHeading className="text-heading uppercase">
              ❓You’ve Got Questions{" "}
            </SectionHeading>
          </motion.div>
          <motion.div
            className="text-heading sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
            variants={leftItemVariants}
          >
            <AccentText className="normal-case">
              {" "}
              Let’s Clear Things Up
            </AccentText>
          </motion.div>
          <motion.p
            className="xl:text-body sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            variants={leftItemVariants}
          >
            No fluff, no vague answers. Just honest responses to the most common questions we get about Facebook Ads and working with us.
          </motion.p>
          <motion.button
            className="w-[263px] h-10 px-[16px] py-[10px] text-small font-medium leading-5 bg-linear-to-r from-brand-primary-light to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary-darker rounded-full"
            variants={leftItemVariants}
          >
            👉 GOT MORE QUESTIONS ASK 
          </motion.button>
        </motion.div>

        {/* Right Column - FAQ Accordions */}
        <motion.div
          className="space-y-4 "
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
