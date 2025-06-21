// components/Home/About.tsx
"use client";
import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import Link from "next/link";

import {
  AccentText,
  SectionHeading,
  Paragraph,
} from "@/components/ui/typography";
import { FetchCaseStudiesProps } from "@/types/CaseStudyTypes";
// Define the type for the prop (same as CaseStudy type in CaseStudy.tsx)
import {
  ButtonVariants,
  imageVariants,
  textContainerVariants,
  textVariants,
} from "@/lib/motions"; //import from motion variants
import { MyButton } from "@/components/custom/extendVariants";

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
            <AccentText>Our Recent Featured Project</AccentText>
          </motion.div>
          <motion.div variants={textVariants}>
            {featured.excerpt ? (
              <Paragraph className="text-body lg:text-body">
                {featured.excerpt}
              </Paragraph>
            ) : (
              <Paragraph className="text-body lg:text-body">
                No excerpt available.
              </Paragraph>
            )}
          </motion.div>

          <motion.div className="pt-6" variants={ButtonVariants}>
            <Link href={`/case-study/${featured.slug}`}>
              <MyButton className="w-[163px] h-10 px-[16px] py-[10px] text-small font-medium leading-5 bg-gradient-to-r from-brand-primary-light to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary-darker rounded-full">
                📖 Read Case Study
              </MyButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
