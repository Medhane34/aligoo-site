import { fetchStatsSection } from "@/lib/homepage";
import StatsSection, { StatsSectionProps } from "@/app/home/StatsSection";

export default async function StatsSectionWrapper() {
  const data: StatsSectionProps | null = await fetchStatsSection();
  if (!data) return null;
  return <StatsSection {...data} />;
}
