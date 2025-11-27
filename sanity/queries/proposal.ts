// sanity/queries/proposal.ts
import { groq } from 'next-sanity'

export const PROPOSAL_BY_CODE_QUERY = groq`
  *[_type == "proposal" && uniqueCode == $code][0] {
    _id,
    clientName,
    clientEmail,
    clientPhone,
    uniqueCode,                 
    status,
    expiresAt,
    currentSelection,
    paymentProof,
    viewLogs,
    "template": template-> {
      _id,
      title,
      hero {
        title,
        subtitle,
        backgroundImage {
          asset-> {
            _id,
            url
          }
        }
      },
      basePackages[] {
        name,
        price,
        isDefault,
        popular,
        features
      },
      addOns[] {
        name,
        price,
        category,
        preselected,
        description
      },
      timeline {
        enabled,
        sectionTitle,
        items[] {
          week,
          title,
          description
        }
      },
      testimonials,
      faq,
      extraSections
    },
    "salesperson": salesperson-> {
      name,
      email,
      telegramChatId
    }
  }
`