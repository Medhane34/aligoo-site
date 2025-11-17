// wrappers/home/ServiceWrapper.tsx
import ServiceSection from "@/app/home/ServiceSection";
import { fetchServiceSection } from "@/lib/homepage";

export default async function ServiceWrapper({ lang }: { lang: 'en' | 'am' }) {
  const data = await fetchServiceSection(lang);
  if (!data) return null;

  return <ServiceSection {...data} lang={lang} />;
}