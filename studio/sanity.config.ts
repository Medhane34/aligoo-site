// sanity.config.ts
import { defineConfig } from 'sanity'
import { schemaTypes } from './schemaTypes'
import { presentationTool, defineLocations } from 'sanity/presentation'
import deskStructure from './structure/deskStructure'
import { structureTool } from 'sanity/structure'
import seofields from 'sanity-plugin-seofields'
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { workflowManager } from '@multidots/sanity-plugin-workflow-manager'
export default defineConfig([
  {
    name: 'production',
    title: 'Production',
    projectId: 'mcpko9lw',
    dataset: 'production',
    basePath: '/studio',
    plugins: [
      seofields(),
      structureTool({
        structure: deskStructure,
      }),
      presentationTool({
        previewUrl: {
          origin: 'https://aligoo-digital.agency',
          previewMode: {
            enable: '/api/draft-mode/enable',
          },
        },
        resolve: {
          mainDocuments: [
            {
              route: '/en/blog/:slug',
              filter: `_type == "post" && slug.current == $slug`,
            },
          ],
          locations: {
            post: defineLocations({
              select: {
                title: 'title',
                slug: 'slug.current',
              },
              resolve: (doc) => ({
                locations: [
                  {
                    title: (doc && doc.title) ? doc.title : 'Untitled',
                    href: `/en/blog/${(doc && doc.slug) ? doc.slug : ''}`,
                  },
                ],
              }),
            }),
          },
        },
      }),
      workflowManager({
        // Define your workflow states
        states: [
          {
            id: 'draft',
            title: 'Draft',
            color: 'primary',
            transitions: ['review']
          },
          {
            id: 'review',
            title: 'In Review',
            color: 'warning',
            transitions: ['approved', 'changes-requested'],
            requireAssignment: true
          },
          {
            id: 'approved',
            title: 'Approved',
            color: 'success',
            requireAssignment: true,
            requireValidation: true
          }
        ],
        // Apply workflow ONLY to these two document types
        schemaTypes: ['post', 'caseStudy'],

        // Optional: Enable user assignment (if you have users in Sanity)
        enableAssignment: true,

        // Optional: Show publishing calendar
        showCalendar: true,
      }),
    ],
    schema: {
      types: schemaTypes as any,
    },
  },
  {
    name: 'automation',
    title: 'Automation',
    projectId: 'mcpko9lw',
    dataset: 'automation',
    basePath: '/automation',
    plugins: [
      seofields(),
      structureTool({
        structure: (S) =>
          S.list()
            .title('Automation')
            .items([
              // 📂 Telegram Automation
              S.listItem()
                .title('Telegram Automation')
                .child(
                  S.list()
                    .title('Telegram Automation')
                    .items([
                      S.documentTypeListItem('subscriber').title('Subscribers'),

                      // 📂 Campaigns (Grouped)
                      S.listItem()
                        .title('Campaigns')
                        .child(
                          S.list()
                            .title('Campaigns')
                            .items([
                              S.listItem()
                                .title('All Campaigns')
                                .child(S.documentTypeList('campaign').title('All Campaigns')),
                              S.divider(),
                              // Filtered Lists by Target Audience
                              S.listItem()
                                .title('Web Design')
                                .child(
                                  S.documentList()
                                    .title('Web Design Campaigns')
                                    .filter('_type == "campaign" && service == "web-design"')
                                ),
                              S.listItem()
                                .title('Web Redesign')
                                .child(
                                  S.documentList()
                                    .title('Web Redesign Campaigns')
                                    .filter('_type == "campaign" && service == "web-redesign"')
                                ),
                              S.listItem()
                                .title('SEO')
                                .child(
                                  S.documentList()
                                    .title('SEO Campaigns')
                                    .filter('_type == "campaign" && service == "seo"')
                                ),
                              S.listItem()
                                .title('Facebook Ads')
                                .child(
                                  S.documentList()
                                    .title('Facebook Ads Campaigns')
                                    .filter('_type == "campaign" && service == "facebook-ads"')
                                ),
                              S.listItem()
                                .title('TikTok Ads')
                                .child(
                                  S.documentList()
                                    .title('TikTok Ads Campaigns')
                                    .filter('_type == "campaign" && service == "tiktok-ads"')
                                ),
                              S.listItem()
                                .title('Others (No Specific Audience)')
                                .child(
                                  S.documentList()
                                    .title('General Campaigns')
                                    .filter('_type == "campaign" && !defined(service)')
                                ),
                            ])
                        ),

                      S.documentTypeListItem('interaction').title('Interactions'),
                    ])
                ),

              S.divider(),

              // 📂 Proposal Automation
              S.listItem()
                .title('Proposal Automation')
                .child(
                  S.list()
                    .title('Proposal Automation')
                    .items([
                      S.documentTypeListItem('proposal').title('Proposals'),
                      S.documentTypeListItem('proposalTemplate').title('Proposal Templates'),
                      S.documentTypeListItem('contractTemplate').title('Contract Templates'),
                      S.divider(),
                      S.documentTypeListItem('teamMember').title('Team Members'),
                      S.documentTypeListItem('salesUser').title('Sales Users'),
                    ])
                ),
            ]),
      }),

    ],
    schema: {
      types: schemaTypes as any,
    },
  },
])