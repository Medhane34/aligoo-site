/* eslint-disable prettier/prettier */
import { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Container from "@/components/ui/Container";

import dynamic from "next/dynamic";

const HeroMarketingWrapper = dynamic(() => import("@/wrappers/services/content-marketing/HeroMarketingWrapper"))
const WhyMarketingWrapper = dynamic(() => import("@/wrappers/services/content-marketing/WhyMarketingWrapper"))
const ProcessMarketingWrapper = dynamic(() => import("@/wrappers/services/content-marketing/ProcessMarketingWrapper"))
const WhoMarketingWrapper = dynamic(() => import("@/wrappers/services/content-marketing/WhoMarketingWrapper"))
const FaqMarketingWrapper = dynamic(() => import("@/wrappers/services/content-marketing/FaqMarketingWrapper"))
const ServiceRecentBlogs = dynamic(() => import("@/components/organism/blog/ServiceRecentBlogs"))

export async function generateMetadata({ params }: { params: Promise<{ lang: "en" | "am" }> }): Promise<Metadata> {
    const { lang } = await params;
    const locale = lang === "am" ? "am" : "en";
    return createPageMetadata({
        pathnameWithoutLang: "/services/content-marketing",
        currentLang: locale,
        title: locale === "am" ? "ኮንተንት ማርኬቲንግ | አሊጎ ዲጂታል" : "Content Marketing | Aligoo Digital Agency",
        description:
            locale === "am"
                ? "እንቅልፍህ ሳለ የሚሸጥ ኮንተንት ፍጠር አሊጎ ተስማሚ ታዳሚህን የሚስብ፣ የሚያሳትፍና ወደ ደንበኛ የሚቀይር SEO-ተመቻች ኮንተንት ስትራቴጂ ይገነባል።  የእርስዎ ቢዝነስ 24/7 የሚሰራ የእድገት ሞተር ይኖረዋል — አንተ ግን ተኝተህ ብቻ። 🚀"
                : "Create content that sells while you sleep. Aligoo builds SEO-optimized content strategies that attract, engage, and convert your ideal audience.",
    });
}


export const revalidate = 3600; // Rebuild every hour

export default async function ContentMarketingPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
    const { lang } = await params;

    return (
        <>
            <HeroMarketingWrapper lang={lang} />

            <Container>
                <div className="section-deferred">
                    <WhyMarketingWrapper lang={lang} />
                </div>
            </Container>
            <div className="section-deferred">
                <ProcessMarketingWrapper lang={lang} />
            </div>

            <Container>
                <div className="section-deferred">
                    <WhoMarketingWrapper lang={lang} />
                </div>
            </Container>

            <Container>
                <div className="section-deferred">
                    <FaqMarketingWrapper lang={lang} />
                </div>
            </Container>

            {/* <Container>
         <CtaMarketingWrapper lang={lang} />
      </Container> */}
            <div className="section-deferred">
                <ServiceRecentBlogs categorySlug="content-marketing" serviceName="Content Marketing" lang={lang} />
            </div>
        </>
    );
}
