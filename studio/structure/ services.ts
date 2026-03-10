import {StructureBuilder} from 'sanity/structure'
// Import necessary icons for services (e.g., Tag/Price for offerings)
import {TagIcon, StarIcon} from '@sanity/icons'

export const services = (S: StructureBuilder) =>
  S.listItem()
    .title('Services')
    // Assigns a TagIcon to the top-level Services folder
    .icon(TagIcon)
    .child(
      S.list()
        .title('Services')
        .items([
          S.listItem()
            .title('Facebook Ads')
            // Assigns a StarIcon to highlight this specific service
            .icon(StarIcon)
            .child(
              S.documentList()
                .title('Facebook Ads Sections')
                .filter(
                  `_type in [
                    "heroSection",
                    "whyServiceWorksSection",
                    "facebookAdProcessSection",
                    "whoThisIsForSection",
                    "faqSection",
                    "ctaSection"
                  ]`
                )
            ),
        ])
    )
