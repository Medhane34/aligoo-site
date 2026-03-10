import {
  fetchAdPhilosophySection,
  AdPhilosophySectionData,
} from "@/lib/services/facebookad";
import AdPhilosophySection from "@/app/[lang]/services/facebook-ad/OurPhilosophy";

export default async function AdPhilosophySectionWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const data: AdPhilosophySectionData | null = await fetchAdPhilosophySection(
    "adPhilosophySection-Fb",
  );

  if (!data) return null;

  return (
    <AdPhilosophySection
      accentText={lang === "am" ? data.accentText_am : data.accentText_en}
      bottomHeading={
        lang === "am" ? data.bottomHeading_am : data.bottomHeading_en
      }
      bottomText={lang === "am" ? data.bottomText_am : data.bottomText_en}
      heading={lang === "am" ? data.heading_am : data.heading_en}
      steps={lang === "am" ? data.steps_am : data.steps_en}
    />
  );
}
