// components/Home/About.tsx
import {Image} from "@heroui/image";
import { AccentText, SectionHeading, Paragraph } from "@/components/ui/typography";

export default function AboutUsSection() {
  return (
    <section className="relative z-10 py-24 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Column: Image */}
        <div className="w-full md:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
             isBlurred
              src="https://heroui.com/images/hero-card-complete.jpeg" // Replace with your image path
              alt="Team collaboration"
              width={600}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <AccentText>Who we are</AccentText> 
          <SectionHeading>
            Fueling Growth Through Strategy & Creativity
          </SectionHeading>
          <Paragraph>
            At Buzz Digital Agency, we blend data-driven strategy with creative excellence. Our diverse team brings decades of experience in transforming B2B brands and building digital ecosystems that perform.
          </Paragraph>
          <Paragraph>
            From messaging clarity to bold visuals and technical SEO, we provide everything you need to stand out in a crowded market. We believe in relationships, not just deliverables.
          </Paragraph>
        </div>
      </div>
    </section>
  );
}
