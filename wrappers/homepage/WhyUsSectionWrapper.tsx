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
