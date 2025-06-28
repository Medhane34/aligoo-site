import { fetchWhyUsSection } from "@/lib/homepage";
import WhyUsSection, { WhyUsSectionProps } from "@/app/home/WhyUsSection"

export default async function WhyUsSectionWrapper() {
  const data: WhyUsSectionProps | null = await fetchWhyUsSection();
  if (!data) return null;
  return <WhyUsSection {...data} />;
}
