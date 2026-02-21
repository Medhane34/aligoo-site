"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import HeadingAtom from "@/components/atoms/HeadingAtom";
import BadgeAtom from "@/components/atoms/BadgeAtom";
import ButtonAtom from "@/components/atoms/ButtonAtom";
import { ArrowRight, Globe, Layers, Clock, Users } from "lucide-react";
import Container from "@/components/ui/Container";

interface CaseStudyHeroProps {
    title: string;
    subtitle?: string; // Client Name
    mainImageUrl?: string;
    liveSiteUrl?: string;
    servicesList?: string[];
    projectDuration?: string;
}

export default function CaseStudyHero({
    title,
    subtitle,
    mainImageUrl,
    liveSiteUrl,
    servicesList,
    projectDuration,
}: CaseStudyHeroProps) {
    return (
        <div className="relative w-full h-[90vh] min-h-[600px] flex flex-col justify-end overflow-hidden bg-gray-900 text-white">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                {mainImageUrl && (
                    <Image
                        src={mainImageUrl}
                        alt={title}
                        fill
                        priority
                        className="object-cover opacity-60"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <Container className="relative z-10 pb-12 sm:pb-24">
                <div className="max-w-4xl space-y-6">
                    {/* Badge: Client Name or Service */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <BadgeAtom variant="outline" className="border-white/20 text-white/80 backdrop-blur-md">
                            {subtitle || "Case Study"}
                        </BadgeAtom>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <HeadingAtom
                            as="h1"
                            title={title}
                            size="2xl"
                            className="text-white drop-shadow-lg leading-tight"
                        />
                    </motion.div>

                    {/* Action Button */}
                    {liveSiteUrl && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer">
                                <ButtonAtom
                                    variant="primary"
                                    size="lg"
                                    icon={<ArrowRight size={20} />}
                                    iconPosition="right"
                                    className="mt-4"
                                >
                                    Visit Live Site
                                </ButtonAtom>
                            </a>
                        </motion.div>
                    )}
                </div>

                {/* Project At A Glance Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-12 sm:mt-20 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {/* Services */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/60 text-sm uppercase tracking-wider font-medium">
                            <Layers size={16} /> Services
                        </div>
                        <div className="text-white font-medium">
                            {servicesList && servicesList.length > 0 ? (
                                servicesList.join(", ")
                            ) : (
                                "Digital Service"
                            )}
                        </div>
                    </div>

                    {/* Duration */}
                    {projectDuration && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white/60 text-sm uppercase tracking-wider font-medium">
                                <Clock size={16} /> Duration
                            </div>
                            <div className="text-white font-medium">{projectDuration}</div>
                        </div>
                    )}

                    {/* Live Link (Text version) */}
                    {liveSiteUrl && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-white/60 text-sm uppercase tracking-wider font-medium">
                                <Globe size={16} /> Live Site
                            </div>
                            <a href={liveSiteUrl} target="_blank" rel="noopener noreferrer" className="text-brand-primary-light hover:underline font-medium truncate block">
                                {new URL(liveSiteUrl).hostname}
                            </a>
                        </div>
                    )}

                    {/* Team (Subtitle fallback if no team data yet) */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/60 text-sm uppercase tracking-wider font-medium">
                            <Users size={16} /> Team
                        </div>
                        <div className="text-white font-medium">
                            Aligoo Digital Team
                        </div>
                    </div>

                </motion.div>


            </Container>
        </div>
    );
}
