"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, PhoneCall, Rocket, Search } from "lucide-react";

import HeadingAtom from "@/components/atoms/HeadingAtom";

const steps = [
  {
    icon: Search,
    title: "1. We Review",
    description:
      "Our team analyzes your request to understand your goals and market landscape.",
  },
  {
    icon: PhoneCall,
    title: "2. Discovery Call",
    description:
      "We schedule a quick chat to align on vision, scope, and immediate opportunities.",
  },
  {
    icon: Sparkles,
    title: "3. Strategy & Kickoff",
    description:
      "We propose a tailored plan, sign the deal, and launch your project!",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhatHappensNextSection() {
  return (
    <section
      className="py-16 md:py-24 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark border-t border-gray-200 dark:border-white/5"
      id="what-happens-next"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="mb-16 text-left"
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="text-brand-primary h-6 w-6" />
            <span className="font-semibold uppercase tracking-wider text-sm opacity-80">
              Process
            </span>
          </div>
          <HeadingAtom
            as="h2"
            size="md"
            title="What happens next?"
            variant="default"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-primary/30 transition-all duration-300 hover:bg-white/10"
              variants={itemVariants}
            >
              {/* Icon Container */}
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-brand-primary/10 text-brand-primary shadow-lg shadow-brand-primary/5 group-hover:scale-110 transition-transform duration-300">
                <step.icon size={32} />
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>

              {/* Decorative Number (Optional Background) */}
              <span className="absolute top-4 right-6 text-6xl font-black text-white/5 pointer-events-none select-none">
                0{index + 1}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
