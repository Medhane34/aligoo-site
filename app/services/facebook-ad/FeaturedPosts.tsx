// components/FeaturedFbWorkSection.tsx
"use client";
import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AccentText, SectionHeading } from "@/components/ui/typography";

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
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

type CaseStudy = {
  _id: string;
  title: string;
  imageUrl: string;
  service: string;
  hasImage: boolean;
  hasService: boolean;
  slug: string;
};

type FetchFbCaseProps = {
  fbcasestudyPosts: CaseStudy[];
};

const placeholderCaseStudy: CaseStudy = {
  _id: "placeholder",
  title: "Coming Soon",
  imageUrl: "https://heroui.com/images/card-example-4.jpeg",
  service: "Explore More",
  hasImage: true,
  hasService: true,
  slug: "#",
};

export default function FeaturedFbWorkSection({ fbcasestudyPosts }: FetchFbCaseProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  const paddedCaseStudyPosts = [
    ...fbcasestudyPosts,
    ...Array(3 - fbcasestudyPosts.length).fill(placeholderCaseStudy),
  ].slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 text-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
    >
      <motion.div
        animate={isInView ? "visible" : "hidden"}
        className="space-y-1 sm:space-y-2 mb-5 xs:mb-6 sm:mb-8"
        initial="hidden"
        variants={headerVariants}
      >
        <motion.div variants={headerChildVariants}>
          <SectionHeading className="text-heading uppercase">Real Campaigns. Real Wins.</SectionHeading>
        </motion.div>
        <motion.div variants={headerChildVariants}>
          <AccentText className="text-subheading normal-case">
            See How We’ve Turned Scrolls Into Sales
          </AccentText>
        </motion.div>
      </motion.div>

      <motion.div
        className="max-full gap-4 grid grid-cols-12 px-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={gridVariants}
      >
        {paddedCaseStudyPosts.map((post, index) => (
          <motion.div
            key={post._id + index}
            variants={cardVariants}
            whileHover="hover"
            className="col-span-12 sm:col-span-4 h-[200px] xs:h-[250px] sm:h-[350px] md:h-[320px] lg:h-[350px]"
          >
            <Card className="h-full outline-2 outline-offset-2 outline-blue-500">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-small text-white/60 uppercase font-bold bg-brand-primary rounded-full p-1">
                  {post.service || "Service"}
                </p>
                <h4 className="text-white font-medium text-large text-left text-heading">
                  {post.title}
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt={post.title || "Case study image"}
                className="z-0 w-full h-full object-cover"
                src={post.imageUrl || "https://heroui.com/images/card-example-4.jpeg"}
              />
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}