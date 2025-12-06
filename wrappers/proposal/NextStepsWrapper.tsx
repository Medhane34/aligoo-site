'use client'

import NextStepsSection from '@/components/proposal/NextSteps'
import { NextStepsSection as NextStepsSectionType } from '@/types/ProposalType'

interface NextStepsWrapperProps {
  nextSteps?: NextStepsSectionType
  daysLeftText?: string
  onProceedToContract?: () => void
}

export default function NextStepsWrapper({
  nextSteps,
  daysLeftText = '14 days',
  onProceedToContract,
}: NextStepsWrapperProps) {
  console.log('NextStepsWrapper received:', nextSteps)
  if (!nextSteps?.enabled || !nextSteps.steps?.length) {
    return null
  }

  // Map the steps and ensure the first one is marked as current if status is missing
  const stepsWithStatus = nextSteps.steps.map((step, index) => ({
    ...step,
    status: step.status || (index === 0 ? 'current' : 'pending'),
    // Ensure details is string[]
    details: step.details || [],
    // Ensure faqs is correct structure
    faqs: step.faqs || []
  }))

  return (
    <NextStepsSection
      title={nextSteps.title}
      subtitle={nextSteps.subtitle}
      daysLeftText={daysLeftText}
      steps={stepsWithStatus}
      onProceedToContract={onProceedToContract}
    />
  )
}
