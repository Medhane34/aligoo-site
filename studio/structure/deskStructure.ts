import { StructureBuilder } from 'sanity/structure'
import React, { lazy, Suspense } from 'react'

const SEOPane = lazy(() => import('sanity-plugin-seo-pane').then(m => ({ default: m.SEOPane })))

const LazySEOPane = (props: any) =>
  React.createElement(
    Suspense,
    { fallback: React.createElement('div', null, 'Loading SEO pane...') },
    React.createElement(SEOPane, props)
  )

import { pages } from './pages'
import { services } from './ services'
import { shared } from './shared'

export default (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // ⚙️ Global Site Settings
      S.listItem()
        .title('Site Settings (SEO & Business)')
        .id('global-config')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),

      pages(S),
      services(S),
      shared(S),
      S.divider(),

      // Updated Post item with SEO View
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('All Posts')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('post')
                .views([
                  S.view.form(), // Standard editing form
                  S.view
                    .component(LazySEOPane)
                    .options({
                      // 1. Point to your keywords field in post.ts
                      keywords: `seo.keywords`,
                      // 2. Map to your Next.js route
                      url: (doc: any) => `https://aligoo-digital.agency/en/blog/${doc.slug?.current || ''}`,
                    })
                    .title('SEO Analysis'),
                ])
            )
        ),

      S.documentTypeListItem('caseStudy').title('Case Studies'),
      S.documentTypeListItem('category').title('Categories'),
    ])