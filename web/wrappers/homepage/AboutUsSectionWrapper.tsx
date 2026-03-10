import { AboutUsSectionData, fetchAboutUsSection } from "@/lib/homepage";
import AboutUsSection from "@/app/home/AboutUsSection";

export default async function AboutUsSectionWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const data: AboutUsSectionData | null = await fetchAboutUsSection();

  if (!data) return null;

  return (
    <AboutUsSection
      accentText={lang === "am" ? data.accentText_am : data.accentText_en}
      buttonText={lang === "am" ? data.buttonText_am : data.buttonText_en}
      buttonUrl={data.buttonUrl}
      imageAlt={data.imageAlt}
      imageUrl={data.imageUrl}
      paragraphs={lang === "am" ? data.paragraphs_am : data.paragraphs_en}
      sectionHeading={
        lang === "am" ? data.sectionHeading_am : data.sectionHeading_en
      }
    />
  );
}
