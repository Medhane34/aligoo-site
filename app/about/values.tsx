// components/about/ValuesSection.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeading, AccentText } from "@/components/ui/typography";
import { MyButton } from "@/components/custom/extendVariants";
import { PrimaryButton } from "@/components/atoms/button";

export interface ValueCard {
  emoji: string;
  title: string;
  description: string;
  bgColor: string;
  textColor?: string;
}

export interface ValuesSectionProps {
  sectionHeading: string;
  accentText: string;
  buttonText: string;
  buttonUrl: string;
  values: ValueCard[];
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export default function ValuesSection({
  sectionHeading,
  accentText,
  buttonText,
  buttonUrl,
  values,
}: ValuesSectionProps) {
  // Ensure we have at least 5 cards for the layout
  const [card1, card2, card3, card4, card5] = values;

  return (
<section className="sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6">
          {/* Row 1, Col 1: Heading, subheading, button */}
          <div className="row-span-1 col-span-1 flex flex-col justify-between bg-transparent">
            <SectionHeading className="text-heading mb-2">
              {sectionHeading}
            </SectionHeading>
            <AccentText className="normal-case mb-4">{accentText}</AccentText>
            <div className="mt-4">
              <Link href={buttonUrl}>
              <PrimaryButton>{buttonText}</PrimaryButton>
              </Link>
            </div>
          </div>
          {/* Row 1, Col 2: Card 1 */}
          {card1 && (
            <motion.div
              className={`
                row-span-1 col-span-1
                ${card1.bgColor} ${card1.textColor || "text-gray-900"}
                rounded-lg shadow-md p-6 flex flex-col justify-between
               
                transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl
              `}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {card1.emoji} {card1.title}
                </h3>
                <p className="text-sm">{card1.description}</p>
              </div>
            </motion.div>
          )}
          {/* Row 1, Col 3: Card 2 */}
          {card2 && (
            <motion.div
              className={`
                row-span-1 col-span-1
                ${card2.bgColor} ${card2.textColor || "text-gray-900"}
                rounded-lg shadow-md p-6 flex flex-col justify-between
               
                transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl
              `}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {card2.emoji} {card2.title}
                </h3>
                <p className="text-sm">{card2.description}</p>
              </div>
            </motion.div>
          )}
          {/* Row 2, Col 1: Card 3 */}
          {card3 && (
            <motion.div
              className={`
                row-span-1 col-span-1
                ${card3.bgColor} ${card3.textColor || "text-gray-900"}
                rounded-lg shadow-md p-6 flex flex-col justify-between
               
                transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl
              `}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {card3.emoji} {card3.title}
                </h3>
                <p className="text-sm">{card3.description}</p>
              </div>
            </motion.div>
          )}
          {/* Row 2, Col 2: Card 4 */}
          {card4 && (
            <motion.div
              className={`
                row-span-1 col-span-1
                ${card4.bgColor} ${card4.textColor || "text-text-light dark:text-text-dark"}
                rounded-lg shadow-md p-4 flex flex-col justify-between
                 dark:bg-white
                transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl
              `}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div>
                <h3 className="font-semibold text-lg mb-2 text-text-light dark:text-text-dark">
                  {card4.emoji} {card4.title}
                </h3>
                <p className="text-sm text-text-light dark:text-text-dark" >{card4.description}</p>
              </div>
            </motion.div>
          )}
          {/* Row 2, Col 3: Card 5 */}
          {card5 && (
            <motion.div
              className={`
                row-span-1 col-span-1
                ${card5.bgColor} ${card5.textColor || "text-gray-900"}
                rounded-lg shadow-md p-6 flex flex-col justify-between
                transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl
              `}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {card5.emoji} {card5.title}
                </h3>
                <p className="text-sm">{card5.description}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
