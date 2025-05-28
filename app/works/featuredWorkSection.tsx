"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button"; // ✅ Correct

import { motion, useInView } from "framer-motion"; // Import useInView
import { useRef } from "react"; // Import useRef

import { AccentText } from "@/components/ui/typography";
import { SectionHeading } from "@/components/ui/typography";

// Define variants for the section header
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 2.2,
    },
  },
};

const headerChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 2.6 } },
};

// Define variants for the cards
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } }, // Add hover variant here
};


export default function FeaturedWorkSection() {
  // Create a ref for the section
  const sectionRef = useRef(null);
  // Use useInView to detect when the section enters the viewport
  const isInView = useInView(sectionRef, {
    once: true, // Play animation only once
    margin: "0px 0px -100px 0px", // Trigger when the section is 100px from the bottom of the viewport
  });

  return (
    <section
      ref={sectionRef}
      className="px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 text-center bg-background-light dark:bg-background-dark"
    >
      {/* Section Header */}
      <motion.div
        animate={isInView ? "visible" : "hidden"} // Trigger based on inView
        className="space-y-1 sm:space-y-2 mb-5 xs:mb-6 sm:mb-8"
        initial="hidden"
        variants={headerVariants}
      >
        <motion.div variants={headerChildVariants}>
          <SectionHeading className="text-heading">Our Work</SectionHeading>
        </motion.div>
        <motion.div variants={headerChildVariants}>
          <AccentText className="text-subheading">What We Do</AccentText>
        </motion.div>
      </motion.div>

      <div className="max-full gap-4 grid grid-cols-12 px-8">
        <Card className="col-span-12 sm:col-span-4 h-[200px] xs:h-[250px] sm:h-[350px] md:h-[320px] lg:h-[350px] outline-2 outline-offset-2 outline-blue-500">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              What to watch
            </p>
            <h4 className="text-white font-medium text-large">
              Stream the Acme event
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://heroui.com/images/card-example-4.jpeg"
          />
        </Card>

        <Card className="col-span-12 sm:col-span-4 h-[200px] xs:h-[250px] sm:h-[300px] md:h-[320px] lg:h-[350px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Plant a tree
            </p>
            <h4 className="text-white font-medium text-large">
              Contribute to the planet
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://heroui.com/images/card-example-3.jpeg"
          />
        </Card>

        <Card className="col-span-12 sm:col-span-4 h-[200px] xs:h-[250px] sm:h-[300px] md:h-[320px] lg:h-[350px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">
              Supercharged
            </p>
            <h4 className="text-white font-medium text-large">
              Creates beauty like a beast
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://heroui.com/images/card-example-2.jpeg"
          />
        </Card>
      </div>
    </section>
  );
}
