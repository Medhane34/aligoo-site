// app/not-found.tsx
"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark px-4">
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Animated 404 */}
        <div className="flex items-center gap-4 mb-6">
          <motion.span
            animate={{ rotate: 10 }}
            className="text-6xl font-extrabold text-brand-primary"
            initial={{ rotate: -10 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
          >
            4
          </motion.span>
          <motion.span
            animate={{ scale: 1.1 }}
            aria-label="planet"
            className="text-6xl font-extrabold text-brand-primary"
            initial={{ scale: 0.9 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
          >
            🪐
          </motion.span>
          <motion.span
            animate={{ rotate: -10 }}
            className="text-6xl font-extrabold text-brand-primary"
            initial={{ rotate: 10 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
          >
            4
          </motion.span>
        </div>
        {/* Heading and subheading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Oops, you’ve lost in space.
        </h1>
        <p className="text-lg text-brand-primary mb-6 text-center">
          We can’t find the page that you’re looking for...
        </p>
        {/* Go Home Button */}
        <Link passHref href="/">
          <motion.button
            className="px-8 py-3 rounded-full bg-linear-to-r from-brand-primary-light to-brand-primary-dark text-white font-semibold shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
          >
            GO HOME
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
