// wrappers/about/OurWayWrapper.tsx

import OurWaySection from "@/components/about/ourway";
import { OurWaySectionData } from "@/lib/about";

interface OurWayWrapperProps {
  data: OurWaySectionData | null;
  lang: "en" | "am";
}

export default function OurWayWrapper({ data, lang }: OurWayWrapperProps) {
  if (!data) {
    return (
      <div className="py-20 text-center text-red-500 font-bold">
        Our Way Section: Data not loaded yet (check Sanity document)
      </div>
    );
  }

  return <OurWaySection {...data} lang={lang} />;
}
