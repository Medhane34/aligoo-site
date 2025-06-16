// components/MeetThePeople.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading, AccentText } from "@/components/ui/typography";

// Example team data
const team = [
  {
    name: "Daniel Aregawi",
    firstNameColor: "text-yellow-400",
    lastNameColor: "text-white",
    department: "LEADERSHIP",
    departmentColor: "bg-yellow-400 text-black",
    role: "Founder & Lead Strategist",
    bio: "🚀 Big-picture thinker, small-detail fixer. Built Aligoo to help bold brands grow louder, faster, and smarter.",
    image: "/team/avatar-daniel.jpg",
    imageAlt: "Michael Senior, Lead Developer",
  },
  {
    name: "Hannibal Tiruneh",
    firstNameColor: "text-orange-400",
    lastNameColor: "text-white",
    department: "CONTENT",
    departmentColor: "bg-orange-400 text-black",
    role: "Content Strategist",
    bio: "✍️ Writes & design like a human, thinks like an algorithm. Always chasing the next “aha!” content-ideas.",
    image: "/team/hannibal-avatar.jpg",
    imageAlt: "Content Strategist, Finance Lead",
  },
  {
    name: "Rediet Fikru",
    firstNameColor: "text-yellow-400",
    lastNameColor: "text-white",
    department: "OPERATIONS",
    departmentColor: "bg-yellow-400 text-black",
    role: "Operations Assistant",
    bio: "📅 Keeps the chaos in check and the deadlines sacred. Lives in Notion, dreams in checklists.",
    image: "/team/avatar-rediet.jpg",
    imageAlt: "Rediet Fikru, Operations Manager",
  },
  {
    name: "Robel Tesfaye",
    firstNameColor: "text-orange-400",
    lastNameColor: "text-white",
    department: "DEVELOPMEENT",
    departmentColor: "bg-orange-400 text-black",
    role: "Web Developer",
    bio: "💻 Codes with purpose, not just pixels. Breaks bugs, not hearts.",
    image: "/team/robel-avatar-2.jpg",
    imageAlt: "Robel, Marketing & Comms",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

const MeetThePeople: React.FC = () => (
  <section className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <SectionHeading className="text-heading uppercase mb-2">
          Meet the Team
        </SectionHeading>
        <AccentText className="normal-case">
          The Brains, The Heart, and The Hustle Behind Aligoo
        </AccentText>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((person, i) => (
          <motion.article
            key={person.name}
            className="flex flex-col items-center bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-lg p-6 group focus-within:ring-2 focus-within:ring-brand-primary transition-all duration-300"
            tabIndex={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={i}
            variants={cardVariants}
            aria-label={`${person.name}, ${person.role}, ${person.department}`}
          >
            {/* Department Tag */}
            <span
              className={`mb-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${person.departmentColor}`}
            >
              {person.department}
            </span>
            {/* Headshot */}
            <Image
              src={person.image}
              alt={person.imageAlt}
              width={120}
              height={120}
              className="rounded-full object-cover mb-4 border-4 border-gray-700 group-hover:border-brand-primary transition-all duration-300"
            />
            {/* Name */}
            <h3 className="text-lg font-bold mb-1">
              <span className={person.firstNameColor}>
                {person.name.split(" ")[0]}
              </span>{" "}
              <span className={person.lastNameColor}>
                {person.name.split(" ").slice(1).join(" ")}
              </span>
            </h3>
            {/* Role */}
            <p className="text-sm text-gray-400 mb-2">{person.role}</p>
            {/* Bio */}
            <p className="text-sm text-gray-300 text-center">{person.bio}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default MeetThePeople;
