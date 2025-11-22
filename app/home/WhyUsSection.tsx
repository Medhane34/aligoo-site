// components/sections/WhyUsSection.tsx
import { SectionHeading, AccentText } from "@/components/ui/typography";
import { WhyUsSectionData } from "@/lib/homepage";

// Create a map of gradient keys to full Tailwind classes.
// This allows Tailwind's JIT compiler to detect these classes at build time.
const gradientMap: { [key: string]: string } = {
  'from-blue-500 to-indigo-700': 'bg-gradient-to-br from-blue-500 to-indigo-700 text-white',
  'from-green-500 to-emerald-700': 'bg-gradient-to-br from-green-500 to-emerald-700 text-white',
  'from-orange-500 to-red-700': 'bg-gradient-to-br from-orange-500 to-red-700 text-white',
  'from-purple-500 to-pink-700': 'bg-gradient-to-br from-purple-500 to-pink-700 text-white',
  'from-teal-500 to-cyan-700': 'bg-gradient-to-br from-teal-500 to-cyan-700 text-white',
  'from-yellow-500 to-orange-700': 'bg-gradient-to-br from-yellow-500 to-orange-700 text-white',
};

// This is a trick to make sure Tailwind includes these classes.
// These classes are not used directly but makes them discoverable.
const _unused = 'col-span-1 row-span-2 md:col-span-2 lg:col-span-2';

interface Props extends WhyUsSectionData {
  lang: 'en' | 'am';
}

export default function WhyUsSection({ sectionHeading, accentText, reasons, lang }: Props) {

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <SectionHeading>{sectionHeading}</SectionHeading>
        <AccentText className="normal-case">{accentText}</AccentText>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {reasons.map((reason, i) => (
          <div
            key={i}
            className={`p-6 rounded-lg ${gradientMap[reason.gradient] || ''} ${reason.span || 'col-span-1'}`}
          >
            <span className="text-3xl mb-4">{reason.emoji}</span>
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className="text-sm">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}