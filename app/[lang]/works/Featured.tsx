"use client"
import { Image } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AccentText, SectionHeading, Paragraph } from "@/components/ui/typography";
import { ButtonVariants, imageVariants, textContainerVariants, textVariants } from "@/lib/motions";
import { MyButton } from "@/components/custom/extendVariants";
import NextImage from "next/image";
import { PrimaryButton } from "@/components/atoms/button";

export interface FeaturedCaseStudyProps {
  title?: string;
  excerpt?: string;
  imageUrl?: string;
  imageAlt?: string;
  slug?: string;
}

export default function FeaturedCaseStudy({
  title,
  excerpt,
  imageUrl,
  imageAlt,
  slug,
}: FeaturedCaseStudyProps) {
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
            <NextImage
              alt={imageAlt || "Featured case study"}
              className="object-cover w-full h-full"
              height={500}
              src={imageUrl || ""}
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
              {title}
            </SectionHeading>
          </motion.div>
          <motion.div className="pb-2 xs:pb-3 sm:pb-4" variants={textVariants}>
            <AccentText>Our Recent Featured Project</AccentText>
          </motion.div>
          <motion.div variants={textVariants}>
            {excerpt ? (
              <Paragraph className="text-body lg:text-body">
                {excerpt}
              </Paragraph>
            ) : (
              <Paragraph className="text-body lg:text-body">
                No excerpt available.
              </Paragraph>
            )}
          </motion.div>
          <motion.div className="pt-6" variants={ButtonVariants}>
            <Link href={`/case-study/${slug}`}>
            <PrimaryButton> 📖 Read Case Study</PrimaryButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
