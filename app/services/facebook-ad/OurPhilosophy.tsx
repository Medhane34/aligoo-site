"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {Divider} from "@heroui/divider";
const AdPhilosophy = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.5', 'end 0.5'], // Trigger animation when center of element is in viewport
  });

  const step1Range = [0, 0.25];
  const step2Range = [0.25, 0.5];
  const step3Range = [0.5, 0.75];
  const step4Range = [0.75, 1];

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]); // Example scale animation
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]); // Example opacity animation

  const getStepStyle = (range: number[]) => ({
    scale: useTransform(scrollYProgress, range, [0.8, 1.2], { clamp: false }),
    opacity: useTransform(scrollYProgress, range, [0.6, 1], { clamp: false }),
  });

  return (
    <div className="py-16 bg-gray-100" ref={timelineRef}>
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          The C4 Method™ — Click. Capture. Convert. Compound.
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          The 4-stage ad system we use to turn strangers into superfans.
        </p>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Vertical Timeline Line */}
    <Divider orientation="vertical" className="absolute top-0 left-1/2 -ml-0.5 w-0.5 h-full bg-gray-300 z-0" />


        {/* Click Step (Left) */}
        <div className="relative mb-12 md:flex md:items-center md:justify-start">
          <motion.div
            className="absolute top-0 left-1/2 -ml-4 w-8 h-8 rounded-full bg-pink-500 z-10 flex items-center justify-center text-white font-semibold"
            style={getStepStyle(step1Range)}
          >1</motion.div>
          <div className="mt-4 md:mr-8 md:text-left md:w-1/2">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Click</h3>
            <p className="text-gray-700">
              We create thumb-stopping ads that get attention, fast. Visual-first, message-driven, tailored to pain and desire.
            </p>
          </div>
        </div>

        {/* Capture Step (Right) */}
        <div className="relative mb-12 md:flex md:items-center md:justify-end">
          <motion.div
            className="absolute top-0 left-1/2 -ml-4 w-8 h-8 rounded-full bg-blue-500 z-10 flex items-center justify-center text-white font-semibold"
            style={getStepStyle(step2Range)}
          >2</motion.div>
          <div className="mt-4 md:ml-8 md:text-right md:w-1/2">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Capture</h3>
            <p className="text-gray-700">
              We don’t let interest go to waste. We drive clicks to custom-built funnels that turn curiosity into action.
            </p>
          </div>
        </div>

        {/* Convert Step (Left) */}
        <div className="relative mb-12 md:flex md:items-center md:justify-start">
          <motion.div
            className="absolute top-0 left-1/2 -ml-4 w-8 h-8 rounded-full bg-green-500 z-10 flex items-center justify-center text-white font-semibold"
            style={getStepStyle(step3Range)}
          >3</motion.div>
          <div className="mt-4 md:mr-8 md:text-left md:w-1/2">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Convert</h3>
            <p className="text-gray-700">
              We nurture leads with follow-ups that speak to their objections, not just their inbox.
            </p>
          </div>
        </div>

        {/* Compound Step (Right) */}
        <div className="relative md:flex md:items-center md:justify-end">
          <motion.div
            className="absolute top-0 left-1/2 -ml-4 w-8 h-8 rounded-full bg-yellow-500 z-10 flex items-center justify-center text-white font-semibold"
            style={getStepStyle(step4Range)}
          >4</motion.div>
          <div className="mt-4 md:ml-8 md:text-right md:w-1/2">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Compound</h3>
            <p className="text-gray-700">
              We don’t stop at “it worked.” We test, optimize, and scale what's converting to get even more from your ad spend.
            </p>
          </div>
        </div>
      </div>

      {/* Headline and Description Below */}
      <div className="container mx-auto px-4 text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Unlock Predictable Growth with the C4 Method™</h2>
        <p className="mt-4 text-lg text-gray-700">
          Our signature 4-stage system is engineered to transform your Facebook ad spend into a consistent stream of loyal customers.
        </p>
      </div>
    </div>
  );
};

export default AdPhilosophy;