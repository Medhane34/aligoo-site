'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import HeadingAtom from "../atoms/HeadingAtom"
import BadgeAtom from "../atoms/BadgeAtom"
import { Linkedin, Twitter, Github, Sparkles } from "lucide-react"

export type TeamMemberProps = {
  name: string
  role: string
  bio: string
  department?: string
  departmentColor?: string
  firstNameColor?: string
  lastNameColor?: string
  imageUrl?: string
  imageAlt?: string
  yearsOfExperience?: string
  superpower?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

type Props = {
  heading: string
  subheading: string
  members: TeamMemberProps[]
  lang: 'en' | 'am'
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full bg-white/5 hover:bg-brand-primary/20 text-muted-foreground hover:text-brand-primary transition-colors duration-300"
  >
    <Icon size={18} />
  </a>
)

export default function TeamSection({ heading, subheading, members, lang }: Props) {
  const isAmharic = lang === 'am'

  return (
    <section className="py-24 px-4 bg-background-light dark:bg-background-dark overflow-hidden relative">
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <HeadingAtom
            title={heading}
            size="xl"
            align="center"
            className={`mb-4 ${isAmharic ? 'font-amharicHeading' : ''}`}
            variant="gradient"
          />
          <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto ${isAmharic ? 'font-amharicBody text-2xl leading-relaxed' : ''}`}>
            {subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((person, i) => {
            const [firstName, ...lastName] = person.name.split(" ")
            return (
              <motion.article
                key={person.name}
                className="group relative flex flex-col bg-white/5 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-brand-primary/10 hover:-translate-y-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i}
                variants={cardVariants}
              >
                {/* Experience Badge */}
                {person.yearsOfExperience && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-brand-primary/10 backdrop-blur-md border border-brand-primary/20 px-3 py-1 rounded-full text-xs font-bold text-brand-primary flex items-center gap-1 shadow-lg">
                      <Sparkles size={12} className="fill-brand-primary/50" />
                      {person.yearsOfExperience}
                    </div>
                  </div>
                )}

                <div className="relative mb-6 mx-auto">
                  {/* Glowing Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-primary to-orange-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 scale-110" />

                  {person.imageUrl ? (
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-transparent transition-colors duration-300">
                      <Image
                        src={person.imageUrl}
                        alt={person.imageAlt || person.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="w-36 h-36 bg-gray-700 rounded-full border-4 border-white/10 flex items-center justify-center text-4xl">
                      👤
                    </div>
                  )}

                  {/* Department Badge (Bottom Center of Image) */}
                  {person.department && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <BadgeAtom variant="filled" className="bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-md">
                        {person.department}
                      </BadgeAtom>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col items-center text-center mt-4">
                  <h3 className="text-2xl font-black tracking-tight mb-1">
                    <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">{firstName}</span>{" "}
                    <span className={person.lastNameColor || "text-muted-foreground"}>{lastName.join(" ")}</span>
                  </h3>

                  <p className="text-brand-primary font-bold text-sm uppercase tracking-wider mb-4">{person.role}</p>

                  {person.superpower && (
                    <div className="mb-4 px-4 py-2 bg-white/5 rounded-xl border border-white/5 w-full">
                      <p className="text-xs font-serif italic text-muted-foreground">"{person.superpower}"</p>
                    </div>
                  )}

                  <p className={`text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4 ${isAmharic ? 'font-amharicBody' : ''}`}>
                    {person.bio}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                  {/* Social Links */}
                  <div className="flex gap-3 justify-center mt-auto">
                    {person.socialLinks?.linkedin && <SocialIcon href={person.socialLinks.linkedin} icon={Linkedin} />}
                    {person.socialLinks?.twitter && <SocialIcon href={person.socialLinks.twitter} icon={Twitter} />}
                    {person.socialLinks?.github && <SocialIcon href={person.socialLinks.github} icon={Github} />}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}