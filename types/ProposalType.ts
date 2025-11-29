export interface HeroData {
  title: string
  subtitle?: string
  backgroundImage?: { asset: { url: string } }
}

export interface TimelineItem {
  week: string
  title: string
  description?: string
}

export interface ComparisonTableItem {
  _key: string
  feature: string
  basic: string
  pro: string
  enterprise: string
  note?: string
}

export interface ComparisonTableGroup {
  _key: string
  groupTitle: string
  backgroundColor?: string
  items: ComparisonTableItem[]
}

export interface ComparisonTable {
  recommendedPackage?: 'basic' | 'pro' | 'enterprise'
  groups: ComparisonTableGroup[]
}

export interface PackagePricing {
  basic: number
  pro: number
  enterprise: number
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

// ADD THESE NEW INTERFACES
export interface ContractTemplateSection {
  heading: string
  body: string
  bullets?: string[]
}

export interface ContractTemplateData {
  _id: string
  title: string
  header: {
    mainHeading: string
    preparedForText: string
    createdByText: string
  }
  sections: ContractTemplateSection[]
  priceSection: {
    heading: string
    body: string
    autoGenerateTable: boolean
  }
  legalSections: ContractTemplateSection[]
  agencySignature: {
    companyName: string
    signerName: string
    signatureImage?: {
      asset: { url: string }
    }
  }
}

export type ProposalData = {
  clientEmail: string | undefined
  _id: string
  clientName: string
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'contract_sent' | 'signed' | 'expired' | 'payment_pending' | 'paid'
  recommendedPackage?: 'basic' | 'pro' | 'enterprise' | null;
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
  comparisonTable?: ComparisonTable
  packagePricing?: PackagePricing
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

// ──────────────────────────────────────────────────────────────
// EXTENDED: CONTRACT-READY PROPOSAL (only used on /contract page)
// ──────────────────────────────────────────────────────────────
export interface ContractReadyProposal extends ProposalData {
  contractTemplate: ContractTemplateData
  clientSignature?: {
    asset?: { url: string }
  } | null
  signedContractPdf?: {
    url: string
  } | null
  contractSignedAt?: string | null
}