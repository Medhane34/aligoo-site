import { fetchServiceSection } from "@/lib/homepage";
import ServiceSection, { ServiceSectionProps } from "@/app/home/ServiceSection";
export default async function ServiceSectionWrapper() {
  const data: ServiceSectionProps | null = await fetchServiceSection();
  if (!data) return null;
  return <ServiceSection {...data} />;
}
