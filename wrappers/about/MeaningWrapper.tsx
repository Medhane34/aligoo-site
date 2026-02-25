// wrappers/about/MeaningWrapper.tsx

import MeaningSection from "@/components/about/Meanining"; // note: filename has typo "Meanining" – fix to "Meaning" if possible
import { MeaningSectionData } from "@/lib/about";

interface MeaningWrapperProps {
  data: MeaningSectionData | null;
  lang: "en" | "am";
}

export default function MeaningWrapper({ data, lang }: MeaningWrapperProps) {
  if (!data) {
    return (
      <div className="py-20 text-center text-red-500 font-bold">
        Meaning Section: Data not loaded yet (check Sanity document)
      </div>
    );
  }

  return <MeaningSection {...data} lang={lang} />;
}
