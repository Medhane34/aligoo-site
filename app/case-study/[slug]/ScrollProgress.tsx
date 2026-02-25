// components/ScrollProgress.tsx
"use client";
import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed top-[0px] left-0 right-0 h-2 bg-muted/20 z-40">
      <motion.div
        className="h-full bg-linear-to-b from-primary to-secondary shadow-sm"
        initial={{ scaleX: 0 }}
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}
