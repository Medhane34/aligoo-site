"use client";
import { motion } from "framer-motion";
import { SectionHeading, AccentText } from "@/components/ui/typography";

export interface WhyUsReason {
  emoji: string;
  title: string;
  description: string;
  gradient: string;
  span: string; // e.g., "col-span-1", "md:col-span-2"
}
export interface WhyUsSectionProps {
  sectionHeading: string;
  accentText: string;
  reasons: WhyUsReason[];
}

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export default function WhyUsSection({
  sectionHeading,
  accentText,
  reasons,
}: WhyUsSectionProps) {

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Title and Subtext */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          variants={headingVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.div
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-light dark:text-text-dark mb-4"
            variants={headingVariants}
          >
            <SectionHeading className="text-heading uppercase">
              {sectionHeading}
            </SectionHeading>
          </motion.div>
          <motion.div
            className="text-lg sm:text-xl text-gray-300"
            variants={headingVariants}
          >
            <AccentText className="normal-case">{accentText}</AccentText>
          </motion.div>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
          initial="hidden"
          variants={cardContainerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              className={`
                relative overflow-hidden
                ${reason.span || "col-span-1 row-span-2"}
                bg-gradient-to-br ${reason.gradient}
                rounded-xl shadow-lg
                p-8 flex flex-col justify-between
                min-h-[220px] sm:min-h-[250px] lg:min-h-[280px]
                transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl
              `}
              variants={cardVariants}
            >
              <div className="relative z-10">
                <div
                  aria-label={reason.emoji}
                  className="text-5xl mb-4"
                  role="img"
                >
                  {reason.emoji}
                </div>
                <h3 className="text-heading font-bold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-200 text-body">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
