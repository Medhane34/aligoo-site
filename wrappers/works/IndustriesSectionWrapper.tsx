import { fetchIndustriesSection, IndustriesSectionData } from "@/lib/works";
import IndustriesWeWorkedWith from "@/app/[lang]/works/IndustriesWeWorkedWith";


export default async function IndustriesSectionWrapper({ lang = "en" }: { lang?: "en" | "am" }) {
  const data: IndustriesSectionData | null = await fetchIndustriesSection();
  if (!data) return null;
  return (
    <IndustriesWeWorkedWith
      sectionHeading={lang === "am" ? data.sectionHeading_am : data.sectionHeading_en}
      accentText={lang === "am" ? data.accentText_am : data.accentText_en}
      industries={lang === "am" ? data.industries_am ?? [] : data.industries_en ?? []}
    />
  );
}

