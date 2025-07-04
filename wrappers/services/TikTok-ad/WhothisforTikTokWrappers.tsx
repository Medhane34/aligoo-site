import { fetchWhoThisIsForSectionTikTok, WhoThisIsForSectionDataTikTok } from "@/lib/services/tiktokad";
import WhoThisIsForSection from "@/components/service-sections/WhoThisIsFor";

export default async function WhoThisIsForTikTokWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const data: WhoThisIsForSectionDataTikTok | null = await fetchWhoThisIsForSectionTikTok("whoThisIsForSection-TikTok");
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
