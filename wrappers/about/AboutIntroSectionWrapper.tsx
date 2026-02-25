// wrappers/about/AboutIntroSectionWrapper.tsx

import AboutIntroSection from "@/components/about/Intro";
import { AboutIntroSectionData } from "@/lib/about"; // ← import type

interface AboutIntroWrapperProps {
  data: AboutIntroSectionData | null;
  lang?: "en" | "am"; // optional — only if AboutIntroSection still needs it
}

export default function AboutIntroWrapper({
  data,
  lang,
}: AboutIntroWrapperProps) {
  if (!data) {
    return (
      <div className="py-12 text-center text-gray-500">
        Intro section not available
      </div>
    );
  }

  return (
    <AboutIntroSection
      {...data} // spreads mainHeading, introText, founded, etc.
      lang={lang || "en"} // keep this line only if your Intro component uses lang
      // (e.g. for conditional UI, icons, directionality)
      // If it doesn't need lang anymore, remove it and the prop
    />
  );
}
