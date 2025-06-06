// components/Home/About.tsx
"use client";
import { Image } from "@heroui/image";
import { motion } from "framer-motion";

import {
  AccentText,
  SectionHeading,
  Paragraph,
} from "@/components/ui/typography";

// Define the type for the prop (same as CaseStudy type in CaseStudy.tsx)
type CaseStudy = {
  _id: string;
  title: string;
  imageUrl: string;
  service: string;
  hasImage: boolean;
  hasService: boolean;
  slug: string;
};

// Define the props for the component
type FetchCaseStudiesProps = {
  featured: CaseStudy;
};

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

export default function FetchCaseStudies({ featured }: FetchCaseStudiesProps) {
  return (
    <section className="relative z-10 py-24 bg-background-light dark:bg-background-dark gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 px-4 xs:px-5 sm:px-6 md:px-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Column: Image */}
        <motion.div
          className="w-full md:w-1/2"
          initial="hidden"
          variants={imageVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              isBlurred
              alt={featured.title || "Featured case study"}
              className="object-cover w-full h-full"
              height={500}
              src={
                featured.imageUrl ||
                "https://heroui.com/images/hero-card-complete.jpeg"
              }
              width={600}
            />
          </div>
        </motion.div>

        {/* Right Column: Text Content */}
        <motion.div
          className="w-full md:w-1/2 xs:space-y-2 mb-6 xs:mb-7 sm:mb-8"
          initial="hidden"
          variants={textContainerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.div variants={textVariants}>
            <SectionHeading className="text-heading uppercase">
              {featured.title}
            </SectionHeading>
          </motion.div>
          <motion.div className="pb-2 xs:pb-3 sm:pb-4" variants={textVariants}>
            <AccentText className="lowercase">
              OUR RECENT FEATURED PROJECT
            </AccentText>
          </motion.div>
          <motion.div variants={textVariants}>
            <p className="text-body">
              At Buzz Digital Agency, we blend data-driven strategy with
              creative excellence. Our diverse team brings decades of experience
              in transforming B2B brands and building digital ecosystems that
              perform.
            </p>
            <br />
          </motion.div>
          <motion.div variants={textVariants}>
            <p className="text-body">
              From messaging clarity to bold visuals and technical SEO, we
              provide everything you need to stand out in a crowded market. We
              believe in relationships, not just deliverables.
            </p>
          </motion.div>
          <motion.div 
          variants={ButtonVariants}
          className="pt-6">
            <button className="w-[163px] h-10 px-[16px] py-[10px] text-small font-medium leading-5 bg-gradient-to-r from-brand-primary-light to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary-darker rounded-full">
              📖 Read Case Study  
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
