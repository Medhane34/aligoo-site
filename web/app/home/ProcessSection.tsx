// components/sections/ProcessSection.tsx
"use client";
import React, { useRef } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "framer-motion";

import HeadingAtom from "@/components/atoms/HeadingAtom";

export interface ProcessStep {
  icon: string;
  heading: string;
  description: string;
}

export interface ProcessSectionProps {
  sectionHeading: string;
  accentText: string;
  steps: ProcessStep[];
  lang: "en" | "am";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ProcessSection({
  sectionHeading,
  accentText,
  steps,
  lang,
}: ProcessSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Animate the line width/height based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden"
    >
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 flex flex-col items-center gap-6">
          {/*  <BadgeAtom
            variant="filled"
            color="blue"
            icon={<Layers className="w-3.5 h-3.5" />}
          >
            How We Work
          </BadgeAtom> */}

          <HeadingAtom
            align="center"
            as="h2"
            className="max-w-4xl mx-auto"
            highlight={accentText}
            size="lg"
            title={sectionHeading}
            variant="split"
          />
        </div>

        {/* Steps Container */}
        <LazyMotion features={domAnimation}>
          <m.div
            className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8"
            initial="hidden"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
            whileInView="visible"
          >
            {/* Connector Line (Desktop - Horizontal) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-neutral-200 dark:bg-neutral-800 -z-10">
              <m.div
                className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 origin-left"
                style={{ width: lineWidth }}
              />
            </div>

            {/* Connector Line (Mobile - Vertical) */}
            <div className="md:hidden absolute top-0 left-8 w-0.5 h-full bg-neutral-200 dark:bg-neutral-800 -z-10">
              <m.div
                className="w-full bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500 origin-top"
                style={{ height: lineHeight }}
              />
            </div>

            {steps.map((step, index) => {
              const emojis = ["🚀", "📅", "📄", "🤝"];
              const displayIcon = emojis[index] || step.icon;

              return (
                <m.div
                  key={index}
                  className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-8 group"
                  variants={stepVariants}
                >
                  {/* Icon Container */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-3xl shadow-lg shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300 z-10 relative text-white">
                      {displayIcon}
                    </div>
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 rounded-full bg-orange-500/40 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 md:text-center pt-2 md:pt-0">
                    <div className="flex items-center md:justify-center gap-3 mb-3">
                      <span className="text-4xl font-black text-neutral-200 dark:text-neutral-800 select-none">
                        0{index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">
                        {step.heading}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}
