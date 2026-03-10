// components/organism/blog/TGPromotionSection.tsx
"use client";

import Link from "next/link";
import BadgeAtom from "@/components/atoms/BadgeAtom";
import HeadingAtom from "@/components/atoms/HeadingAtom";
import ButtonAtom from "@/components/atoms/ButtonAtom";
import { TGPromotionData } from "@/types/BlogPost";
import { trackEvent } from "@/lib/analytics";

interface TGPromotionSectionProps {
    data: TGPromotionData;
    lang: "en" | "am";
}

export default function TGPromotionSection({
    data,
    lang,
}: TGPromotionSectionProps) {
    const { accentText, heading, description, buttonText, buttonLink } = data;

    const handleClick = () => {
        trackEvent("telegram_signup_click", {
            event_category: "signup",
            event_label: "blog_list_telegram_join",
            source: "blog_list_page",
            language: lang,
            button_text: buttonText,
            link_url: buttonLink,
        });
    };

    return (
        <section
            className="relative overflow-hidden rounded-2xl py-16 px-6 md:px-14
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-white/10
        shadow-sm dark:shadow-none"
            dir={lang === "am" ? "rtl" : "ltr"}
        >
            {/* Decorative gradient glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-20 h-72 w-72
          rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-300/10
          blur-3xl dark:from-blue-600/20 dark:to-cyan-400/10"
            />

            <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
                {/* Badge Accent Text */}
                <BadgeAtom variant="filled" color="blue" align="center">
                    ✈️ {accentText}
                </BadgeAtom>

                {/* Heading */}
                <HeadingAtom
                    as="h2"
                    variant="split"
                    size="md"
                    align="center"
                    title={heading}
                    highlight=""
                    className="text-neutral-900 dark:text-white"
                />

                {/* Description */}
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {description}
                </p>

                {/* CTA Button */}
                <Link href={buttonLink} target="_blank" rel="noopener noreferrer">
                    <ButtonAtom
                        variant="primary"
                        size="lg"
                        shimmer
                        onClick={handleClick}
                    >
                        {buttonText}
                    </ButtonAtom>
                </Link>
            </div>
        </section>
    );
}
