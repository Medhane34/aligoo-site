// wrappers/home/StatsWrapper.tsx
import StatsSection from "@/app/home/StatsSection";
import { fetchStatsSection } from "@/lib/homepage";

export default async function StatsWrapper({ lang }: { lang: 'en' | 'am' }) {
  const data = await fetchStatsSection(lang);
  if (!data) return null;

  return <StatsSection {...data} lang={lang} />;
}