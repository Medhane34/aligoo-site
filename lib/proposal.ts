// lib/proposal.ts
import { client } from '@/src/sanity/client'
import { PROPOSAL_BY_CODE_QUERY } from '@/sanity/queries/proposal'

export interface TimelineItem {
  week: string
  title: string
  description?: string
}

export interface TimelineSection {
  enabled: boolean
  sectionTitle?: string
  items: TimelineItem[]
}

export interface BasePackage {
  name: string
  price: number
  isDefault: boolean
  popular: boolean
  features: string[]
}

export interface AddOn {
  name: string
  price: number
  category?: string
  preselected: boolean
  description?: string
}

export type ProposalData = {
  clientEmail: string | undefined
  _id: string
  clientName: string
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'expired' | 'payment_pending' | 'paid'
  expiresAt: string
  uniqueCode: string,
  paymentProof: {
    _id: string
    asset: {
      _id: string
      url: string
    }
    caption?: string
  } | null,
  currentSelection: {
    selectedPackage?: string
    selectedAddOns?: string[]
    totalPrice?: number
    depositPercentage?: number
    paymentStatus?: 'none' | 'pending' | 'paid' | 'failed'
    paymentConfirmedByClientAt?: string
    paymentConfirmedAt?: string
  } | null
  template: {
    _id: string
    title: string
    hero: {
      title: string
      subtitle?: string
      backgroundImage?: { asset?: { url: string } }
    }
    basePackages: BasePackage[]
    addOns: AddOn[]
    timeline: TimelineSection | null
    testimonials: any
    faq: any
    extraSections: any[]
  }
  salesperson: {
    name: string
    email: string

    telegramChatId?: string
  } | null
}

export async function getProposalByCode(code: string): Promise<ProposalData | null> {
  try {
    const proposal = await client.fetch<ProposalData>(
      PROPOSAL_BY_CODE_QUERY,
      { code },
      /* { next: { revalidate: 60 } } */
    )
    console.log('Fresh proposal fetched:', proposal?.uniqueCode) // ← ADD THIS
    return proposal || null
  } catch (error) {
    console.error('Fetch error:', error)
    return null
  }
}