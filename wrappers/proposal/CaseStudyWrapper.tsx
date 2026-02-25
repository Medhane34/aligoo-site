// wrappers/proposal/CaseStudyWrapper.tsx
import type { CaseStudyData } from "@/types/ProposalType";

import CaseStudySection from "@/components/proposal/CaseStudySection";

interface CaseStudyWrapperProps {
  caseStudy?: CaseStudyData | null;
}

export default function CaseStudyWrapper({ caseStudy }: CaseStudyWrapperProps) {
  // Don't render if disabled or no data
  if (!caseStudy?.enabled) return null;

  return <CaseStudySection data={caseStudy} />;
}
