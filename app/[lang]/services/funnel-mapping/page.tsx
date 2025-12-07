/* eslint-disable prettier/prettier */
import Container from "@/components/ui/Container";

// Wrappers
import HeroFunnelWrapper from "@/wrappers/services/funnel-mapping/HeroFunnelWrapper";
import WhyFunnelWrapper from "@/wrappers/services/funnel-mapping/WhyFunnelWrapper";
import ProcessFunnelWrapper from "@/wrappers/services/funnel-mapping/ProcessFunnelWrapper";
import WhoFunnelWrapper from "@/wrappers/services/funnel-mapping/WhoFunnelWrapper";
import FaqFunnelWrapper from "@/wrappers/services/funnel-mapping/FaqFunnelWrapper";

export const revalidate = 3600; // Rebuild every hour

export default async function FunnelMappingPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
    const { lang } = await params;

    return (
        <>
            <HeroFunnelWrapper lang={lang} />

            <Container>
                <WhyFunnelWrapper lang={lang} />
            </Container>

            <ProcessFunnelWrapper lang={lang} />

            <Container>
                <WhoFunnelWrapper lang={lang} />
            </Container>

            <Container>
                <FaqFunnelWrapper lang={lang} />
            </Container>
        </>
    );
}
