// components/sections/WorkSection.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Briefcase } from "lucide-react";

import HeadingAtom from "@/components/atoms/HeadingAtom";
import BadgeAtom from "@/components/atoms/BadgeAtom";
import ButtonAtom from "@/components/atoms/ButtonAtom";
import CardMolecule from "@/components/molecules/CardMolecule";

type CaseStudy = {
  _id: string;
  title: string;
  goalsSummary: string;
  challengeSummary: string;
  imageUrl: string;
  service: string;
  hasImage: boolean;
  hasService: boolean;
  slug: string;
  challenge?: string;
  outcome?: string;
};

type HomeCaseStudyWrapper = {
  casestudyPosts: CaseStudy[];
};

const placeholderCaseStudy: CaseStudy = {
  _id: "placeholder",
  title: "Coming Soon",
  imageUrl: "https://heroui.com/images/card-example-4.jpeg",
  service: "Explore More",
  hasImage: true,
  hasService: true,
  slug: "#",
  challenge: "Stay tuned for exciting new case studies!",
  outcome: "More amazing results are on the way!",
  goalsSummary: "We are working on something great.",
  challengeSummary: "New projects are being baked.",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
};

export default function WorkSection({ casestudyPosts }: HomeCaseStudyWrapper) {
  // Ensure we always have 5 items for the grid
  const paddedCaseStudyPosts = [
    ...casestudyPosts,
    ...Array(5 - casestudyPosts.length).fill(placeholderCaseStudy),
  ].slice(0, 5);

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <BadgeAtom
              variant="filled"
              color="orange"
              icon={<Briefcase className="w-3.5 h-3.5" />}
            >
              Our Portfolio
            </BadgeAtom>
            <HeadingAtom
              as="h2"
              size="xl"
              title="Real Projects."
              highlight="Real Impact."
              variant="split"
            />
            <p className="text-muted-foreground text-lg max-w-xl">
              Explore a selection of our recent work, showcasing our expertise in design, development, and digital strategy.
            </p>
          </div>

          <Link href="/works">
            <ButtonAtom
              variant="outline"
              size="lg"
              icon={<ArrowUpRight className="w-5 h-5" />}
              iconPosition="right"
              className="hidden md:flex border-foreground/20 text-foreground hover:bg-foreground/5"
            >
              View All Projects
            </ButtonAtom>
          </Link>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-6"
        >
          {paddedCaseStudyPosts.map((study, index) => {
            // Layout Logic:
            // First 3 items: 2 columns each (3 items * 2 = 6 total width)
            // Next 2 items: 3 columns each (2 items * 3 = 6 total width)
            const colSpanClass = index < 3 ? "md:col-span-2" : "md:col-span-3";
            const heightClass = index < 3 ? "h-[400px]" : "h-[450px]";

            return (
              <motion.div
                key={study._id + index}
                variants={cardItemVariants}
                className={`col-span-1 ${colSpanClass}`}
              >
                <Link href={`/case-study/${study.slug}`} className="block h-full">
                  <CardMolecule
                    variant="spotlight"
                    padding="none"
                    className={`relative ${heightClass} w-full group p-0 overflow-hidden border-0`}
                  >
                    {/* Background Image */}
                    <Image
                      src={study.imageUrl || "https://heroui.com/images/card-example-4.jpeg"}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Top Badge */}
                      <div className="self-start opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/10">
                          {study.service || "Case Study"}
                        </span>
                      </div>

                      {/* Bottom Text */}
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                          {study.title}
                        </h3>

                        {/* Slide-up Details */}
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                          <div className="overflow-hidden">
                            <p className="text-gray-300 text-sm line-clamp-3 pt-2 border-t border-white/20 mt-2">
                              {study.challengeSummary || study.goalsSummary || "Discover how we helped this client achieve their goals through innovative digital solutions."}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-brand-primary font-medium text-sm">
                              Read Case Study <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardMolecule>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Button (visible only on small screens) */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/works">
            <ButtonAtom
              variant="primary"
              size="lg"
              icon={<ArrowUpRight className="w-5 h-5" />}
              iconPosition="right"
            >
              View All Projects
            </ButtonAtom>
          </Link>
        </div>

      </div>
    </section>
  );
}
