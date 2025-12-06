
// components/wrappers/PackagesWrapper.tsx
import Calculator from '@/components/proposal/Calculator'
import type { ProposalData } from '@/types/ProposalType'

interface PackagesWrapperProps {
  packages: ProposalData['template']['basePackages']
  addOns: ProposalData['template']['addOns']
  currentSelection: ProposalData['currentSelection']
  proposalId: string
  uniqueCode: ProposalData['uniqueCode']

}

export default function PackagesWrapper({ packages, addOns, currentSelection, proposalId, uniqueCode }: PackagesWrapperProps) {
  console.log('PackagesWrapper received uniqueCode →', uniqueCode)
  console.log('PackagesWrapper received proposalId →', proposalId)
  console.log('Full props →', { packages, addOns, currentSelection, proposalId, uniqueCode })
  return (
    <Calculator
      initialSelection={currentSelection}
      packages={packages}
      addOns={addOns}
      proposalId={proposalId}
      uniqueCode={uniqueCode}
    />
  )
}