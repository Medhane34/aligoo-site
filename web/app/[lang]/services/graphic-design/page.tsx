/* eslint-disable prettier/prettier */
import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";

import dynamic from "next/dynamic";

const HeroGraphicWrapper = dynamic(() => import("@/wrappers/services/graphic-design/HeroGraphicWrapper"))
const WhyGraphicWrapper = dynamic(() => import("@/wrappers/services/graphic-design/WhyGraphicWrapper"))
const ProcessGraphicWrapper = dynamic(() => import("@/wrappers/services/graphic-design/ProcessGraphicWrapper"))
const WhoGraphicWrapper = dynamic(() => import("@/wrappers/services/graphic-design/WhoGraphicWrapper"))
const FaqGraphicWrapper = dynamic(() => import("@/wrappers/services/graphic-design/FaqGraphicWrapper"))
const ServiceRecentBlogs = dynamic(() => import("@/components/organism/blog/ServiceRecentBlogs"))

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "am" }> }): Promise<Metadata> {
    const { lang } = await params;
    const locale = lang === "am" ? "am" : "en";
    return createPageMetadata({
        pathnameWithoutLang: "/services/graphic-design",
        currentLang: locale,
        title: locale === "am" ? "ግራፊክ ዲዛይን | አሊጎ ዲጂታል ማርኪቲንግ" : "Graphic Design | Aligoo Digital Agency",
        description:
            locale === "am"
                ? "ብራንድዎን ሊወዱት የሚያጓጉ ምስሎች ይቀርፁ። አሊጎ ሎጎ፣ ቪዡዋሎችና ዲዛይን ይሰራሉ።"
                : "Create visuals that make your brand impossible to ignore. Aligoo delivers logos, social media creatives, and brand design that build trust and drive recognition.",
    });
}


export const revalidate = 3600; // Rebuild every hour

export default async function GraphicDesignPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
    const { lang } = await params;

    return (
        <>
            <HeroGraphicWrapper lang={lang} />

            <Container>
                <div className="section-deferred">
                    <WhyGraphicWrapper lang={lang} />
                </div>
            </Container>

            <div className="div" id="our-process-graphic">
                <ProcessGraphicWrapper lang={lang} />
            </div>

            <Container>
                <div className="section-deferred">
                    <WhoGraphicWrapper lang={lang} />
                </div>
            </Container>

            <Container>
                <div className="section-deferred">
                    <FaqGraphicWrapper lang={lang} />
                </div>
            </Container>

            <div className="section-deferred">
                <ServiceRecentBlogs categorySlug="graphic-design" serviceName="Graphic Design" lang={lang} />
            </div>

            {/* <Container>
         <CtaGraphicWrapper lang={lang} />
      </Container> */}
        </>
    );
}
