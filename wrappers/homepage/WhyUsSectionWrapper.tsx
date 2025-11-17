/* //wrappers/homepage/WhyUsSectionWrapper.tsx
import { fetchWhyUsSection } from "@/lib/homepage";
import WhyUsSection, { WhyUsSectionProps } from "@/app/home/WhyUsSection"

export default async function WhyUsSectionWrapper() {
  const rawData = await fetchWhyUsSection();
  if (!rawData) return null;

  // Ensure reasons[].span is always a string
  const data: WhyUsSectionProps = {
    ...rawData,
    reasons: rawData.reasons.map((reason: any) => ({
      ...reason,
      span: reason.span ?? "",
    })),
  };

  return <WhyUsSection {...data} />;
}
 */

// wrappers/home/WhyUsWrapper.tsx
import WhyUsSection from "@/app/home/WhyUsSection";
import { fetchWhyUsSection } from "@/lib/homepage";

export default async function WhyUsWrapper({ lang }: { lang: 'en' | 'am' }) {
  const data = await fetchWhyUsSection(lang);
  if (!data) return null;

  return <WhyUsSection {...data} lang={lang} />;
}