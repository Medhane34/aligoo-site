// components/ourprocess.tsx
"use client"; // Required for client-side components in Next.js App Router

import React from "react";
import Image from "next/image"; // For optimized image loading
import { CheckCircleIcon } from "@heroicons/react/24/solid"; // CheckCircleIcon from HeroIcons
import { motion } from "framer-motion"; // For animation

import HeadingAtom from "../atoms/HeadingAtom";
import BadgeAtom from "../atoms/BadgeAtom";

// Define the data structure for each step
interface Step {
  id: number;
  title: string;
  description: string;
}

// Define the props interface for the OurProcess component
interface OurProcessProps {
  id?: string;
  heading: string;
  subheading: string;
  imageSrc: string;
  imageAlt: string;
  steps: Step[];
}

const OurProcess: React.FC<OurProcessProps> = ({
  id,
  heading,
  subheading,
  imageSrc,
  imageAlt,
  steps,
}) => {
  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation (e.g., each step)
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start invisible and slightly below
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Fade in and slide up
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 }, // Start invisible and to the left
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }, // Fade in and slide right
  };

  return (
    <section
      className="py-16 sm:py-24 bg-background-light dark:bg-background-dark
text-text-light dark:text-text-dark"
      id={id} // <-- Apply id here
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            animate={{ opacity: 1, y: 0 }} // Animate to visible, original position
            initial={{ opacity: 0, y: -20 }} // Initial state (hidden, slightly above)
            transition={{ duration: 0.6 }} // Animation duration
          >
            <BadgeAtom color="yellow" variant="filled">
              {" "}
              PROCESS
            </BadgeAtom>
            <HeadingAtom
              align="center"
              highlight={heading}
              size="lg"
              title=""
              variant="split"
            />
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, delay: 0.2 }} // Staggered delay for sub-heading
          >
            <HeadingAtom
              align="center"
              size="sm"
              title={subheading}
              variant="default"
            />
          </motion.div>
        </div>

        {/* Content Area: Image and Steps */}
        <div className="md:grid md:grid-cols-2 md:gap-x-16 items-center">
          {/* Left Column: Image */}
          <motion.div
            className="flex justify-center mb-12 md:mb-0"
            initial="hidden"
            variants={imageVariants} // Apply image animation variants
            viewport={{ once: true, amount: 0.5 }} // Only animate once, when 50% of element is visible
            whileInView="show" // Animate when element enters viewport
          >
            <Image
              alt={imageAlt}
              className="rounded-3xl shadow-xl w-full max-w-md h-auto" // Styling from image analysis
              height={400} // Set appropriate height to maintain aspect ratio, Next.js Image will optimize
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize for different screen sizes
              src={imageSrc}
              style={{ objectFit: "cover" }} // Ensures image covers the area without distortion
              width={500} // Set appropriate width based on your design needs
            />
          </motion.div>

          {/* Right Column: Steps */}
          <motion.div
            initial="hidden"
            variants={containerVariants} // Apply container animation variants for staggered children
            viewport={{ once: true, amount: 0.2 }} // Animate once, when 20% of container is visible
            whileInView="show" // Animate when container enters viewport
          >
            <ul className="space-y-10">
              {" "}
              {/* Tailwind for vertical spacing between list items */}
              {steps.map((step) => (
                <motion.li
                  key={step.id}
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="shrink-0">
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="h-8 w-8 text-brand-primary"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold ">
                      STEP {step.id}: {step.title}
                    </h3>
                    <p className="mt-1 text-base">{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
