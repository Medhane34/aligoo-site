// app/about/ValuesSection.tsx
'use client'

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { SectionHeading, AccentText, Paragraph } from "@/components/ui/typography"
import { PrimaryButton } from "@/components/atoms/button"

export interface ValueCard {
  emoji: string
  title: string
  description: string
  bgColor: string
  textColor?: string
}

export interface ValuesSectionProps {
  sectionHeading: string
  accentText: string
  buttonText: string
  buttonUrl: string
  values: ValueCard[]
  lang: 'en' | 'am'
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
}

export default function ValuesSection({
  sectionHeading,
  accentText,
  buttonText,
  buttonUrl,
  values,
  lang,
}: ValuesSectionProps) {
  const isAmharic = lang === 'am'

  // Always expect exactly 5 cards (your design requires it)
  const [card1, card2, card3, card4, card5] = values

  return (
    <section className="py-20 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-8">
          {/* Row 1, Col 1: Heading + Button */}
          <div className="row-span-1 col-span-1 flex flex-col justify-between">
            <div>
              <SectionHeading
                className={`text-heading mb-4 ${isAmharic ? 'font-amharicHeading text-5xl' : 'text-4xl'}`}
              >
                {sectionHeading}
              </SectionHeading>
              <AccentText className={`normal-case text-lg ${isAmharic ? 'font-amharicBody text-2xl leading-relaxed' : ''}`}>
                {accentText}
              </AccentText>
            </div>

            <div className="mt-8">
              <Link href={buttonUrl}>
                <PrimaryButton size="lg" className="w-full sm:w-auto">
                  {buttonText}
                </PrimaryButton>
              </Link>
            </div>
          </div>

          {/* Card 1 */}
          {card1 && (
            <motion.div
              className=" bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 
                rounded-2xl shadow-lg flex flex-col justify-center
                hover:scale-[1.03] hover:shadow-2xl transition-all duration-300
                 
              "
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <h3 className={`font-bold text-2xl mb-2 text-text-light dark:text-text-dark ${isAmharic ? 'font-amharicHeading' : ''}`}>
                {card1.emoji} {card1.title}
              </h3>
              <p className={`text-base leading-relaxed text-text-light dark:text-text-dark ${isAmharic ? 'font-amharicBody text-lg' : ''}`}>
                {card1.description}
              </p>
            </motion.div>
          )}

          {/* Card 2 */}
          {card2 && (
            <motion.div
              className=" bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 
                rounded-2xl shadow-lg p-8 flex flex-col justify-center
                hover:scale-[1.03] hover:shadow-2xl transition-all duration-300
                 
              "
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <h3 className={`font-bold text-2xl mb-4 text-text-light dark:text-text-dark ${isAmharic ? 'font-amharicHeading' : ''}`}>
                {card2.emoji} {card2.title}
              </h3>
              <p className={`text-base leading-relaxed text-text-light dark:text-text-dark ${isAmharic ? 'font-amharicBody text-lg' : ''}`}>
                {card2.description}
              </p>
            </motion.div>
          )}

          {/* Card 3 */}
          {card3 && (
            <motion.div
              className=" bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 
                rounded-2xl shadow-lg p-8 flex flex-col justify-center
                hover:scale-[1.03] hover:shadow-2xl transition-all duration-300
                 
              "
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <h3 className={`font-bold text-2xl mb-4 text-text-light dark:text-text-dark ${isAmharic ? 'font-amharicHeading' : ''}`}>
                {card3.emoji} {card3.title}
              </h3>
              <p className={`text-base leading-relaxed text-text-light dark:text-text-dark ${isAmharic ? 'font-amharicBody text-lg' : ''}`}>
                {card3.description}
              </p>
            </motion.div>
          )}

          {/* Card 4 — Special dark card */}
          {card4 && (
            <motion.div
              className=" bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 
                rounded-2xl shadow-lg p-8 flex flex-col justify-center
                hover:scale-[1.03] hover:shadow-2xl transition-all duration-300
                
              "
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <h3 className={`font-bold text-2xl mb-6 text-text-light  ${isAmharic ? 'font-amharicHeading' : ''}`}>
                {card4.emoji} {card4.title}
              </h3>
              <Paragraph className={`text-lg leading-loose   ${isAmharic ? 'font-amharicBody text-xl' : ''}`}>
                {card4.description}
              </Paragraph>
            </motion.div>
          )}

          {/* Card 5 */}
          {card5 && (
            <motion.div
             className=" bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 
                rounded-2xl shadow-lg p-8 flex flex-col justify-center
                hover:scale-[1.03] hover:shadow-2xl transition-all duration-300
                 
              "
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <h3 className={`font-bold text-2xl mb-4 text-text-light dark:text-text-dark ${isAmharic ? 'font-amharicHeading' : ''}`}>
                {card5.emoji} {card5.title}
              </h3>
              <p className={`text-base leading-relaxed text-text-light dark:text-text-dark ${isAmharic ? 'font-amharicBody text-lg' : ''}`}>
                {card5.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}