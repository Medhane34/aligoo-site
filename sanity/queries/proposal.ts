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
    recommendedPackage,

    // COMPARISON TABLE (with per-proposal override)
    "comparisonTable": {
      ...template->.comparisonTable,
      "recommendedPackage": coalesce(
        recommendedPackage,
        template->.comparisonTable.recommendedPackage
      )
    },
    
    "packagePricing": template->.packagePricing,

    // PROPOSAL TEMPLATE DATA
    "template": template-> {
      _id,
      title,
      hero {
        title,
        subtitle,
        "backgroundImage": backgroundImage.asset->url
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
      }
    },

    // SALESPERSON
    "salesperson": salesperson-> {
      name,
      email,
      telegramChatId
    },

    // ─────────────────────── CONTRACT DATA ───────────────────────
    "contractTemplate": contractTemplate-> {
      _id,
      title,
      header,
      sections[] {
        heading,
        body,
        bullets
      },
      priceSection,
      legalSections[] {
        heading,
        body
      },
      agencySignature {
        companyName,
        signerName,
        "signatureImage": signatureImage.asset->url
      }
    },

    // SIGNATURE & PDF
    clientSignature,
    "signedContractPdf": signedContractPdf.asset->url,
    contractSignedAt
  }
`