// components/HeroSectionStable.tsx
"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import ButtonAtom from "./atoms/ButtonAtom";
import HeadingAtom from "./atoms/HeadingAtom";
import BadgeAtom from "./atoms/BadgeAtom";

// Lazy-load the entire animated overlay (motion + background)
const AnimatedOverlay = dynamic(
  () => import("./AnimatedOverlayStable"),
  { ssr: false, loading: () => null }
);

export interface HeroSectionProps {
  badgeText?: string;
  headlineText1: string;
  headlineText2: string;
  headlineText3?: string;
  subheading: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  lang?: "en" | "am";
}

export default function HeroSection({
  badgeText,
  headlineText1,
  headlineText2,
  headlineText3,
  subheading,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  lang = "en",
}: HeroSectionProps) {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark mt-[-60px] sm:mt-[-80px] md:mt-[-105px]">
      {/* Static, immediately paintable hero content – this becomes the LCP element */}
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-4 relative z-10 pt-24 sm:pt-28 md:pt-0">
        <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto text-center">
          {/* Badge – static */}
          {badgeText && (
            <BadgeAtom icon={<span>🔥</span>} variant="outline">
              {badgeText}
            </BadgeAtom>
          )}

          {/* Headlines – static render, no motion delay */}
          <div className="text-center flex flex-col items-center justify-center gap-0 md:gap-1">
            <HeadingAtom
              align="center"
              className="leading-tight text-text-light dark:text-text-dark -mt-2"
              size="xl"
              title={headlineText1}
              variant="default"
            />
            <HeadingAtom
              align="center"
              size="xl"
              title={headlineText2}
              className="mb-4 bg-gradient-to-r from-[#FF595E] to-orange-500 bg-clip-text text-transparent font-bold"
            />
            {headlineText3 && (
              <HeadingAtom
                align="center"
                className="leading-tight text-text-light dark:text-text-dark -mt-2"
                size="xl"
                title={headlineText3}
                variant="default"
              />
            )}
          </div>

          {/* Subheading – static */}
          <p
            className={`text-center text-lg sm:text-xl text-text-light dark:text-text-dark max-w-2xl font-medium leading-relaxed ${lang === "am" ? "font-amharicBody" : ""}`}
          >
            {subheading}
          </p>

          {/* Buttons – static links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pb-6 sm:pb-0">
            <Link className="w-full sm:w-auto" href={primaryButtonUrl}>
              <ButtonAtom
                fullWidth={true}
                shimmer={true}
                size="lg"
                variant="primary"
              >
                {primaryButtonText}
              </ButtonAtom>
            </Link>

            <Link className="w-full sm:w-auto" href={secondaryButtonUrl}>
              <ButtonAtom fullWidth={true} size="lg" variant="outline" >
                {secondaryButtonText}
              </ButtonAtom>
            </Link>
          </div>
        </section>
      </main>

      {/* Client-side constellation background — loads AFTER text paints, no content duplication */}
      <AnimatedOverlay />
    </div>
  );
}