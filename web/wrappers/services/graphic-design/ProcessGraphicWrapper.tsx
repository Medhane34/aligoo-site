import {
  fetchOurProcessSection,
  OurProcessSectionData,
} from "@/lib/services/graphicDesign";
import ProcessSection from "@/components/service-sections/ProcessSection";

export default async function ProcessGraphicWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const data: OurProcessSectionData | null = await fetchOurProcessSection(
    "ourProcessSection-GraphicDesign",
  );

  if (!data) return null;

  const stepsData = lang === "am" ? data.steps_am : data.steps_en;

  // Map emojis used in original file
  const icons = [
    <p key="1">💡</p>,
    <p key="2">🎨</p>,
    <p key="3">⚙️</p>,
    <p key="4">🔁</p>,
  ];

  const steps =
    stepsData?.map((step, index) => ({
      ...step,
      icon: icons[index] || <p>✨</p>,
    })) ?? [];

  return (
    <ProcessSection
      heading={lang === "am" ? data.heading_am : data.heading_en}
      steps={steps}
      subheading={
        (lang === "am" ? data.subheading_am : data.subheading_en) ?? ""
      }
    />
  );
}
