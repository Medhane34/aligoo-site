// components/wrappers/PackagesWrapper.tsx
import type { ProposalData } from "@/types/ProposalType";

import Calculator from "@/components/proposal/Calculator";

interface PackagesWrapperProps {
  packages: ProposalData["template"]["basePackages"];
  addOns: ProposalData["template"]["addOns"];
  currentSelection: ProposalData["currentSelection"];
  proposalId: string;
  uniqueCode: ProposalData["uniqueCode"];
}

export default function PackagesWrapper({
  packages,
  addOns,
  currentSelection,
  proposalId,
  uniqueCode,
}: PackagesWrapperProps) {
  console.log("PackagesWrapper received uniqueCode →", uniqueCode);
  console.log("PackagesWrapper received proposalId →", proposalId);
  console.log("Full props →", {
    packages,
    addOns,
    currentSelection,
    proposalId,
    uniqueCode,
  });

  return (
    <Calculator
      addOns={addOns}
      initialSelection={currentSelection}
      packages={packages}
      proposalId={proposalId}
      uniqueCode={uniqueCode}
    />
  );
}
