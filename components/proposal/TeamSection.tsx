'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Zap } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface TeamMember {
    name: string
    role: string
    bio: string
    imageSrc: string
    yearsOfExperience: number
    expertise: string[]
    socialLinks?: {
        linkedin?: string
        twitter?: string
    }
}

interface TeamSectionProps {
    title?: string
    subtitle?: string
    members?: TeamMember[]
}

const defaultMembers: TeamMember[] = [
    {
        name: 'Daniel Aregawi',
        role: 'Founder, Web Designer',
        bio: 'With over 3 years of experience, Daniel brings a wealth of knowledge in creating visually stunning and user-centric websites. His expertise in web design and development ensures that your project is in capable hands.',
        imageSrc: '/team/avatar-1.jpeg',
        yearsOfExperience: 3,
        expertise: ['React', 'Next.js', 'UI/UX'],
        socialLinks: {
            linkedin: '#',
            twitter: '#'
        }
    },
    {
        name: 'Suratel Fistum',
        role: 'Graphic Designer, UI/UX Designer',
        bio: 'Suratel\'s 4 years of experience in graphic design and user interface/user experience design will elevate your website\'s visual appeal and usability. His attention to detail and creativity will create a remarkable online presence for your business.',
        imageSrc: '/team/avatar-1.jpeg',
        yearsOfExperience: 4,
        expertise: ['Figma', 'Photoshop', 'Branding'],
        socialLinks: {
            linkedin: '#'
        }
    },
    {
        name: 'Ephrata Aregawi',
        role: 'Assistant',
        bio: 'Ephrata provides essential support to the team, ensuring smooth project execution and client satisfaction. Her dedication and organizational skills contribute to the overall success of the project.',
        imageSrc: '/team/avatar-rediet.jpg',
        yearsOfExperience: 2,
        expertise: ['Project Management', 'Client Relations', 'QA'],
        socialLinks: {
            linkedin: '#'
        }
    }
]

export default function TeamSection({
    title = 'Dedicated Experts for Your Project',
    subtitle = 'Our team comprises experienced professionals with a proven track record in web design, development, and digital marketing. We are committed to delivering exceptional results for your project.',
    members = defaultMembers
}: TeamSectionProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section className="relative py-32 overflow-hidden bg-neutral-950">
            {/* Animated Background */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-yellow-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Decorative Lightning Bolt */}
            <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="absolute top-10 right-10 text-brand-primary"
            >
                <Zap className="w-16 h-16" fill="currentColor" />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-brand-primary via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-4xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative group"
                        >
                            {/* Card Container */}
                            <div className={`relative pt-32 p-6 rounded-2xl border transition-all duration-300
                ${hoveredIndex === index
                                    ? 'bg-white/10 border-brand-primary/50 shadow-2xl shadow-brand-primary/20 scale-[1.02]'
                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                                }
                backdrop-blur-xl
              `}>

                                {/* Floating Image */}
                                <motion.div
                                    animate={hoveredIndex === index ? { y: -10 } : { y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40"
                                >
                                    {/* Years Badge */}
                                    <div className="absolute -top-2 -right-2 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-brand-primary to-orange-500 text-white text-xs font-black shadow-lg">
                                        {member.yearsOfExperience}+ Years
                                    </div>

                                    {/* Image Container with Shadow */}
                                    <div className="relative w-full h-full">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                                        >
                                            <Image
                                                src={member.imageSrc}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                        </motion.div>

                                        {/* Floating Shadow */}
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/40 blur-xl rounded-full" />
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <div className="text-center mt-8">
                                    <h3 className="text-2xl font-bold text-white mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-4">
                                        {member.role}
                                    </p>
                                    <p className="text-neutral-300 leading-relaxed mb-6 text-sm">
                                        {member.bio}
                                    </p>

                                    {/* Expertise Tags */}
                                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                                        {member.expertise.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-neutral-300 font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Social Links */}
                                    {member.socialLinks && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={hoveredIndex === index ? { opacity: 1 } : { opacity: 0 }}
                                            className="flex justify-center gap-3"
                                        >
                                            {member.socialLinks.linkedin && (
                                                <a
                                                    href={member.socialLinks.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-primary/20 border border-white/20 hover:border-brand-primary/50 flex items-center justify-center transition-all duration-300 group/icon"
                                                >
                                                    <Linkedin className="w-5 h-5 text-neutral-400 group-hover/icon:text-brand-primary transition-colors" />
                                                </a>
                                            )}
                                            {member.socialLinks.twitter && (
                                                <a
                                                    href={member.socialLinks.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-primary/20 border border-white/20 hover:border-brand-primary/50 flex items-center justify-center transition-all duration-300 group/icon"
                                                >
                                                    <Twitter className="w-5 h-5 text-neutral-400 group-hover/icon:text-brand-primary transition-colors" />
                                                </a>
                                            )}
                                        </motion.div>
                                    )}
                                </div>

                                {/* Hover Glow */}
                                {hoveredIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-primary/10 to-orange-500/10 -z-10 blur-xl"
                                    />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
