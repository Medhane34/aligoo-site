// wrappers/home/ProcessWrapper.tsx
import ProcessSection from "@/app/home/ProcessSection";
import { fetchProcessSection } from "@/lib/homepage";

export default async function ProcessWrapper({ lang }: { lang: 'en' | 'am' }) {
  const data = await fetchProcessSection(lang);
  if (!data) return null;

  return <ProcessSection {...data} lang={lang} />;
}