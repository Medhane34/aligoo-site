

// components/wrappers/TimelineWrapper.tsx
import TimelineSection from '@/components/proposal/TimelineSection'
import type { ProposalData } from '@/types/ProposalType'

interface TimelineWrapperProps {
  timeline: ProposalData['template']['timeline']
}

export default function TimelineWrapper({ timeline }: TimelineWrapperProps) {
  // Hide if disabled or no items
  if (!timeline?.enabled || !timeline.items || timeline.items.length === 0) {
    return null
  }

  return <TimelineSection timeline={timeline} />
}