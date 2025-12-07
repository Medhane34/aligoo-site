import { fetchOurProcessSection, OurProcessSectionData } from "@/lib/services/funnelMapping";
import ProcessSection from "@/components/service-sections/ProcessSection";
import {
    MagnifyingGlassIcon,
    UserGroupIcon,
    DocumentTextIcon,
    RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export default async function ProcessFunnelWrapper({ lang = "en" }: { lang?: "en" | "am" }) {
    const data: OurProcessSectionData | null = await fetchOurProcessSection("ourProcessSection-FunnelMapping");
    if (!data) return null;

    const stepsData = lang === "am" ? data.steps_am : data.steps_en;

    // Map icons based on index
    const icons = [
        <MagnifyingGlassIcon key="1" className="w-8 h-8 text-blue-600" />,
        <UserGroupIcon key="2" className="w-8 h-8 text-pink-500" />,
        <DocumentTextIcon key="3" className="w-8 h-8 text-purple-600" />,
        <RocketLaunchIcon key="4" className="w-8 h-8 text-green-600" />,
    ];

    const steps = stepsData?.map((step, index) => ({
        ...step,
        icon: icons[index] || <MagnifyingGlassIcon key="default" className="w-8 h-8 text-gray-500" />,
    })) ?? [];

    return (
        <ProcessSection
            heading={lang === "am" ? data.heading_am : data.heading_en}
            subheading={(lang === "am" ? data.subheading_am : data.subheading_en) ?? ""}
            steps={steps}
        />
    );
}
