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
  const controls = useAnimation();
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({ count: value });
    }
  }, [controls, inView, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ count: 0 }}
      animate={controls}
      transition={{ duration }}
      onUpdate={(latest) => setCurrent(Math.round(latest.count))}
    >
      {prefix}
      {current}
      {suffix}
    </motion.span>
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
