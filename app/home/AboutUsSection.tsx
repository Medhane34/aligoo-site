"use client"

import { motion } from "framer-motion";
import { Image } from "@heroui/image";
import Link from "next/link";
import { SectionHeading, AccentText } from "@/components/ui/typography";
import { textVariants, textContainerVariants, ButtonVariants, imageVariants } from "@/lib/motions";
import { MyButton } from "@/components/custom/extendVariants";
import { PrimaryButton } from "@/components/atoms/button";
import ButtonAtom from "@/components/atoms/ButtonAtom";
import { ArrowRight, Gift } from "lucide-react";

export interface AboutUsSectionProps {
  sectionHeading: string;
  accentText: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  buttonUrl: string;
}

export default function AboutUsSection({
  sectionHeading,
  accentText,
  paragraphs,
  imageUrl,
  imageAlt,
  buttonText,
  buttonUrl,
}: AboutUsSectionProps) {
  return (
    <section className="relative z-10 py-24 bg-background-light dark:bg-background-dark gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 px-4 xs:px-5 sm:px-6 md:px-8 text-text-light dark:text-text-dark">
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
              alt={imageAlt}
              className="object-cover w-full h-full"
              height={500}
              src={imageUrl}
              width={600}
            />
          </div>
        </motion.div>

        {/* Right Column: Text Content */}
        <motion.div
          className="w-full md:w-1/2 mb-6 xs:mb-2 sm:mb-2"
          initial="hidden"
          variants={textContainerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.div variants={textVariants}>
            <HeadingAtom
              variant="split"
              title="Trusted by"
              highlight="Industry Leaders"
            />
            <SectionHeading className="text-heading uppercase">
              {sectionHeading}
            </SectionHeading>
          </motion.div>
          <motion.div className="text-heading pb-2 xs:pb-1 sm:pb-4" variants={textVariants}>
            <AccentText className="normal-case">{accentText}</AccentText>
          </motion.div>
          {paragraphs.map((p, i) => (
            <motion.div key={i} variants={textVariants}>
              <p className="text-body">{p}</p>
              <br />
            </motion.div>
          ))}
          <motion.div className="pt-6" variants={ButtonVariants}>
            <Link href={buttonUrl}>
            </Link>
            <ButtonAtom
              variant="primary"
              size="md"
              shimmer
            >
              {buttonText}
            </ButtonAtom>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
