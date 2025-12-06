"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function ParallaxBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth - 0.5);
        mouseY.set(clientY / innerHeight - 0.5);
    };

    const springConfig = { damping: 50, stiffness: 400 };
    const moveX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig);
    const moveY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);
    const moveX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), springConfig);
    const moveY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), springConfig);

    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        >
            {/* Dark Mode Background Base */}
            <div className="absolute inset-0 bg-background-dark/80 z-0 hidden dark:block" />

            {/* Floating Abstract Shapes */}

            {/* Shape 1: Large Red Blur */}
            <motion.div
                style={{ x: moveX1, y: y1 }}
                className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-red-600 rounded-full blur-[90px] opacity-20"
            />

            {/* Shape 2: Large Yellow Blur */}
            <motion.div
                style={{ x: moveX2, y: y2 }}
                className="absolute top-[40%] right-[10%] w-[350px] h-[350px] bg-yellow-500 rounded-full blur-[80px] opacity-20"
            />

            {/* Shape 3: Orange Accent */}
            <motion.div
                style={{ x: moveX1, y: useTransform(scrollY, [0, 500], [0, 100]) }}
                className="absolute bottom-[-10%] left-[30%] w-[500px] h-[300px] bg-orange-500 rounded-full blur-[100px] opacity-20"
            />

            {/* 3D Floating Elements (Geometric) */}
            <motion.div
                style={{ x: moveX2, y: moveY2, rotate: 15 }}
                className="absolute top-[15%] right-[20%] w-24 h-24 border-2 border-white/5 rounded-2xl backdrop-blur-sm hidden md:block"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                style={{ x: moveX1, y: moveY1, rotate: -15 }}
                className="absolute bottom-[20%] left-[15%] w-32 h-32 border border-white/5 rounded-full backdrop-blur-sm hidden md:block"
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />

        </div>
    );
}
