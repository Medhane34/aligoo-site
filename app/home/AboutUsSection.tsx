// components/Home/About.tsx
"use client";
import { Image } from "@heroui/image";

import {
  AccentText,
  SectionHeading,
  Paragraph,
} from "@/components/ui/typography";

import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.7,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const ButtonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

export default function AboutUsSection() {
  return (
    <section className="relative z-10 py-24 bg-background-light dark:bg-background-dark gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 px-4 xs:px-5 sm:px-6 md:px-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Column: Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageVariants}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              isBlurred
              alt="Team collaboration"
              className="object-cover w-full h-full"
              height={500}
              src="https://heroui.com/images/hero-card-complete.jpeg"
              width={600}
            />
          </div>
        </motion.div>

        {/* Right Column: Text Content */}
        <motion.div
          className="w-full md:w-1/2 space-y-6 xs:space-y-2 mb-6 xs:mb-7 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textContainerVariants}
        >
          <motion.div variants={textVariants}>
            <AccentText>Who we are</AccentText>
          </motion.div>
          <motion.div
            variants={textVariants}
            className="text-heading pb-2 xs:pb-3 sm:pb-4"
          >
            <SectionHeading className="text-heading">
              Fueling Growth Through Strategy & Creativity
            </SectionHeading>
          </motion.div>
          <motion.div variants={textVariants}>
            <Paragraph className="text-body">
              At Buzz Digital Agency, we blend data-driven strategy with
              creative excellence. Our diverse team brings decades of experience
              in transforming B2B brands and building digital ecosystems that
              perform.
            </Paragraph>
          </motion.div>
          <motion.div variants={textVariants}>
            <Paragraph className="text-body">
              From messaging clarity to bold visuals and technical SEO, we
              provide everything you need to stand out in a crowded market. We
              believe in relationships, not just deliverables.
            </Paragraph>
          </motion.div>
          <motion.div variants={ButtonVariants}>
            <button
              className="justify-left px-8 py-3 border border-transparent text-left font-medium rounded-full text-white

 bg-gradient-to-r from-brand-primary-light to-brand-primary-dark // <-- NEW: Gradient using custom colors

 hover:from-brand-primary-dark hover:to-brand-primary-darker // <-- NEW: Hover state using custom colors

 shadow-lg transition-all duration-300"
            >
              Read More About Us 😎
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
