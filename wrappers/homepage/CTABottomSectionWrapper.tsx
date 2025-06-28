import { fetchCTASection } from "@/lib/homepage";
import CTABottomSection, { CTABottomSectionProps } from "@/components/CTA";

export default async function CTABottomSectionWrapper() {
  const data: CTABottomSectionProps | null = await fetchCTASection();
  if (!data) return null;
  return <CTABottomSection {...data} />;
}
