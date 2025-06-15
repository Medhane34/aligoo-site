// components/Home/About.tsx
"use client";
import { Image } from "@heroui/image";
import { motion } from "framer-motion";

import { AccentText, SectionHeading } from "@/components/ui/typography";
import {
  textVariants,
  textContainerVariants,
  ButtonVariants,
  imageVariants,
} from "@/lib/motions";
import Link from "next/link";
import { MyButton } from "@/components/custom/extendVariants";

export default function AboutUsSection() {
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
              alt="Team collaboration"
              className="object-cover w-full h-full"
              height={500}
              src="/page-content-images/about-us-section.png"
              width={600}
            />
          </div>
        </motion.div>

        {/* Right Column: Text Content */}
        <motion.div
          className="w-full md:w-1/2  mb-6 xs:mb-2 sm:mb-2"
          initial="hidden"
          variants={textContainerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.div variants={textVariants}>
            <SectionHeading className="text-heading uppercase">
              Who Are We{" "}
            </SectionHeading>
          </motion.div>
          <motion.div
            className="text-heading pb-2 xs:pb-1 sm:pb-4"
            variants={textVariants}
          >
            <AccentText className="normal-case">
              {" "}
              Built in Addis. Obsessed with Growth.
            </AccentText>
          </motion.div>
          <motion.div variants={textVariants}>
            <p className="text-body">
              At Aligoo, we&apos;re not just a digital marketing agency — we’re
              your behind-the-scenes growth partners. Based in Addis Ababa and
              built with purpose, our mission is to help forward-thinking brands
              break through the noise with clarity, creativity, and measurable
              results.{" "}
            </p>
            <br />
          </motion.div>
          <motion.div variants={textVariants}>
            <p className="text-body">
              We blend strategic thinking with creative craftsmanship, turning
              ambitious ideas into campaigns, websites, and content that drive
              real business impact. Whether you’re a startup or scaling
              enterprise, we meet you where you are — and take you where you
              want to be.{" "}
            </p>
            <br />
          </motion.div>
          <motion.div variants={textVariants}>
            <p className="text-body">
              From pixels to performance, everything we touch is backed by data,
              driven by insight, and designed to make people care. When you work
              with us, expect more than deliverables. Expect
              transformation.{" "}
            </p>
          </motion.div>
          <motion.div className="pt-6" variants={ButtonVariants}>
            <Link href="/about-us" >
              <MyButton>👉 Read More About Us</MyButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
