// components/case-studies/CaseStudyResults.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

import { AccentText, SectionHeading } from "@/components/ui/typography";
import {
  CaseStudyResultsData as ImportedResultsData,
  ResultStatItem,
} from "@/types/CaseStudyTypes";

// Defines the props interface
interface CaseStudyResultsProps {
  resultsData: ImportedResultsData;
}

// Animated Counter Component
function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Extract number and suffix (e.g., "18.2x" -> 18.2 and "x")
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const prefix = value.match(/^[^0-9.]/)?.[0] || "";

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView && !isNaN(numericValue)) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current && !isNaN(numericValue)) {
        // Handle integers vs floats
        const isFloat = numericValue % 1 !== 0;

        ref.current.textContent = isFloat
          ? latest.toFixed(1)
          : Math.round(latest).toString();
      } else if (ref.current) {
        // Fallback for non-numeric strings
        ref.current.textContent = value;
      }
    });
  }, [springValue, numericValue, value]);

  // If strictly non-numeric, just return the string
  if (isNaN(numericValue)) {
    return <span>{value}</span>;
  }

  return (
    <span className="flex items-baseline">
      {prefix}
      <span ref={ref} />
      {suffix}
    </span>
  );
}

export default function CaseStudyResults({
  resultsData,
}: CaseStudyResultsProps) {
  const {
    resultsHeading,
    resultsBody,
    resultsStat1,
    resultsStat2,
    resultsStat3,
  } = resultsData;

  const renderStatBlock = (stat: ResultStatItem | undefined, index: number) => {
    if (!stat || !stat.value || !stat.label) return null;

    const statColors = [
      "text-brand-primary",
      "text-brand-secondary",
      "text-blue-500",
    ];
    const currentColor = statColors[index % statColors.length];

    return (
      <motion.div
        className="text-left"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: index * 0.2 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h4
          className={`text-5xl md:text-6xl font-black tracking-tighter ${currentColor}`}
        >
          <Counter value={stat.value} />
        </h4>
        <h5 className="text-xl font-bold text-text-light dark:text-text-dark mt-2">
          {stat.label}
        </h5>
        {stat.description && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {stat.description}
          </p>
        )}
      </motion.div>
    );
  };

  if (!resultsHeading || !resultsBody) return null;

  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Narrative */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <AccentText>The Outcome</AccentText>
            <SectionHeading className="!text-left">
              {resultsHeading}
            </SectionHeading>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {resultsBody}
            </p>
          </motion.div>

          {/* Right: Stats */}
          <div className="grid gap-12 sm:grid-cols-1">
            {/* Render vertically on desktop/tablet to match design */}
            {renderStatBlock(resultsStat1, 0)}
            {renderStatBlock(resultsStat2, 1)}
            {renderStatBlock(resultsStat3, 2)}
          </div>
        </div>
      </div>
    </section>
  );
}
