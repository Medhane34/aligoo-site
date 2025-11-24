'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { SectionHeading, AccentText } from "@/components/ui/typography"

type TeamMemberProps = {
  name: string
  role: string
  bio: string
  department?: string
  departmentColor?: string
  firstNameColor?: string
  lastNameColor?: string
  imageUrl?: string
  imageAlt?: string
}

type Props = {
  heading: string
  subheading: string
  members: TeamMemberProps[]
  lang: 'en' | 'am'
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
}

export default function TeamSection({ heading, subheading, members, lang }: Props) {
  const isAmharic = lang === 'am'

  return (
    <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeading className={`text-heading uppercase mb-4 ${isAmharic ? 'font-amharicHeading text-5xl' : ''}`}>
            {heading}
          </SectionHeading>
          <AccentText className={`text-lg ${isAmharic ? 'font-amharicBody text-2xl leading-relaxed' : ''}`}>
            {subheading}
          </AccentText>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((person, i) => {
            const [firstName, ...lastName] = person.name.split(" ")
            return (
              <motion.article
                key={person.name}
                className="flex flex-col items-center bg-gray-900/80 dark:bg-gray-800 rounded-3xl shadow-2xl p-8 group transition-all duration-300 hover:shadow-brand-primary/20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                variants={cardVariants}
              >
                {person.department && (
                  <span className={`mb-6 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${person.departmentColor || 'bg-brand-primary-light text-black'}`}>
                    {person.department}
                  </span>
                )}

                {person.imageUrl ? (
                  <Image
                    src={person.imageUrl}
                    alt={person.imageAlt || person.name}
                    width={140}
                    height={140}
                    className="rounded-full object-cover mb-6 border-4 border-gray-700 group-hover:border-brand-primary transition-all"
                  />
                ) : (
                  <div className="w-36 h-36 bg-gray-700 rounded-full mb-6" />
                )}

                <h3 className="text-2xl font-bold mb-2 text-center">
                  <span className={person.firstNameColor || "text-yellow-400"}>{firstName}</span>{" "}
                  <span className={person.lastNameColor || "text-white"}>{lastName.join(" ")}</span>
                </h3>

                <p className="text-brand-primary text-sm font-medium mb-3">{person.role}</p>
                <p className={`text-gray-300 text-center text-sm leading-relaxed ${isAmharic ? 'font-amharicBody text-lg' : ''}`}>
                  {person.bio}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}