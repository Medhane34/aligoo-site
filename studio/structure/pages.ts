import { StructureBuilder } from 'sanity/structure'
import { AddCircleIcon, StarIcon, UserIcon } from '@sanity/icons'
import TelegramPreview from '../components/TelegramPreview'
import { services } from './ services'

export const pages = (S: StructureBuilder) =>
  S.listItem()
    .title('Pages')
    .icon(AddCircleIcon)
    .child(
      S.list()
        .title('Pages')
        .items([
          S.listItem()
            .title('Home Page')
            .child(
              S.list()
                .title('Home Page')
                .items([
                  S.listItem()
                    .title('Home Page Sections')
                    .child(
                      S.documentList()
                        .title('Home Page Sections')
                        .filter(
                          `(
                  // Shared schemas - filter by page field
                  (_type == "heroSection" && page == "home") ||

                  // Page-specific schemas - no need for page filter
                  _type in [
                    "aboutUsSection",
                    "statsSection",
                    "serviceSection",
                    "processSection",
                    "whyUsSection",
                    "testimonial"
                  ]
                )`
                        )
                    ),
                  S.divider(),
                  S.listItem()
                    .title('Testimonials')
                    .icon(UserIcon)
                    .child(S.documentList().title('Testimonials').filter('_type == "teamMember"')),
                ])
            ),

          S.listItem()
            .title('About Page')
            .child(
              S.documentList()
                .title('About Page Sections')
                .filter(
                  `(
                  // Shared schemas - filter by page field
                  (_type == "heroSection" && page == "about") ||

                  // Page-specific schemas - no need for page filter
                  _type in [
                   "aboutIntroSection",
                    "aboutOurWaySection",
                    "valuesSection",
                    "teamSection", 
                    "meaningSection", 
                    "ourWaySection"
                  ]
                )`

                )
            ),

          S.listItem()
            .title('Works Page')
            .child(
              S.documentList()
                .title('Works Page Sections')
                .filter(
                  `_type in [
                    "featuredCaseStudy",
                    "industriesSection"
                  ]`
                )
            ),

          S.listItem()
            .title('Contact Page')
            .child(
              S.documentList()
                .title('Contact Page Sections')
                .filter(`_type in ["contactSection"]`)
            ),
          S.divider(),



          services(S),


          S.listItem()
            .title('Proposal Page')
            .child(
              S.list()
                .title('Proposal Page')
                .items([
                  S.listItem()
                    .title('Proposal All Sections')
                    .child(
                      S.documentList()
                        .title('Proposal Page Sections')
                        .filter(
                          `_type in [
                            "proposalTemplate",
                            "proposal", 
                            "salesUser"
                          ]`
                        )
                    ),
                  S.divider(),
                  S.listItem()
                    .title('Team Members')
                    .icon(UserIcon)
                    .child(S.documentList().title('Team Members').filter('_type == "teamMember"')),
                  S.divider(),
                  S.listItem()
                    .title('Proposal Templates')
                    .icon(UserIcon)
                    .child(S.documentList().title('Proposal Templates').filter('_type == "proposalTemplate"')),
                  S.divider(),
                  S.listItem()
                    .title('Proposals')
                    .icon(UserIcon)
                    .child(S.documentList().title('Proposals').filter('_type == "proposal"')),
                  S.divider(),
                  S.listItem()
                    .title('Contract Templates')
                    .icon(UserIcon)
                    .child(S.documentList().title('Contract Templates').filter('_type == "contractTemplate"')),
                ])
            ),
          S.listItem()
            .title('Telegram Marketing Page')
            .child(
              S.list()
                .title('Proposal Page')
                .items([
                  S.listItem()
                    .title('Proposal All Sections')
                    .child(
                      S.documentList()
                        .title('Proposal Page Sections')
                        .filter(
                          `_type in [
                            "subscriber", 
                            "campaign"
                          ]`
                        )
                    ),
                  S.divider(),
                  S.listItem()
                    .title('Campaign Messages')
                    .icon(UserIcon)
                    .child(
                      S.list()
                        .title('Campaigns')
                        .items([
                          S.listItem()
                            .title('All Campaigns')
                            .child(
                              S.documentList()
                                .title('All Campaigns')
                                .filter('_type == "campaign"')
                                .child((documentId) =>
                                  S.document()
                                    .documentId(documentId)
                                    .schemaType('campaign')
                                    .views([
                                      S.view.form(),
                                      S.view
                                        .component(TelegramPreview)
                                        .title('Preview')
                                    ])
                                )
                            ),
                          S.divider(),
                          S.listItem()
                            .title('🎨 Web Design Campaigns')
                            .child(
                              S.documentList()
                                .title('Web Design Campaigns')
                                .filter('_type == "campaign" && service == "web-design"')
                                .child((documentId) =>
                                  S.document()
                                    .documentId(documentId)
                                    .schemaType('campaign')
                                    .views([
                                      S.view.form(),
                                      S.view
                                        .component(TelegramPreview)
                                        .title('Preview')
                                    ])
                                )
                            ),
                          S.listItem()
                            .title('🔄 Web Redesign Campaigns')
                            .child(
                              S.documentList()
                                .title('Web Redesign Campaigns')
                                .filter('_type == "campaign" && service == "web-redesign"')
                                .child((documentId) =>
                                  S.document()
                                    .documentId(documentId)
                                    .schemaType('campaign')
                                    .views([
                                      S.view.form(),
                                      S.view
                                        .component(TelegramPreview)
                                        .title('Preview')
                                    ])
                                )
                            ),
                          S.listItem()
                            .title('🔍 SEO Campaigns')
                            .child(
                              S.documentList()
                                .title('SEO Campaigns')
                                .filter('_type == "campaign" && service == "seo"')
                                .child((documentId) =>
                                  S.document()
                                    .documentId(documentId)
                                    .schemaType('campaign')
                                    .views([
                                      S.view.form(),
                                      S.view
                                        .component(TelegramPreview)
                                        .title('Preview')
                                    ])
                                )
                            ),
                          S.listItem()
                            .title('📘 Facebook & Instagram Ads')
                            .child(
                              S.documentList()
                                .title('FB & Insta Ads Campaigns')
                                .filter('_type == "campaign" && service == "facebook-ads"')
                                .child((documentId) =>
                                  S.document()
                                    .documentId(documentId)
                                    .schemaType('campaign')
                                    .views([
                                      S.view.form(),
                                      S.view
                                        .component(TelegramPreview)
                                        .title('Preview')
                                    ])
                                )
                            ),
                          S.listItem()
                            .title('🎵 TikTok Ads')
                            .child(
                              S.documentList()
                                .title('TikTok Ads Campaigns')
                                .filter('_type == "campaign" && service == "tiktok-ads"')
                                .child((documentId) =>
                                  S.document()
                                    .documentId(documentId)
                                    .schemaType('campaign')
                                    .views([
                                      S.view.form(),
                                      S.view
                                        .component(TelegramPreview)
                                        .title('Preview')
                                    ])
                                )
                            ),
                        ])
                    ),
                  S.divider(),
                  S.listItem()
                    .title('Subscribers')
                    .icon(UserIcon)
                    .child(S.documentList().title('Subscribers').filter('_type == "subscriber"')),
                ])
            ),



        ])
    )
