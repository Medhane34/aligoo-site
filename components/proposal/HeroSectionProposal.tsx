// components/proposal/HeroSection.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

import VideoGreetingWrapper from "@/wrappers/proposal/VideoGreetingWrapper";

interface HeroData {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  videoGreeting?: {
    enabled?: boolean;
    videoUrl?: string;
    thumbnailUrl?: string;
    tooltipText?: string;
  } | null;
}

interface HeroSectionProps {
  hero: HeroData;
  clientName: string;
  videoGreeting?: {
    enabled?: boolean;
    videoUrl?: string;
    thumbnailUrl?: string;
    tooltipText?: string;
  } | null;
}

export default function HeroSection({
  hero,
  clientName,
  videoGreeting,
}: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Parallax Background */}
      {hero.backgroundImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y, opacity }}
        >
          <Image
            fill
            priority
            alt="Hero Background"
            className="object-cover"
            src={hero.backgroundImage + "?w=1920&q=80"}
          />
          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/40 to-neutral-950" />
        </motion.div>
      )}

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Client Badge */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 mb-8"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium tracking-wide uppercase">
            Proposal Prepared For {clientName}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {hero.title}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mt-2">
            Digital Solution
          </span>
        </motion.h1>

        {/* Subtitle */}
        {hero.subtitle && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {hero.subtitle}
          </motion.p>
        )}

        {/* Scroll Indicator */}
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute bottom-[-15vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
            Scroll to Explore
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent" />
        </motion.div>
      </div>

      {/* Video Greeting Widget */}
      <VideoGreetingWrapper
        clientName={clientName}
        videoGreeting={videoGreeting}
      />
    </section>
  );
}
