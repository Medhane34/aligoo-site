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
    daysLeftText,
    currentSelection,
    paymentProof,
    viewLogs,
    recommendedPackage,
   // PERSONALIZED VIDEO GREETING (PER-PROPOSAL!)
    "videoGreeting": videoGreeting {
  enabled,
  "tooltipText": greetingText,
  "videoUrl": video.asset->url,
  "thumbnailUrl": thumbnail.asset->url
},
    // COMPARISON TABLE (with per-proposal override)
    "comparisonTable": {
      ...template->.comparisonTable,
      "recommendedPackage": coalesce(
        recommendedPackage,
        template->.comparisonTable.recommendedPackage
      )
    },
    
    "packagePricing": template->.packagePricing,

    // MOCKUP SHOWCASE (with per-proposal override)
    "mockupShowcase": {
      ...template->.mockupShowcase,
      "video": coalesce(mockupShowcase.video.asset->url, template->.mockupShowcase.video.asset->url),
      "mockupLink": coalesce(mockupShowcase.mockupLink, template->.mockupShowcase.mockupLink)
    },

    // DISCOUNT
    "discount": discount {
      enabled,
      percentage,
      reason
    },

    // PROPOSAL TEMPLATE DATA
    "template": template-> {
      _id,
      title,
      hero {
        enabled,
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
      aboutUs {
        enabled,
        badge,
        heading,
        subheading,
        paragraphs,
        expertiseTags,
        cta,
        card
      },
      caseStudy {
        enabled,
        badge,
        heading,
        subheading,
        description,
        projects[] {
          name,
          industry,
          result,
          "image": image.asset->url,
          url,
          color,
          icon
        },
        cta
      },
      mockupShowcase {
        enabled,
        title,
        description,
      },
      testimonials {
        enabled,
        badgeText,
        mainHeading,

        highlightedText,
        items[] {
          name,
          role,
          company,
          "image": image.asset->url,
          content,
          rating
        }
      },
      faq {
        enabled,
        badgeText,
        mainHeading,
        highlightedText,
        items[] {
          question,
          answer
        }
      },
      bonusGift {
        enabled,
        headline,
        urgencyMessage,
        countdownHours,
        ctaText,
        gifts[] {
          title,
          value,
          description,
          features,
          icon
        }
      },
      nextSteps {
        enabled,
        title,
        subtitle,
        steps[] {
          number,
          title,
          description,
          timeEstimate,
          color,
          details,
          faqs[] {
            question,
            answer
          }
        }
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