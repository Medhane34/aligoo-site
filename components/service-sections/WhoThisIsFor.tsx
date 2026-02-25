"use client";
import { motion } from "framer-motion";
import React from "react";

import HeadingAtom from "../atoms/HeadingAtom";

interface WhoThisIsForSectionProps {
  id?: string;
  heading: string;
  subheading?: string;
  highlightedPhrases: string[];
  introText?: string;
  outroText?: string;
}

const highlightColors = [
  "#FF595E",
  "#1982C4",
  "#6A4C93",
  "#8AC926",
  "#FFCA3A",
  "#FF924C",
];

const WhoThisIsForSection: React.FC<WhoThisIsForSectionProps> = ({
  id,
  heading,
  subheading,
  highlightedPhrases,
  introText,
  outroText,
}) => {
  return (
    <div
      className="py-24 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
      id={id}
    >
      <motion.div
        className="container mx-auto px-4 text-center mb-8"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="visible"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.7, ease: "easeInOut" },
            },
          }}
        >
          <HeadingAtom
            align="center"
            highlight={heading}
            size="lg"
            title=""
            variant="split"
          />
        </motion.div>
        {subheading && (
          <motion.div
            className="text-heading pb-2 xs:pb-1 sm:pb-4"
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: "easeInOut" },
              },
            }}
          >
            <HeadingAtom
              align="center"
              size="sm"
              title={subheading}
              variant="split"
            />
          </motion.div>
        )}
      </motion.div>

      <div className="container mx-auto px-4 text-center">
        <motion.p
          className="text-body justify-center"
          initial="hidden"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.25,
              },
            },
          }}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {introText && <>{introText} </>}
          {highlightedPhrases.map((phrase, i) => (
            <motion.span
              key={i}
              className="inline-block mx-1"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  color: highlightColors[i % highlightColors.length],
                  fontWeight: 700,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              {phrase}
              {i !== highlightedPhrases.length - 1 && ", "}
            </motion.span>
          ))}
          {outroText && <> {outroText}</>}
        </motion.p>
      </div>
    </div>
  );
};

export default WhoThisIsForSection;
