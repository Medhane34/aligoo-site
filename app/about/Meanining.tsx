"use client";
import React, { useState, useRef } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const MeaniningSection = () => {
  const [, setIsPronunciationHovered] = useState(false);
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const paragraphContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const taglineVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.9, ease: "easeInOut" },
    },
  };

  const pronunciationAudioPath = "/aligoo-pro.mp4";

  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="relative py-24 bg-background-light dark:bg-background-dark p-12">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-size-[200%_200%]" />
      <div className="container mx-auto text-center">
        {/* pronounciation heading  */}
        <motion.div
          aria-label="Play pronunciation audio"
          className="relative inline-block cursor-pointer"
          initial="hidden"
          role="button"
          tabIndex={0}
          variants={headingVariants}
          viewport={{ once: true }}
          whileInView="visible"
          onClick={() => {
            setIsPronunciationHovered(true);
            if (audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsPronunciationHovered(true);
              if (audioRef.current) {
                audioRef.current.play().catch(() => {});
              }
            }
          }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold text-text-light dark:text-text-dark mb-2"
            variants={headingVariants}
          >
            Aligoo{" "}
            <span className="text-sm font-normal text-text-light dark:text-text-dark">
              /ˈæ.lɪ.guː/
            </span>{" "}
            (verb): To Create With <span className="text-pink-500">Soul</span>.
          </motion.h2>
          <motion.div
            className="flex items-center justify-center space-x-1 text-text-light dark:text-text-dark"
            variants={headingVariants}
          >
            <SpeakerWaveIcon className="h-4 w-4" />
            <span className="underline">[ah-lee-goo]</span>
          </motion.div>
          <audio ref={audioRef} src={pronunciationAudioPath}>
            <track kind="captions" label="English captions" srcLang="en" />
          </audio>
        </motion.div>
        {/* The defination  */}
        <motion.div
          className="mt-8 text-lg md:text-xl text-text-light dark:text-text-dark leading-relaxed"
          initial="hidden"
          variants={paragraphContainerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.p variants={paragraphVariants}>
            <strong>Aligoo</strong> is a word we made up.
          </motion.p>
          <motion.p variants={paragraphVariants}>
            It means{" "}
            <em className="text-pink-600 font-semibold">
              to put a soul in your craft, and to deliver beyond expectation.
            </em>
          </motion.p>
          <motion.p className="mt-4" variants={paragraphVariants}>
            It’s how we design, write, plan, launch, and show up for our
            clients.
          </motion.p>
          <motion.p variants={paragraphVariants}>
            With intention. With pride. And always with a little extra.
          </motion.p>
          <motion.p className="mt-6" variants={paragraphVariants}>
            You don’t just get a service.
          </motion.p>
          <motion.p variants={paragraphVariants}>
            You get the{" "}
            <strong className="text-pink-600 font-semibold">
              Aligoo touch
            </strong>
            .
          </motion.p>
        </motion.div>
        {/* The defination  */}

        <motion.p
          className="mt-12 text-sm text-gray-500 italic"
          initial="hidden"
          variants={taglineVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          A word born in Addis. A mindset made for the world.
        </motion.p>
      </div>
    </div>
  );
};

export default MeaniningSection;
