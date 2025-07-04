import { fetchFaqSection, FaqSectionData } from "@/lib/services/tiktokad";
import FaqSection from "@/components/service-sections/FaqSection";

export default async function FaqTikTokSectionWrapper({ lang = "en" }: { lang?: "en" | "am" }) {
  // Note: Changed "faqSection-Fb" to "faqSection-TikTok" to match the service.
  const data: FaqSectionData | null = await fetchFaqSection("faqSection-TikTok");
  if (!data) return null;
  return (
    <FaqSection
      eyebrow={(lang === "am" ? data.eyebrow_am : data.eyebrow_en) ?? ""}
      heading={(lang === "am" ? data.heading_am : data.heading_en) ?? ""}
      subheading={(lang === "am" ? data.subheading_am : data.subheading_en) ?? ""}
      ctaText={(lang === "am" ? data.ctaText_am : data.ctaText_en) ?? ""}
      ctaHref={(lang === "am" ? data.ctaHref_am : data.ctaHref_en) ?? ""}
      faqs={(lang === "am" ? data.faqs_am : data.faqs_en) ?? []}
    />
  );
}
