import { fetchCTASection, CTASectionData } from "@/lib/services/tiktokad";
import CTABottomSection from "@/components/CTA";

export default async function CTATikTokSectionWrapper({ lang = "en" }: { lang?: "en" | "am" }) {
  const data: CTASectionData | null = await fetchCTASection("ctaSection-FacebookAd");
  if (!data) return null;
  return (
    <CTABottomSection
      heading={lang === "am" ? data.heading_am : data.heading_en}
      subheading={lang === "am" ? data.subheading_am : data.subheading_en}
      primaryButtonText={lang === "am" ? data.primaryButtonText_am : data.primaryButtonText_en}
      primaryButtonUrl={data.primaryButtonUrl}
      secondaryButtonText={lang === "am" ? data.secondaryButtonText_am : data.secondaryButtonText_en}
      secondaryButtonUrl={data.secondaryButtonUrl}
    />
  );
}
