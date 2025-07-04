// components/FeaturedPostsSection.tsx
"use client";
import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AccentText, SectionHeading } from "@/components/ui/typography";
import Link from "next/link";
import {
  ButtonVariants,
  headerVariants,
  headerChildVariants,
  gridVariants,
  cardVariants,
} from "@/lib/motions";

import { CaseStudy } from "@/types/CaseStudyTypes";

type FeaturedPostsSectionProps = {
  posts: CaseStudy[];
  heading: string;
  subheading?: string;
};

const placeholderCaseStudy: CaseStudy = {
  _id: "placeholder",
  title: "Coming Soon",
  goalsSummary: "",
  challengeSummary: "",
  industry: "",
  excerpt:"",
  imageUrl: "https://heroui.com/images/card-example-4.jpeg",
  service: "Explore More",
  hasImage: true,
  hasService: true,
  slug: "#",
};

export default function FeaturedPostsSection({
  posts,
  heading,
  subheading,
}: FeaturedPostsSectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  const paddedPosts = [
    ...posts,
    ...Array(3 - posts.length).fill(placeholderCaseStudy),
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
          <SectionHeading className="text-heading uppercase">
            {heading}
          </SectionHeading>
        </motion.div>
        <motion.div variants={headerChildVariants}>
          <AccentText className="text-subheading normal-case">
            {subheading}
          </AccentText>
        </motion.div>
      </motion.div>

      <motion.div
        className="max-full gap-4 grid grid-cols-12 px-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={gridVariants}
      >
        {paddedPosts.map((post, index) => (
          <motion.div
            key={post._id + index}
            variants={cardVariants}
            whileHover="hover"
            className="col-span-12 sm:col-span-4 h-[200px] xs:h-[250px] sm:h-[350px] md:h-[320px] lg:h-[350px]"
          >
            <Link href={`/case-study/${post.slug}`} className="block h-full">
              <Card className="h-full outline-2 outline-offset-2 outline-blue-500">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                  <p className="text-small text-white/60 uppercase font-bold bg-brand-primary rounded-full p-1">
                    {post.industry}
                  </p>
                  <h4 className="text-white font-medium text-large text-left text-heading">
                    {post.title}
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt={post.title}
                  className="z-0 w-full h-full object-cover"
                  src={post.imageUrl}
                />
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
