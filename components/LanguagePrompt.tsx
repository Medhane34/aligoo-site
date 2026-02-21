"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ButtonAtom from "./atoms/ButtonAtom";

export default function LanguagePrompt() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // 1. Check if user has already made a choice
        const hasPreference = localStorage.getItem("language_preference");
        if (hasPreference) return;

        // 2. Check if we are already on Amharic path
        if (pathname.startsWith("/am")) {
            return;
        }

        // 3. Logic to trigger visibility
        let hasScrolled = false;
        let timeElapsed = false;

        const checkConditions = () => {
            if (hasScrolled || timeElapsed) {
                checkLocationAndShow();
            }
        }

        // Timer: 5 seconds
        const timer = setTimeout(() => {
            timeElapsed = true;
            checkConditions();
        }, 5000);

        // Scroll Handler: 40%
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

            if (scrollPercent > 40) {
                hasScrolled = true;
                checkConditions();
                window.removeEventListener("scroll", handleScroll); // Run once
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
        }

    }, [pathname]);

    const checkLocationAndShow = async () => {
        try {
            // Add forced param for testing if needed
            const res = await fetch("/api/location");
            const data = await res.json();

            if (data.country === 'ET') {
                setIsVisible(true);
            }
        } catch (error) {
            console.error("Failed to fetch location", error);
        }
    }

    const handleSwitch = () => {
        localStorage.setItem("language_preference", "am");
        setIsVisible(false);

        // Switch to Amharic
        let newPath = pathname;
        if (pathname.startsWith("/en")) {
            newPath = pathname.replace("/en", "/am");
        } else {
            newPath = `/am${pathname}`;
        }
        router.push(newPath);
    };

    const handleDismiss = () => {
        localStorage.setItem("language_preference", "en");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center md:items-end md:justify-start md:pb-8 md:pl-8 pointer-events-none p-4">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="pointer-events-auto max-w-sm w-full md:w-auto"
                    >
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl p-5 relative overflow-hidden">
                            {/* Background Decoration */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500" />

                            <button
                                onClick={handleDismiss}
                                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>

                            <div className="flex gap-4 items-start pr-6">
                                <span className="text-4xl">🇪🇹</span>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                                        Visiting from Ethiopia?
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                        We noticed you're in Ethiopia. Would you prefer to browse the site in Amharic?
                                    </p>

                                    <div className="flex gap-3">
                                        <ButtonAtom
                                            onClick={handleSwitch}
                                            variant="primary"
                                            shimmer
                                            size="sm"
                                            className="flex-1 text-xs"
                                        >
                                            Switch to Amharic
                                        </ButtonAtom>
                                        <ButtonAtom
                                            onClick={handleDismiss}
                                            variant="outline"
                                            size="sm"
                                            className="text-xs !bg-transparent !text-gray-700 !border-gray-300 hover:!bg-gray-50 dark:!text-gray-200 dark:!border-gray-600 dark:hover:!bg-gray-700"
                                        >
                                            Keep English
                                        </ButtonAtom>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
