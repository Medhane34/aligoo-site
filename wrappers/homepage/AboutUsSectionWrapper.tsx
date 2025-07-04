import { AboutUsSectionData, fetchAboutUsSection } from "@/lib/homepage";
import AboutUsSection, { AboutUsSectionProps } from "@/app/home/AboutUsSection";

export default async function AboutUsSectionWrapper({ lang = "en" }: { lang?: "en" | "am" }) {
  const data: AboutUsSectionData | null = await fetchAboutUsSection();
  if (!data) return null;
  return (
    <AboutUsSection
      sectionHeading={lang === "am" ? data.sectionHeading_am : data.sectionHeading_en}
      accentText={lang === "am" ? data.accentText_am : data.accentText_en}
      paragraphs={lang === "am" ? data.paragraphs_am : data.paragraphs_en}
      imageUrl={data.imageUrl}
      imageAlt={data.imageAlt}
      buttonText={lang === "am" ? data.buttonText_am : data.buttonText_en}
      buttonUrl={data.buttonUrl}
    />
  );
}