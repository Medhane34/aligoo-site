// app/about/IntroSection.tsx
'use client'

import { motion } from "framer-motion"

export interface AboutIntroSectionProps {
  mainHeading: string
  introText: string
  founded: string
  focus: string
  campaignsLaunched: string
  momentsProudOf: string
  lang: 'en' | 'am'
}

export default function AboutIntroSection({
  mainHeading,
  introText,
  founded,
  focus,
  campaignsLaunched,
  momentsProudOf,
  lang,
}: AboutIntroSectionProps) {
  const isAmharic = lang === 'am'

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Main Heading */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`text-text-light dark:text-text-dark ${isAmharic ? 'font-amharicHeading text-5xl md:text-6xl' : 'font-bold text-4xl md:text-5xl'} leading-tight`}
        >
          {mainHeading}
        </motion.div>

        {/* Right Column: Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`space-y-8 text-text-light dark:text-text-dark ${isAmharic ? 'font-amharicBody text-lg' : 'text-base'}`}
        >
          <p className="leading-relaxed">{introText}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 opacity-80">
                🎯 Founded
              </h3>
              <p className="text-sm opacity-90">{founded}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 opacity-80">
                ✅ Focus
              </h3>
              <p className="text-sm opacity-90">{focus}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 opacity-80">
                🔴 Campaigns Launched
              </h3>
              <p className="text-sm opacity-90">{campaignsLaunched}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 opacity-80">
              💡 Moments We're Proud Of
            </h3>
            <p className="text-sm opacity-90">{momentsProudOf}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}