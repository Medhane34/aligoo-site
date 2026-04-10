import { StructureBuilder } from 'sanity/structure'
// Import necessary icons for services (e.g., Tag/Price for offerings)
import { TagIcon, StarIcon } from '@sanity/icons'

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
                    "ourProcessSection",
                    "faqSection",
                    "ctaSection"
                  ] && page == "facebook-ads"`
                )
            ),

          // web Design 
          S.listItem()
            .title('Web Design')
            // Assigns a StarIcon to highlight this specific service
            .icon(StarIcon)
            .child(
              S.documentList()
                .title('Web Design Sections')
                .filter(
                  `_type in [
                    "heroSection",
                    "whyServiceWorksSection",
                    "webDesignProcessSection",
                    "whoThisIsForSection",
                    "ourProcessSection",
                    "faqSection",
                    "ctaSection"
                  ] && page == "web-design"`
                )
            ),
          // digital marketing 
          S.listItem()
            .title('Digital Marketing')
            .icon(StarIcon)
            .child(
              S.documentList()
                .title('Digital Marketing Sections')
                .filter(
                  `_type in [
                    "heroSection",
                    "whyServiceWorksSection",
                    "digitalMarketingProcessSection",
                    "whoThisIsForSection",
                    "ourProcessSection",
                    "faqSection",
                    "ctaSection"
                  ] && page == "digital-marketing"`
                )
            ),
          // seo 
          S.listItem()
            .title('Seo')
            .icon(StarIcon)
            .child(
              S.documentList()
                .title('Seo Sections')
                .filter(
                  `_type in [
                    "heroSection",
                    "whyServiceWorksSection",
                    "seoProcessSection",
                    "whoThisIsForSection",
                    "ourProcessSection",
                    "faqSection",
                    "ctaSection"
                  ] && page == "seo"`
                )
            ),
          // content writing 
          S.listItem()
            .title('Content Writing')
            .icon(StarIcon)
            .child(
              S.documentList()
                .title('Content Writing Sections')
                .filter(
                  `_type in [
                    "heroSection",
                    "whyServiceWorksSection",
                    "contentWritingProcessSection",
                    "whoThisIsForSection",
                    "ourProcessSection",
                    "faqSection",
                    "ctaSection"
                  ] && page == "content-writing"`
                )
            ),
          // graphic design 
          S.listItem()
            .title('Graphic Design')
            .icon(StarIcon)
            .child(
              S.documentList()
                .title('Graphic Design Sections')
                .filter(
                  `_type in [
                    "heroSection",
                    "whyServiceWorksSection",
                    "graphicDesignProcessSection",
                    "whoThisIsForSection",
                    "ourProcessSection",
                    "faqSection",
                    "ctaSection"
                  ] && page == "graphic-design"`
                )
            ),
          // tiktok ads 
          S.listItem()
            .title('TikTok Ads')
            .icon(StarIcon)
            .child(
              S.documentList()
                .title('TikTok Ads Sections')
                .filter(
                  `_type in [
                    "heroSection",
                    "whyServiceWorksSection",
                    "tiktokAdsProcessSection",
                    "whoThisIsForSection",
                    "ourProcessSection",
                    "faqSection",
                    "ctaSection"
                  ] && page == "tiktok-ads"`
                )
            ),
          // funnel mapping 
          S.listItem()
            .title('Funnel Mapping')
            .icon(StarIcon)
            .child(
              S.documentList()
                .title('Funnel Mapping Sections')
                .filter(
                  `_type in [
                    "heroSection",
                    "whyServiceWorksSection",
                    "funnelMappingProcessSection",
                    "whoThisIsForSection",
                    "ourProcessSection",
                    "faqSection",
                    "ctaSection"
                  ] && page == "funnel-mapping"`
                )
            ),


        ])
    )
