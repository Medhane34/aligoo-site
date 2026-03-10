import {
  fetchOurProcessSection,
  OurProcessSectionData,
} from "@/lib/services/tiktokad";
import OurProcess from "@/components/service-sections/ourprocess";

export default async function DigitalProcessSectionWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const data: OurProcessSectionData | null = await fetchOurProcessSection(
    "ourProcessSection-Digital",
  );

  if (!data) return null;

  return (
    <OurProcess
      heading={lang === "am" ? data.heading_am : data.heading_en}
      imageAlt={(lang === "am" ? data.imageAlt_am : data.imageAlt_en) ?? ""}
      imageSrc={(lang === "am" ? data.imageSrc_am : data.imageSrc_en) ?? ""}
      steps={lang === "am" ? data.steps_am : data.steps_en}
      subheading={
        (lang === "am" ? data.subheading_am : data.subheading_en) ?? ""
      }
    />
  );
}
