/* eslint-disable prettier/prettier */
import Container from "@/components/ui/Container";

// Wrappers
import HeroMarketingWrapper from "@/wrappers/services/content-marketing/HeroMarketingWrapper";
import WhyMarketingWrapper from "@/wrappers/services/content-marketing/WhyMarketingWrapper";
import ProcessMarketingWrapper from "@/wrappers/services/content-marketing/ProcessMarketingWrapper";
import WhoMarketingWrapper from "@/wrappers/services/content-marketing/WhoMarketingWrapper";
import FaqMarketingWrapper from "@/wrappers/services/content-marketing/FaqMarketingWrapper";
// import CtaMarketingWrapper from "@/wrappers/services/content-marketing/CtaMarketingWrapper"; // If needed/uncommented in original

export const revalidate = 3600; // Rebuild every hour

export default async function ContentMarketingPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
    const { lang } = await params;

    return (
        <>
            <HeroMarketingWrapper lang={lang} />

            <Container>
                <WhyMarketingWrapper lang={lang} />
            </Container>

            <ProcessMarketingWrapper lang={lang} />

            <Container>
                <WhoMarketingWrapper lang={lang} />
            </Container>

            <Container>
                <FaqMarketingWrapper lang={lang} />
            </Container>

            {/* <Container>
         <CtaMarketingWrapper lang={lang} />
      </Container> */}
        </>
    );
}
