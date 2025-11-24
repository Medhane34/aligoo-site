// app/[lang]/about/MeaningSection.tsx
'use client'

import React, { useRef, useState } from "react"
import { SpeakerWaveIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

type Props = {
  mainHeading: string        // e.g. "Aligoo /ˈæ.lɪ.guː/ (verb): To Create With Soul."
  pronunciation: string      // e.g. "[ah-lee-goo]"
  definitionLines: string[]  // 6 lines
  tagline: string
  audioUrl?: string
  lang: 'en' | 'am'
}

const MeaningSection = ({ mainHeading, pronunciation, definitionLines, tagline, audioUrl, lang }: Props) => {
  const [isPronunciationHovered, setIsPronunciationHovered] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  }

  const paragraphContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const paragraphVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  }

  const taglineVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.9, ease: "easeInOut" } },
  }

  const playAudio = () => {
    audioRef.current?.play().catch(() => {})
  }

  const isAmharic = lang === 'am'

  return (
    <div className="relative py-24 bg-background-light dark:bg-background-dark p-12">
      {/* Background Decorations — 100% identical to original */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-size-[200%_200%]" />
      <div className="bg-gradient-to-r from-[#FF595E] to-[#FF595E]/80 absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none" />
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent" />

      <div className="container mx-auto text-center">
        {/* Pronunciation Heading — EXACT same structure */}
        <motion.div
          className="relative inline-block cursor-pointer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
          role="button"
          tabIndex={0}
          aria-label="Play pronunciation audio"
          onClick={() => {
            setIsPronunciationHovered(true)
            playAudio()
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") playAudio()
          }}
        >
          <motion.h2
            className={`text-4xl md:text-6xl font-extrabold text-text-light dark:text-text-dark mb-2 ${
              isAmharic ? 'font-amharicHeading leading-snug' : ''
            }`}
            variants={headingVariants}
            dangerouslySetInnerHTML={{ __html: mainHeading }}
          />

          <motion.div
            className={`flex items-center justify-center space-x-1 text-text-light dark:text-text-dark ${
              isAmharic ? 'font-amharicBody text-lg' : ''
            }`}
            variants={headingVariants}
          >
            <SpeakerWaveIcon className="h-4 w-4" />
            <span className="underline">{pronunciation}</span>
          </motion.div>

          <audio ref={audioRef} src={audioUrl || "/aligoo-pro.mp4"} preload="auto">
            <track kind="captions" />
          </audio>
        </motion.div>

        {/* Definition Paragraphs — 100% identical layout */}
        <motion.div
          className={`mt-8 text-lg md:text-xl text-text-light dark:text-text-dark leading-relaxed ${
            isAmharic ? 'font-amharicBody text-2xl space-y-8' : ''
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={paragraphContainerVariants}
        >
          {definitionLines.map((line, i) => (
            <motion.p
              key={i}
              variants={paragraphVariants}
              className={i === 5 ? "mt-6" : i === 4 ? "mt-6" : ""}
              dangerouslySetInnerHTML={{ __html: line }}
            />
          ))}
        </motion.div>

        {/* Tagline — identical */}
        <motion.p
          className={`mt-12 text-sm text-gray-500 italic ${isAmharic ? 'font-amharicBody text-lg' : ''}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={taglineVariants}
        >
          {tagline}
        </motion.p>
      </div>
    </div>
  )
}

export default MeaningSection