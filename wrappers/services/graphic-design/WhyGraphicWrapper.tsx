import {
  fetchWhyGraphicWorksSection,
  WhyGraphicWorksSectionData,
} from "@/lib/services/graphicDesign";
import WhyServiceWorksSection from "@/components/service-sections/WhyServiceWorksSection";

export default async function WhyGraphicWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const data: WhyGraphicWorksSectionData | null =
    await fetchWhyGraphicWorksSection("whyServiceWorksFeatures-GraphicDesign");

  if (!data) return null;

  return (
    <WhyServiceWorksSection
      features={(lang === "am" ? data.features_am : data.features_en) ?? []}
      heading={lang === "am" ? data.heading_am : data.heading_en}
      subheading={
        (lang === "am" ? data.subheading_am : data.subheading_en) ?? ""
      }
    />
  );
}
