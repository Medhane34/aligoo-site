import { fetchWhyServiceWorksSection, WhyServiceWorksSectionData } from "@/lib/services/digitalmarketing";
import WhyServiceWorks from "@/components/service-sections/WhyServiceWork";
export default async function WhyDigitalWorksSectionWrapper({
  lang = "en",
  id,
}: {
  lang?: "en" | "am";
  id: string;
}) {
  const data: WhyServiceWorksSectionData | null = await fetchWhyServiceWorksSection(id);
  if (!data) return null;
  return (
    <WhyServiceWorks
      heading={lang === "am" ? data.heading_am : data.heading_en}
      highlight={lang === "am" ? data.highlight_am : data.highlight_en}
      paragraph1={lang === "am" ? data.paragraph1_am : data.paragraph1_en}
      paragraph2={lang === "am" ? data.paragraph2_am : data.paragraph2_en}
      stats={lang === "am" ? data.stats_am : data.stats_en}
    />
  );
}
