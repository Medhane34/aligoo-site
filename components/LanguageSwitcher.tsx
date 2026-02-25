"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "am">("en");

  useEffect(() => {
    if (pathname.startsWith("/am")) {
      setLang("am");
    } else {
      setLang("en");
    }
  }, [pathname]);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "am" : "en";

    setLang(newLang);

    // Replace logic: /en/... -> /am/... OR /am/... -> /en/...
    // If path is just "/" or missing lang prefix, handle gracefully.
    let newPath = pathname;

    if (lang === "en") {
      // Switching to Amharic
      if (pathname.startsWith("/en")) {
        newPath = pathname.replace("/en", "/am");
      } else {
        // Fallback if somehow at root without locale (though middleware usually handles this)
        newPath = `/am${pathname}`;
      }
    } else {
      // Switching to English
      if (pathname.startsWith("/am")) {
        newPath = pathname.replace("/am", "/en");
      } else {
        newPath = `/en${pathname}`;
      }
    }

    router.push(newPath);
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <div
        className="relative w-32 h-10 bg-gray-800 rounded-full cursor-pointer flex items-center p-1 shadow-inner border border-gray-700"
        onClick={toggleLanguage}
      >
        {/* Sliding Background */}
        <motion.div
          layout
          className="absolute w-14 h-8 bg-brand-primary rounded-full shadow-lg"
          style={{
            left: lang === "en" ? "4px" : "calc(100% - 60px)", // 60px = 56px width + 4px padding
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />

        {/* English Label */}
        <div className="flex-1 flex items-center justify-center z-10 text-xs font-semibold select-none gap-1">
          <span
            className={`transition-colors duration-200 ${lang === "en" ? "text-white" : "text-gray-500"}`}
          >
            🇺🇸
          </span>
          <span
            className={`transition-colors duration-200 ${lang === "en" ? "text-white" : "text-gray-500"}`}
          >
            EN
          </span>
        </div>

        {/* Amharic Label */}
        <div className="flex-1 flex items-center justify-center z-10 text-xs font-semibold select-none gap-1">
          <span
            className={`transition-colors duration-200 ${lang === "am" ? "text-white" : "text-gray-500"}`}
          >
            🇪🇹
          </span>
          <span
            className={`transition-colors duration-200 ${lang === "am" ? "text-white" : "text-gray-500"}`}
          >
            AM
          </span>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
