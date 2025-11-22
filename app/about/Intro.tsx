"use client";
import { Paragraph } from "@/components/ui/typography";
import { motion } from "framer-motion";

export interface AboutIntroSectionProps {
  mainHeading: string;
  introText: string;
  founded: string;
  focus: string;
  campaignsLaunched: string;
  momentsProudOf: string;
}

export default function AboutIntroSection({
  mainHeading,
  introText,
  founded,
  focus,
  campaignsLaunched,
  momentsProudOf,
}: AboutIntroSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Main Heading */}
        <motion.div className="text-text-light dark:text-text-dark">
          <h2 className="text-heading font-bold leading-tight ">
            {mainHeading}
          </h2>
        </motion.div>
        {/* Right Column: Details */}
        <motion.div className="text-text-light dark:text-text-dark">
          <p className="text-lg mb-6">{introText}</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12">
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-text-light dark:text-text-dark">
                📍 Founded
              </h3>
              <p className="text-sm text-text-light dark:text-text-dark">{founded}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-text-light dark:text-text-dark">
                🧭 Focus
              </h3>
              <p className="text-sm text-text-light dark:text-text-dark">{focus}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-text-light dark:text-text-dark">
                🚀 Campaigns Launched
              </h3>
              <p className="text-sm text-text-light dark:text-text-dark">{campaignsLaunched}</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-text-light dark:text-text-dark">
              💡 Moments We&apos;re Proud Of
            </h3>
            <p className="text-sm text-text-light dark:text-text-dark">{momentsProudOf}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}