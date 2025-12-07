/* eslint-disable prettier/prettier */
import Container from "@/components/ui/Container";

// Wrappers
import HeroGraphicWrapper from "@/wrappers/services/graphic-design/HeroGraphicWrapper";
import WhyGraphicWrapper from "@/wrappers/services/graphic-design/WhyGraphicWrapper";
import ProcessGraphicWrapper from "@/wrappers/services/graphic-design/ProcessGraphicWrapper";
import WhoGraphicWrapper from "@/wrappers/services/graphic-design/WhoGraphicWrapper";
import FaqGraphicWrapper from "@/wrappers/services/graphic-design/FaqGraphicWrapper";
// import CtaGraphicWrapper from "@/wrappers/services/graphic-design/CtaGraphicWrapper"; // If needed/uncommented

export const revalidate = 3600; // Rebuild every hour

export default async function GraphicDesignPage({ params }: { params: Promise<{ lang: "en" | "am" }> }) {
    const { lang } = await params;

    return (
        <>
            <HeroGraphicWrapper lang={lang} />

            <Container>
                <WhyGraphicWrapper lang={lang} />
            </Container>

            <div className="div" id="our-process-graphic">
                <ProcessGraphicWrapper lang={lang} />
            </div>

            <Container>
                <WhoGraphicWrapper lang={lang} />
            </Container>

            <Container>
                <FaqGraphicWrapper lang={lang} />
            </Container>

            {/* <Container>
         <CtaGraphicWrapper lang={lang} />
      </Container> */}
        </>
    );
}
