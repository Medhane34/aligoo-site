"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

import { AccentText, SectionHeading } from "@/components/ui/typography";

const WhoThisIsFor = () => {
  const paragraphRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start center", "end center"],
  });

  const getHighlightStyle = (index: number, total: number) => {
    const start = index * (1 / total);
    const end = (index + 0.4) * (1 / total); // Adjust overlap

    return {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      scale: useTransform(scrollYProgress, [start, end], [1, 2.05]),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      color: useTransform(scrollYProgress, [start, end], ["#333", "#FF595E"]),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fontWeight: useTransform(scrollYProgress, [start, end], [400, 600]),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      opacity: useTransform(scrollYProgress, [start, end], [0.2, 1]),
    };
  };

  const combinedText = (
    <>
      This service is ideal for SaaS founders who{" "}
      <motion.span style={getHighlightStyle(0, 7)}>
        are serious about growth
      </motion.span>
      ,{" "}
      <motion.span style={getHighlightStyle(1, 7)}>
        have tried running ads but never got real results
      </motion.span>
      ,{" "}
      <motion.span style={getHighlightStyle(2, 7)}>
        want leads that actually convert, not just “likes”
      </motion.span>
      , know their offer is solid — now it’s time to{" "}
      <motion.span style={getHighlightStyle(3, 7)}>scale it</motion.span>, and{" "}
      <motion.span style={getHighlightStyle(4, 7)}>
        value strategy, not just hacks and trends
      </motion.span>
      . However, this might not be the right fit if you{" "}
      <motion.span style={getHighlightStyle(5, 7)}>
        just want to “boost a few posts” and hope for the best
      </motion.span>{" "}
      or if you{" "}
      <motion.span style={getHighlightStyle(6, 7)}>
        think Facebook Ads are a magic wand with no effort
      </motion.span>
      .{/* ... continue with other points wrapped in motion.span ... */}
    </>
  );

  const textVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  return (
    <div className="py-16 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark ">
      <motion.div
        className="container mx-auto px-4 text-center mb-8"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="visible"
      >
        <motion.div variants={textVariants}>
          <SectionHeading className="text-heading uppercase">
            Who This Is For{" "}
          </SectionHeading>
        </motion.div>
        {/* ... intro paragraph ... */}
        <motion.div
          className="text-heading pb-2 xs:pb-1 sm:pb-4"
          variants={textVariants}
        >
          <AccentText className="normal-case">
            {" "}
            This Isn’t for Everyone — And That’s the Point
          </AccentText>
        </motion.div>
      </motion.div>
      <div className="container mx-auto px-4 text-center">
        <p ref={paragraphRef} className="text-body justify-center">
          {combinedText}
        </p>
      </div>
      {/* ... wrap-up line ... */}
    </div>
  );
};

export default WhoThisIsFor;
