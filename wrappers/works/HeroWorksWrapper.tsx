import { fetchHeroSection, HeroSectionData } from "@/lib/works";
import HeroSection from "@/components/HeroSection";

export default async function WorksHeroSectionWrapper({ lang = "en" }: { lang?: "en" | "am" }) {
  const data: HeroSectionData | null = await fetchHeroSection("heroSection-WorksPage");
  if (!data) return null;
  return (
    <HeroSection
      badgeText={lang === "am" ? data.badgeText_am : data.badgeText_en}
      headlineText1={lang === "am" ? data.headlineText1_am : data.headlineText1_en}
      headlineText2={lang === "am" ? data.headlineText2_am : data.headlineText2_en}
      headlineText3={lang === "am" ? data.headlineText3_am : data.headlineText3_en}
      subheading={lang === "am" ? data.subheading_am : data.subheading_en}
      primaryButtonText={lang === "am" ? data.primaryButtonText_am : data.primaryButtonText_en}
      primaryButtonUrl={data.primaryButtonUrl}
      secondaryButtonText={lang === "am" ? data.secondaryButtonText_am : data.secondaryButtonText_en}
      secondaryButtonUrl={data.secondaryButtonUrl}
    />
  );
}
