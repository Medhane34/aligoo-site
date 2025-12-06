"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { Palette, Infinity as InfinityIcon } from "lucide-react";

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export interface StatsSectionProps {
  stats: Stat[];
  footerText?: string;
  lang: 'en' | 'am';
}

function Counter({ value, suffix = "", prefix = "", duration = 2.5 }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export default function StatsSection({ stats, footerText, lang }: StatsSectionProps) {
  return (
    <section className="relative py-24 bg-background-light dark:bg-background-dark overflow-hidden">

      {/* Container */}
      <div className="container mx-auto px-4">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 justify-items-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center group"
            >
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                <Counter {...stat} />
              </h3>
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        {footerText && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider px-6 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-background/50 backdrop-blur-sm">

              {footerText}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}