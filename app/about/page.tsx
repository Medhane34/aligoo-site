import { title } from "@/components/primitives";
import HeroSection from "./HeroSection";
import Intro from "./Intro";
import Values from "./values";
import MeaningSection from "./Meanining";
import AligooMarketingFix from "./ourway";
import MeetThePeople from "./team";
export default function AboutPage() {
  return (
    <><HeroSection />
    <Intro />
   <MeaningSection />
   <AligooMarketingFix />
    <Values />
    <MeetThePeople />
    </>
  );
}
