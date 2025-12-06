"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function CreativeCore() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[500px] flex items-center justify-center perspective-1000 cursor-pointer group"
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className="relative w-[300px] h-[300px] preserve-3d"
            >
                {/* Core Glows */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 rounded-full blur-[60px] opacity-40 animate-pulse" />
                <div className="absolute inset-10 bg-gradient-to-tr from-yellow-400 to-red-600 rounded-full blur-[30px] opacity-60" />

                {/* The Solid(ish) Core */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-full shadow-inner border border-white/20 backdrop-blur-sm overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                {/* Orbiting Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute inset-0 border border-white/30 rounded-full`}
                        style={{
                            rotateX: 60 + i * 45,
                            rotateY: i * 30,
                        }}
                        animate={{
                            rotateZ: [0, 360],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {/* Small Planet on Ring */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,0.8)]" />
                    </motion.div>
                ))}

                {/* Floating Particles */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`p-${i}`}
                        className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: Math.random() * 400 - 200,
                            y: Math.random() * 400 - 200,
                            z: Math.random() * 200 - 100
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                        style={{
                            left: "50%",
                            top: "50%"
                        }}
                    />
                ))}

                {/* Interaction Halo */}
                <motion.div
                    className="absolute inset-[-50px] border border-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

            </motion.div>
        </div>
    );
}
