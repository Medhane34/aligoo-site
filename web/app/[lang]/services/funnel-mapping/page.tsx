/* eslint-disable prettier/prettier */
import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";

import dynamic from "next/dynamic";

const HeroFunnelWrapper = dynamic(() => import("@/wrappers/services/funnel-mapping/HeroFunnelWrapper"))
const WhyFunnelWrapper = dynamic(() => import("@/wrappers/services/funnel-mapping/WhyFunnelWrapper"))
const ProcessFunnelWrapper = dynamic(() => import("@/wrappers/services/funnel-mapping/ProcessFunnelWrapper"))
const WhoFunnelWrapper = dynamic(() => import("@/wrappers/services/funnel-mapping/WhoFunnelWrapper"))
const FaqFunnelWrapper = dynamic(() => import("@/wrappers/services/funnel-mapping/FaqFunnelWrapper"))
const ServiceRecentBlogs = dynamic(() => import("@/components/organism/blog/ServiceRecentBlogs"))

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "am" }> }): Promise<Metadata> {
    const { lang } = await params;
    const locale = lang === "am" ? "am" : "en";
    return createPageMetadata({
        pathnameWithoutLang: "/services/funnel-mapping",
        currentLang: locale,
        title: locale === "am" ? "ፈኔል ማፒንግ | አሊጎ ዲጂታል ማርኪቲንግ" : "Funnel Mapping | Aligoo Digital Agency",
        description:
            locale === "am"
                ? "ደንበኛዎ ወደ ሽያጭ የሚደርስበትን ቀልጣፋ መንገድ ይቀርፁ። አሊጎ ፈኔሎችዎን ለ conversion ያዘጋጃሉ።"
                : "Map the fastest path from stranger to customer. Aligoo builds conversion-optimized funnels that turn traffic into leads and leads into revenue.",
    });
}


export const revalidate = 3600; // Rebuild every hour

export default async function FunnelMappingPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
    const { lang } = await params;

    return (
        <>
            <HeroFunnelWrapper lang={lang} />

            <Container>
                <div className="section-deferred">
                    <WhyFunnelWrapper lang={lang} />
                </div>
            </Container>

            <div className="section-deferred">
                <ProcessFunnelWrapper lang={lang} />
            </div>

            <Container>
                <div className="section-deferred">
                    <WhoFunnelWrapper lang={lang} />
                </div>
            </Container>

            <Container>
                <div className="section-deferred">
                    <FaqFunnelWrapper lang={lang} />
                </div>
            </Container>

            <div className="section-deferred">
                <ServiceRecentBlogs categorySlug="funnel-mapping" serviceName="Funnel Mapping" lang={lang} />
            </div>
        </>
    );
}
