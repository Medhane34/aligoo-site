"use client";
import React from "react";
import { motion } from "framer-motion";
import { Image } from "@heroui/image";

import {
  AccentText,
  SectionHeading,
  Paragraph,
} from "@/components/ui/typography";

const textVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const MeetThePeople = () => {
  return (
    <div className="py-16 w-full bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {" "}
      {/* Full width background for the section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className=" mx-auto px-4 text-center mb-8 text-text-light dark:text-text-dark"
      >
        <motion.div variants={textVariants}>
          <SectionHeading className="text-heading uppercase">
            Meet the Team{" "}
          </SectionHeading>
        </motion.div>
        <motion.div
          className="text-heading pb-2 xs:pb-1 sm:pb-4"
          variants={textVariants}
        >
          <AccentText className="normal-case">
            {" "}
            The Brains, The Heart, and The Hustle Behind Aligoo
          </AccentText>
        </motion.div>
      </motion.div>
      <div className=" w-full mx-auto px-4 grid grid-cols-1 md:grid-cols-2">
        {" "}
        {/* Removed gap-8 */}
        {/* First Row - Team Member 1 */}
        <div className="relative overflow-hidden">
          {" "}
          {/* Removed shadow-md */}
          {/* Image Placeholder */}
          <div className="">
            {/* Replace this div with your image */}
            {/* Example image */}
            <Image
              src="/avatar-1.jpeg" // Replace with your image path
              alt="Team Member 1"
              width="100%" // Attempt to make it full width using percentage
              height="100%" // Attempt to make it full height using percentage
              style={{ objectFit: "cover" }} // Add inline style for object-fit
              className="rounded-none"
            />
          </div>
          {/* Removed name and role overlay */}
        </div>
        {/* First Row - Team Member 2 */}
        <div className="relative  overflow-hidden">
          {" "}
          {/* Removed shadow-md */}
          {/* Image Placeholder */}
          <div className="aspect-w-1 aspect-h-1">
            {/* Replace this div with your image */}
            {/* Example image */}
            <Image
              src="/avatar-2.jpeg" // Replace with your image path
              alt="Team Member 1"
              width="100%" // Attempt to make it full width using percentage
              height="100%" // Attempt to make it full height using percentage
              style={{ objectFit: "cover" }} // Add inline style for object-fit
              className="rounded-none"
            />
          </div>
          {/* Removed name and role overlay */}
        </div>
        {/* Second Row - Team Member 3 */}
        <div className="relative  overflow-hidden">
          {" "}
          {/* Removed shadow-md */}
          {/* Image Placeholder */}
          <div className="aspect-w-1 aspect-h-1">
            {/* Replace this div with your image */}
            {/* Example image */}
            <Image
              src="/avatar-3.jpeg" // Replace with your image path
              alt="Team Member 1"
              width="100%" // Attempt to make it full width using percentage
              height="100%" // Attempt to make it full height using percentage
              style={{ objectFit: "cover" }} // Add inline style for object-fit
              className="rounded-none"
            />
          </div>
          {/* Removed name and role overlay */}
        </div>
        {/* Second Row - Team Member 4 */}
        <div className="relative  overflow-hidden">
          {" "}
          {/* Removed shadow-md */}
          {/* Image Placeholder */}
          <div className="aspect-w-1 aspect-h-1">
            {/* Replace this div with your image */}
            <Image
              src="/avatar-4.jpeg" // Replace with your image path
              alt="Team Member 1"
              width="100%" // Attempt to make it full width using percentage
              height="100%" // Attempt to make it full height using percentage
              style={{ objectFit: "cover" }} // Add inline style for object-fit
              className="rounded-none"
            />
          </div>
          {/* Removed name and role overlay */}
        </div>
      </div>
    </div>
  );
};

export default MeetThePeople;
