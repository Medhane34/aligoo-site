"use client";

import { motion } from "framer-motion";
import { Code2, Users } from "lucide-react";
import Image from "next/image";

import HeadingAtom from "@/components/atoms/HeadingAtom";
import BadgeAtom from "@/components/atoms/BadgeAtom";
import Container from "@/components/ui/Container";

interface TeamMember {
  name: string;
  role?: string;
  image?: string;
}

interface CaseStudyCreditsProps {
  techStack?: string[];
  teamMembers?: TeamMember[];
}

export default function CaseStudyCredits({
  techStack,
  teamMembers,
}: CaseStudyCreditsProps) {
  if (
    (!techStack || techStack.length === 0) &&
    (!teamMembers || teamMembers.length === 0)
  ) {
    return null;
  }

  return (
    <section className="py-16 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Tech Stack */}
          {techStack && techStack.length > 0 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 text-brand-primary">
                <Code2 size={24} />
                <HeadingAtom
                  as="h3"
                  className="!text-text-light dark:!text-text-dark"
                  size="md"
                  title="Tech Stack"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, idx) => (
                  <BadgeAtom
                    key={idx}
                    className="text-sm py-2 px-4"
                    color="blue"
                    variant="filled"
                  >
                    {tech}
                  </BadgeAtom>
                ))}
              </div>
            </motion.div>
          )}

          {/* Team Members */}
          {teamMembers && teamMembers.length > 0 && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 text-brand-primary">
                <Users size={24} />
                <HeadingAtom
                  as="h3"
                  className="!text-text-light dark:!text-text-dark"
                  size="md"
                  title="The Team"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {member.image ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <Image
                          fill
                          alt={member.name}
                          className="object-cover"
                          src={member.image}
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold flex-shrink-0">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-text-light dark:text-text-dark">
                        {member.name}
                      </div>
                      {member.role && (
                        <div className="text-xs text-brand-primary font-medium uppercase tracking-wider">
                          {member.role}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
