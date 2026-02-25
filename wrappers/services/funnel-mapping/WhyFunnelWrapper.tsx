import {
  fetchWhyFunnelWorksSection,
  WhyFunnelWorksSectionData,
} from "@/lib/services/funnelMapping";
import WhyFunnelMappingWorksSection from "@/components/service-sections/WhyServiceWorksSection";

export default async function WhyFunnelWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const data: WhyFunnelWorksSectionData | null =
    await fetchWhyFunnelWorksSection("whyServiceWorksFeatures-FunnelMapping");

  if (!data) return null;

  return (
    <WhyFunnelMappingWorksSection
      features={(lang === "am" ? data.features_am : data.features_en) ?? []}
      heading={lang === "am" ? data.heading_am : data.heading_en}
      subheading={
        (lang === "am" ? data.subheading_am : data.subheading_en) ?? ""
      }
    />
  );
}
