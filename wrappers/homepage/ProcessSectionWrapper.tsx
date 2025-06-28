import { fetchProcessSection } from "@/lib/homepage";
import ProcessSection, { ProcessSectionProps } from "@/app/home/ProcessSection";

export default async function ProcessSectionWrapper() {
  const data: ProcessSectionProps | null = await fetchProcessSection();
  if (!data) return null;
  return <ProcessSection {...data} />;
}
