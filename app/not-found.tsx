// app/not-found.tsx
"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Animated 404 */}
        <div className="flex items-center gap-4 mb-6">
          <motion.span
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
            className="text-6xl font-extrabold text-brand-primary"
          >
            4
          </motion.span>
          <motion.span
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
            className="text-6xl font-extrabold text-brand-primary"
            aria-label="planet"
          >
            🪐
          </motion.span>
          <motion.span
            initial={{ rotate: 10 }}
            animate={{ rotate: -10 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
            className="text-6xl font-extrabold text-brand-primary"
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
        <Link href="/" passHref>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-brand-primary-light to-brand-primary-dark text-white font-semibold shadow-lg transition-all duration-300"
          >
            GO HOME
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
