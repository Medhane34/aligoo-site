"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function LanguagePrompt() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // 1. Check if user has already made a choice
        const hasPreference = localStorage.getItem("language_preference");
        if (hasPreference) return;

        // 2. Check if we are already on Amharic path (if so, no need to prompt, maybe set pref?)
        if (pathname.startsWith("/am")) {
            // If user is already on Amharic, we can assume they prefer it or switched manually.
            // We could set 'am' preference here to avoid prompting later if they switch back, 
            // but safer to just do nothing.
            return;
        }

        // 3. Logic to trigger visibility
        let hasScrolled = false;
        let timeElapsed = false;

        const checkConditions = () => {
            console.log("Checking conditions:", { hasScrolled, timeElapsed });
            if (hasScrolled || timeElapsed) {
                checkLocationAndShow();
            }
        }

        // Timer: 5 seconds
        const timer = setTimeout(() => {
            timeElapsed = true;
            checkConditions();
        }, 5000);

        // Scroll Handler: 50%
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

            if (scrollPercent > 40) { // Using 40% to be safe/slightly earlier
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
            const res = await fetch("/api/location");
            const data = await res.json();
            console.log("Location Data:", data);
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
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[9999] max-w-sm w-[90%] md:w-auto"
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
                                    <button
                                        onClick={handleSwitch}
                                        className="flex-1 px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-opacity-90 transition-all shadow-md active:scale-95"
                                    >
                                        Switch to Amharic
                                    </button>
                                    <button
                                        onClick={handleDismiss}
                                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                                    >
                                        Keep English
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
