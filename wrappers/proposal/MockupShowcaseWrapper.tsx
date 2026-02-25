// wrappers/proposal/MockupShowcaseWrapper.tsx
import type { MockupShowcaseData } from "@/types/ProposalType";

import MockupShowcase from "@/components/proposal/MockupShowcase";

interface MockupShowcaseWrapperProps {
  mockupShowcase?: MockupShowcaseData | null;
}

export default function MockupShowcaseWrapper({
  mockupShowcase,
}: MockupShowcaseWrapperProps) {
  // Don't render if disabled or no data
  if (!mockupShowcase?.enabled) return null;

  return <MockupShowcase data={mockupShowcase} />;
}
