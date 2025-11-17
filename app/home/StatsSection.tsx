"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Divider } from "@heroui/divider";

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
  lang: 'en' | 'am'; // Added
}

function Counter({ value, suffix = "", prefix = "", duration = 2 }: Stat) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = Number(value);
    if (start === end) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCurrent(Math.round(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

export default function StatsSection({ stats, footerText, lang }: StatsSectionProps) {
  return (
    <section className="max-w-full overflow-x-hidden py-16 gap-4 xs:gap-3 sm:gap-6 md:gap-7 lg:gap-8 px-4 xs:px-5 sm:px-6 md:px-8 text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-6 text-center xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 sm:w-1/2 md:w-4/5 lg:w-3/4 xl:w-2/3">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center justify-center">
            <div className="space-y-2 px-4 text-center">
              <h3 className="text-4xl font-bold tracking-tight text-brand-primary-light dark:text-text-dark">
                <Counter {...stat} />
              </h3>
              <p className="text-sm font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden md:block">
                <Divider className="h-16" orientation="vertical" />
              </div>
            )}
          </div>
        ))}
      </div>
      {footerText && (
        <p className="text-center text-small pt-8">{footerText}</p>
      )}
    </section>
  );
}