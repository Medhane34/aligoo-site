import { fetchCTASection } from "@/lib/homepage";
import CTABottomSection from "@/components/CTAStable";
import { CTABottomSectionProps } from "@/components/CTAStable";

export default async function CTABottomSectionWrapper() {
  const data: CTABottomSectionProps | null = await fetchCTASection();

  if (!data) return null;

  return <CTABottomSection {...data} />;
}
