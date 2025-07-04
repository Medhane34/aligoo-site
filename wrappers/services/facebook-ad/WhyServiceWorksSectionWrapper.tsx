import { fetchWhyServiceWorksSection, WhyServiceWorksSectionData } from "@/lib/services/facebookad";
import WhyServiceWorks from "@/components/service-sections/WhyServiceWork";

export default async function WhyServiceWorksSectionWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  // Use the naming convention you set in Sanity Studio
  const data: WhyServiceWorksSectionData | null = await fetchWhyServiceWorksSection("whyServiceWorksSection-Fb");

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
