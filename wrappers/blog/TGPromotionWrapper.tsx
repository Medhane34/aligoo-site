// wrappers/blog/TGPromotionWrapper.tsx
// Server Component — fetches TG promotion data and passes to client component.
import { fetchTGPromotion } from "@/lib/BlogPost";
import TGPromotionSection from "@/components/organism/blog/TGPromotionSection";

interface TGPromotionWrapperProps {
    lang: "en" | "am";
}

export default async function TGPromotionWrapper({
    lang,
}: TGPromotionWrapperProps) {
    const data = await fetchTGPromotion(lang);

    // Gracefully collapse if no document published in Sanity yet
    if (!data) return null;

    return <TGPromotionSection data={data} lang={lang} />;
}
