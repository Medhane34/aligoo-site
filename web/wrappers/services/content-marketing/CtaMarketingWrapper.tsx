import {
  fetchCTASection,
  CTASectionData,
} from "@/lib/services/contentMarketing";
import CTABottomSection from "@/components/CTAStable";

export default async function CtaMarketingWrapper({
  lang = "en",
}: {
  lang?: "en" | "am";
}) {
  const data: CTASectionData | null = await fetchCTASection(
    "ctaSection-ContentMarketing",
  );
  if (!data) return null;

  return (
    <CTABottomSection
      heading={lang === "am" ? data.heading_am : data.heading_en}
      primaryButtonText={lang === "am" ? data.primaryButtonText_am : data.primaryButtonText_en}
      primaryButtonUrl={data.primaryButtonUrl}
      secondaryButtonText={lang === "am" ? data.secondaryButtonText_am : data.secondaryButtonText_en}
      subheading={lang === "am" ? data.subheading_am : data.subheading_en}
      secondaryButtonUrl={data.secondaryButtonUrl}
    // Note: CTABottomSection component props might need checking.
    // Based on usage in previous page: firstbuttontext, heading, subheading.
    // It seems it only takes one button? The schema has two.
    // I'll stick to what the component likely accepts or pass what I can.
    // previous usage: firstbuttontext={"👉Plan Content Strategy"}
    />
  );
}
