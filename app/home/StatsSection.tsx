// app/home/StatsSection.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {Divider} from "@heroui/divider";

const stats = [
  { label: "REVENUE GENERATED", value: 10, suffix: "M+", prefix: "$" },
  { label: "AVG ROI ON PAID & ORGANIC CAMPAIGNS", value: 3, suffix: "x" },
  { label: "QUALIFIED LEADS DELIVERED", value: 120, suffix: "K+" },
  { label: "TRAFFIC GROWTH WITHIN 6 MONTHS", value: 100, suffix: "%", duration: 1 },
];

function Counter({ value, suffix = "", prefix = "", duration = 2 }: any) {
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
      if (progress < 1) {
        requestAnimationFrame(step);
      }
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

export default function StatsSection() {
  return (
    <section className="w-full py-16 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-6 text-center sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
    <div key={i} className="flex items-center justify-center">
    {/* Stat block */}
    <div className="space-y-2 px-4 text-center">
      <h3 className="text-4xl font-bold tracking-tight">
        <Counter {...stat} />
      </h3>
      <p className="text-sm font-medium uppercase tracking-wide">{stat.label}</p>
    </div>

    {/* Divider – only show if it's not the last item */}
    {i < stats.length - 1 && (
      <div className="hidden md:block">
        <Divider orientation="vertical" className="h-16" />
      </div>
    )}
  </div>
))}
      </div>
    </section>
  );
}
