"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";

import {
  textVariants,
  textContainerVariants,
  ButtonVariants,
  imageVariants,
} from "@/lib/motions";
import ButtonAtom from "@/components/atoms/ButtonAtom";
import HeadingAtom from "@/components/atoms/HeadingAtom";
import CreativeCore from "@/components/molecules/CreativeCore";

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
    <LazyMotion features={domAnimation}>
      <section className="relative z-10 py-24 bg-background-light dark:bg-background-dark gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 px-4 xs:px-5 sm:px-6 md:px-8 text-text-light dark:text-text-dark">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          {/* Left Column: Image */}
          <m.div
            className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6"
            initial="hidden"
            variants={imageVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <CreativeCore />
            <p className="text-center text-sm font-medium tracking-wide text-muted-foreground/80 max-w-xs mx-auto italic">
              &ldquo;Igniting the creative energy that makes your business glow
              globally.&rdquo;
            </p>
          </m.div>

          {/* Right Column: Text Content */}
          <m.div
            className="w-full md:w-1/2 mb-6 xs:mb-2 sm:mb-2"
            initial="hidden"
            variants={textContainerVariants}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <m.div variants={textVariants}>
              <HeadingAtom
                className="uppercase text-heading"
                highlight={sectionHeading}
                title={""}
                variant="split"
              />
            </m.div>
            <m.div
              className="text-heading pb-2 xs:pb-1 sm:pb-4"
              variants={textVariants}
            >
              <HeadingAtom
                className="text-text-light dark:text-text-dark"
                size="sm"
                title={accentText}
                variant="gradient"
              />
            </m.div>
            {paragraphs.map((p, i) => (
              <m.div key={i} variants={textVariants}>
                <p className="text-body">{p}</p>
                <br />
              </m.div>
            ))}
            <m.div className="pt-6" variants={ButtonVariants}>
              <Link href={buttonUrl} />
              <ButtonAtom shimmer size="md" variant="primary">
                {buttonText}
              </ButtonAtom>
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
