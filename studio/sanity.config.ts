// sanity.config.ts
import { defineConfig, buildLegacyTheme } from 'sanity'
import { schemaTypes } from './schemaTypes'
import { presentationTool, defineLocations } from 'sanity/presentation'
import deskStructure from './structure/deskStructure'
import { structureTool } from 'sanity/structure'
import seofields from 'sanity-plugin-seofields'
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { workflowManager } from '@multidots/sanity-plugin-workflow-manager'
import { AligooLogo } from './components/Logo'
import { CustomNavbar } from './components/CustomNavbar'
import { EarthAmericasIcon } from '@sanity/icons'


const aligooTheme = buildLegacyTheme({
  /* Brand colors */
  '--brand-primary': '#E63939',
  '--focus-color': '#E63939',

  /* Typography settings */
  '--main-navigation-color': '#1f2937',
  '--main-navigation-color--inverted': '#ffffff',

  /* Button and State colors */
  '--state-info-color': '#E63939',
  '--state-success-color': '#10B981',
  '--state-warning-color': '#F59E0B',
  '--state-danger-color': '#EF4444',
} as any)

export default defineConfig([
  {
    name: 'production',
    title: 'Production',
    projectId: 'mcpko9lw',
    dataset: 'production',
    basePath: '/studio',

    icon: AligooLogo,
    logo: AligooLogo,
    mediaLibrary: {
      enabled: true,
    },

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

    schema: { types: schemaTypes as any, },
    theme: aligooTheme,
    studio: {
      components: {
        logo: AligooLogo,
        navbar: CustomNavbar,        // This replaces the default navbar
      },
    },

    // Custom Publish action: syncs title from title_en before publishing
    // so the Workflow Manager calendar displays the correct title.
    document: {
      actions: (prev, context) => {
        if (context.schemaType !== 'post') return prev
        return prev.map((action: any) => {
          if (action.action !== 'publish') return action
          const originalAction = action
          return (props: any) => {
            const originalResult = originalAction(props)
            if (!originalResult) return originalResult
            return {
              ...originalResult,
              onHandle: async () => {
                // Sync title before publishing
                const doc = props.draft ?? props.published
                if (doc && (doc as Record<string, unknown>).title_en) {
                  await props.client
                    .patch(doc._id)
                    .set({ title: (doc as Record<string, unknown>).title_en })
                    .commit()
                }
                if (originalResult.onHandle) {
                  await originalResult.onHandle()
                }
              },
            }
          }
        })
      },
    },
  },

  {
    name: 'automation',
    title: 'Automation',
    projectId: 'mcpko9lw',
    dataset: 'automation',
    icon: EarthAmericasIcon,
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
    theme: aligooTheme,
    studio: {
      components: {
        navbar: CustomNavbar,
      },
    },
  },
])