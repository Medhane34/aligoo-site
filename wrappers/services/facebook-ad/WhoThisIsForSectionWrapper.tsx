import { fetchWhoThisIsForSection, WhoThisIsForSectionData } from "@/lib/services/facebookad";
import WhoThisIsForSection from "@/components/service-sections/WhoThisIsFor";

export default async function WhoThisIsForSectionWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const data: WhoThisIsForSectionData | null = await fetchWhoThisIsForSection("whoThisIsForSection-Fb");
  if (!data) return null;
  return (
    <WhoThisIsForSection
      heading={lang === "am" ? data.heading_am : data.heading_en}
      subheading={lang === "am" ? data.subheading_am : data.subheading_en}
      introText={lang === "am" ? data.introText_am : data.introText_en}
      highlightedPhrases={lang === "am" ? data.highlightedPhrases_am : data.highlightedPhrases_en}
      outroText={lang === "am" ? data.outroText_am : data.outroText_en}
    />
  );
}
