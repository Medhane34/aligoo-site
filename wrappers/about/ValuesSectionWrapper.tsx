import { fetchValuesSection } from "@/lib/about";
import ValuesSection, { ValuesSectionProps } from "@/app/about/values"

export default async function ValuesSectionWrapper() {
  const data: ValuesSectionProps | null = await fetchValuesSection();
  if (!data) return null;
  return <ValuesSection {...data} />;
}
