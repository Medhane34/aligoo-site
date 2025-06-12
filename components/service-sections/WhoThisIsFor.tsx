"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { AccentText, SectionHeading } from "@/components/ui/typography";

interface WhoThisIsForSectionProps {
  heading: string;
  subheading?: string;
  highlightedPhrases: string[];
  introText?: string;
  outroText?: string;
}

const WhoThisIsForSection: React.FC<WhoThisIsForSectionProps> = ({
  heading,
  subheading,
  highlightedPhrases,
  introText,
  outroText,
}) => {
  const paragraphRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start center", "end center"],
  });

  const getHighlightStyle = (index: number, total: number) => {
    const start = index * (1 / total);
    const end = (index + 0.4) * (1 / total);

    return {
      scale: useTransform(scrollYProgress, [start, end], [1, 2.05]),
      color: useTransform(scrollYProgress, [start, end], ["#333", "#FF595E"]),
      fontWeight: useTransform(scrollYProgress, [start, end], [400, 600]),
      opacity: useTransform(scrollYProgress, [start, end], [0.2, 1]),
    };
  };

  const textVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  return (
    <div className="py-16 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <motion.div
        className="container mx-auto px-4 text-center mb-8"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="visible"
      >
        <motion.div variants={textVariants}>
          <SectionHeading className="text-heading uppercase">
            {heading}
          </SectionHeading>
        </motion.div>
        {subheading && (
          <motion.div
            className="text-heading pb-2 xs:pb-1 sm:pb-4"
            variants={textVariants}
          >
            <AccentText className="normal-case">{subheading}</AccentText>
          </motion.div>
        )}
      </motion.div>

      <div className="container mx-auto px-4 text-center">
        <p ref={paragraphRef} className="text-body justify-center">
          {introText && <>{introText} </>}
          {highlightedPhrases.map((phrase, i) => (
            <motion.span key={i} style={getHighlightStyle(i, highlightedPhrases.length)}>
              {phrase}
              {i !== highlightedPhrases.length - 1 && ", "}
            </motion.span>
          ))}
          {outroText && <> {outroText}</>}
        </p>
      </div>
    </div>
  );
};

export default WhoThisIsForSection;
