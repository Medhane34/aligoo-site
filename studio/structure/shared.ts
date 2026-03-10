import { StructureBuilder } from 'sanity/structure'

export const shared = (S: StructureBuilder) =>
  S.listItem()
    .title('Shared')
    .child(
      S.list()
        .title('Shared Sections')
        .items([
          S.documentTypeListItem('ctaSection').title('CTA Section'),
          S.documentTypeListItem('faqSection').title('FAQ Section'),
          S.documentTypeListItem('sectionHeadingBlock').title('Dynamic Heading'),
          S.documentTypeListItem('heroSection').title('Hero Section'),
          S.documentTypeListItem('ourProcessSection').title('Our Process Section'),
          S.documentTypeListItem('whoThisIsForSection').title('Who This Is For Section'),
          S.documentTypeListItem('whyServiceWorksSection').title('Why Service Works Section'),
          S.documentTypeListItem('whyServiceWorksFeatures').title('Why Service Works (Features Layout)'),
          S.documentTypeListItem('tgPromotion').title('Telegram Promotion'),
        ])
    )
