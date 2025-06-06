"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const rightColumnContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const rightColumnVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
const videoVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const Intro = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch((error) => {
              console.error("Autoplay failed:", error);
            });
          } else if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        });
      },
      { threshold: 0.5 },
    );

    const videoElement = videoRef.current;
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      {" "}
      {/* Added responsive horizontal padding */}
      {/* Row 1: Two-Column Text Content - Now within a container */}
      <motion.div
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="visible"
      >
        {/* Left Column: Main Heading */}
        <motion.div
          className="text-gray-800 dark:text-gray-200"
          variants={headingVariants}
        >
          <motion.h2
            className="text-heading font-bold leading-tight"
            variants={headingVariants}
          >
            Empowering Brands with Design, <br />
            Data & a Dash of Rebellion <br />
          </motion.h2>
        </motion.div>

        {/* Right Column: Paragraph and Details */}
        <motion.div
          className="text-gray-700 dark:text-gray-300"
          variants={rightColumnContainerVariants}
        >
          <motion.p className="text-lg mb-6" variants={rightColumnVariants}>
            At Aligoo, we don’t just build websites or run ads - we build{" "}
            <span className="font-semibold text-brand-primary">momentum</span>{" "}
            We fuse thoughtful strategy with scroll-stopping design to craft
            digital experiences that move people — and move the needle. From
            startups to industry leaders, brands trust us to turn ambitious
            ideas into measurable outcomes.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12"
            variants={rightColumnVariants}
          >
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-gray-900 dark:text-gray-100">
                📍 Founded
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Since 2020, born and built in Addis Ababa.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-gray-900 dark:text-gray-100">
                🧭 Focus
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Digital Growth for service businesses & challenger brands.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-3 left-0 text-pink-500 text-4xl"></div>
              <div className="ml-6">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-gray-900 dark:text-gray-100">
                  🚀 Campaigns Launched
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  150+ ads, funnels, and websites that actually convert.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div className="mt-6" variants={rightColumnVariants}>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-1 text-gray-900 dark:text-gray-100">
              💡 Moments We&apos;re Proud Of
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Featured by local startups, celebrated by happy clients, and known
              for turning chaos into clarity.{" "}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Row 2: Masked Video - Now within a container and responsive */}
      <motion.div
        className="container mx-auto mt-16 flex justify-center px-4 sm:px-0"
        initial="hidden"
        variants={videoVariants}
        viewport={{ once: true }}
        whileInView="visible"
      >
        <div className="relative rounded-lg overflow-hidden w-full max-w-4xl h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-10" // Added z-10 to ensure video is above overlay
            src="gg2.mp4"
          />
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/30 to-purple-600/30 opacity-10 z-0" // Lowered opacity to 0.1, adjusted gradient with /30 for transparency, z-0 to stay below video
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;
