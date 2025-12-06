// components/sections/ServiceSection.tsx
"use client";
import React from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import Image from "next/image"; // Added for iconUrl
import Link from "next/link";
import { motion } from "framer-motion";
import { AccentText, SectionHeading } from "@/components/ui/typography";
import BadgeAtom from "@/components/atoms/BadgeAtom";
import { Clock, Sparkles, Star } from "lucide-react";

export interface Service {
  title: string;
  description?: string;
  iconUrl?: string;
  link: string;
}

export interface ServiceColumn {
  title: string;
  description: string;
  services: Service[];
}

export interface ServiceSectionProps {
  sectionHeading: string;
  accentText: string;
  columns: ServiceColumn[];
  lang: 'en' | 'am'; // Added
}

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const columnContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const columnVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeInOut" } },
};

const accordionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

export default function ServiceSection({
  sectionHeading,
  accentText,
  columns,
  lang,
}: ServiceSectionProps) {
  return (
    <div className="py-16 overflow-hidden text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark">
      <div className="relative container mx-auto px-4">

        <div className="bg-gradient-to-r from-[#FF595E] to-[#FF595E]/80 absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
        <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
        <motion.div className="text-center mb-12 space-y-2 xs:space-y-4" variants={headingVariants}>

          <BadgeAtom
            variant="filled"
            color="red"
            icon={<Clock className="w-4 h-4" />}
          >
            our Services
          </BadgeAtom>
          <SectionHeading className="uppercase">
            {sectionHeading}
          </SectionHeading>
          <AccentText className="normal-case text-subheading">{accentText}</AccentText>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-4 mb-12" variants={columnContainerVariants}>
          {columns.map((col, i) => (
            <motion.div key={i} className="w-full md:w-auto md:flex-1 p-4 md:p-0 outline-none" variants={columnVariants}>
              <h2 className="text-subheading font-semibold mb-4 text-foreground">
                {col.title}
              </h2>
              <p className="mb-6 text-body text-muted-foreground">
                {col.description}
              </p>
              <Accordion showDivider={false}>
                {col.services.map((service, j) => (
                  <AccordionItem
                    key={j}
                    aria-label={service.title}
                    indicator={
                      <Link
                        className="text-pink-400 hover:text-pink-300 transition-colors"
                        href={service.link}
                        rel="noopener noreferrer"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>&rarr;</span>
                      </Link>
                    }
                    startContent={
                      service.iconUrl && (
                        <Image
                          src={service.iconUrl}
                          alt={service.title}
                          width={32}
                          height={32}
                          className="rounded-lg"
                        />
                      )
                    }
                    title={
                      <span className="hover:underline text-foreground">
                        {service.title}
                      </span>
                    }
                  /* variants={accordionVariants} */
                  >
                    <div className="text-muted-foreground">
                      {service.description}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}