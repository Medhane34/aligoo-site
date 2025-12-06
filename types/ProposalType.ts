import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface HeroData {
  enabled?: boolean
  title: string
  subtitle?: string
  backgroundImage?: string
  videoGreeting?: {
    enabled?: boolean
    videoUrl?: string
    thumbnailUrl?: string
    tooltipText?: string
  } | null
}

//video greeting 
export interface VideoGreeting {
  _type?: 'videoGreeting'
  enabled?: boolean
  videoUrl?: string
  thumbnailUrl?: string
  tooltipText?: string
}

// About Us Section
export interface AboutUsData {
  enabled?: boolean
  badge?: {
    icon?: string
    text?: string
  }
  heading?: string
  subheading?: string
  paragraphs?: string[]
  expertiseTags?: Array<{
    icon?: string
    label?: string
  }>
  cta?: {
    text?: string
    url?: string
  }
  card?: {
    companyName?: string
    establishedYear?: string
    yearsText?: string
    subtitle?: string
    badges?: string[]
  }
}

// Case Study Section
export interface CaseStudyData {
  enabled?: boolean
  badge?: {
    icon?: string
    text?: string
  }
  heading?: string
  subheading?: string
  description?: string
  projects?: Array<{
    name: string
    industry?: string
    result?: string
    image?: {
      asset?: {
        url: string
      }
    }
    url?: string
    color?: string
    icon?: string
  }>
  cta?: {
    text?: string
    url?: string
  }
}

// Mockup Showcase Section
export interface MockupShowcaseData {
  enabled?: boolean
  title?: string
  description?: string
  video?: {
    asset?: {
      url: string
    }
  }
  mockupLink?: string
}
// Testimonials Section 
export interface TestimonialItem {
  name: string
  role: string
  company: string
  image?: { asset?: { url: string } }
  content: string
  rating: number
}
export interface TestimonialsSection {
  enabled?: boolean
  badgeText?: string
  mainHeading?: string
  highlightedText?: string
  items: TestimonialItem[]
}

// faq 
export interface FAQItem {
  question: string
  answer: string
}

export interface FAQSection {
  enabled?: boolean
  badgeText?: string
  mainHeading?: string
  highlightedText?: string
  items: FAQItem[]
}
// Bonus Gifts 
// types/ProposalType.ts
export interface BonusGiftItem {
  title: string
  value: number
  description: string
  features: string[]
  icon?: string
}

export interface BonusGiftSection {
  enabled?: boolean
  headline?: string
  urgencyMessage?: string
  countdownHours?: number
  ctaText?: string
  gifts: BonusGiftItem[]
}

// In template:



//timeline 
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
  enabled?: boolean
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
  description?: any
}

// ADD THESE NEW INTERFACES
export interface ContractTemplateSection {
  heading: string
  body: string
  bullets?: string[]
}

// next steps 
// Add to your existing types

export interface NextStepItem {
  number: number
  title: string
  description: string
  timeEstimate: string
  color: string
  details: string[]
  status: 'current' | 'pending' | 'complete';
  faqs: Array<{
    question: string
    answer: string
  }>
}

export interface NextStepsSection {
  enabled?: boolean
  title?: string
  subtitle?: string
  daysLeftText: string;
  steps: NextStepItem[]
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

// Discount 
export interface Discount {
  enabled: boolean
  percentage: number        // e.g. 15 = 15%
  reason?: string           // optional, shown to client
}

export type ProposalData = {
  clientEmail: string | undefined
  _id: string
  clientName: string
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'contract_sent' | 'signed' | 'expired' | 'payment_pending' | 'paid'
  recommendedPackage?: 'basic' | 'pro' | 'enterprise' | null;
  expiresAt?: string;
  daysLeftText?: string;
  uniqueCode: string,
  videoGreeting?: VideoGreeting | null,
  nextSteps?: NextStepsSection,
  discount?: Discount
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
  mockupShowcase?: MockupShowcaseData
  template: {
    _id: string
    title: string
    hero: {
      [x: string]: any
      title: string
      subtitle?: string
      backgroundImage?: string
      videoGreeting?: VideoGreeting | null
    }
    basePackages: BasePackage[]
    addOns: AddOn[]
    aboutUs?: AboutUsData | null
    caseStudy?: CaseStudyData | null
    mockupShowcase?: MockupShowcaseData | null
    timeline: TimelineSection | null
    testimonials?: TestimonialsSection | null
    faq?: FAQSection | null
    bonusGift?: BonusGiftSection
    nextSteps?: NextStepsSection
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