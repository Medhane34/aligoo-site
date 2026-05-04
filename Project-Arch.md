🏗 Project Overview & Architecture

  The project follows a Headless CMS architecture designed for scalability, content resilience,
  and automation.

  Core Architecture
   - Frontend: Next.js 15 (App Router) (https://nextjs.org/) using TypeScript. It provides a
     multilingual (English/Amharic) user experience with server-side rendering (SSR) and static
     site generation (SSG).
   - Backend/CMS: Sanity Studio v3 (https://www.sanity.io/). A decoupled content management system
     that allows real-time content updates without code deployments.
   - Data Flow: The frontend fetches data from Sanity via GROQ queries. It features a custom
     Fallback System that serves static data if the Sanity API is unavailable.
   - Automation: Integrated Telegram Bot for marketing and a Document-based Proposal System.

  ---

  📂 Folder Structure

    1 /
    2 ├── apps/
    3 │   ├── studio/          # Sanity Studio v3 (CMS)
    4 │   │   ├── schemaTypes/ # Document and object definitions
    5 │   │   ├── structure/   # Custom Desk Structure (sidebar layout)
    6 │   │   └── components/  # Custom Studio UI components
    7 │   └── web/             # Next.js 15 Frontend
    8 │       ├── app/         # App Router (Pages & API Routes)
    9 │       ├── components/  # Shared React components
   10 │       ├── sanity/      # GROQ queries and Sanity client config
   11 │       ├── lib/         # Utility functions and data fallbacks
   12 │       └── public/      # Static assets (images, videos)

  ---

  🚀 Key Technologies

  ┌────────────┬───────────────┬──────────────────────────────────────────────────────┐
  │ Technology │ Purpose       │ Why?                                                 │
  ├────────────┼───────────────┼──────────────────────────────────────────────────────┤
  │ Next.js 15 │ Frontend      │ Turbopack performance, App Router flexibility, and   │
  │            │ Framework     │ built-in SEO optimizations.                          │
  │ Sanity v3  │ Content       │ Real-time collaboration, highly customizable UI, and │
  │            │ Management    │ powerful GROQ querying.                              │
  │ GramIO     │ Telegram Bot  │ Lightweight and type-safe framework for building     │
  │            │               │ Telegram automation.                                 │
  │ HeroUI     │ UI Components │ Modern, accessible component library for rapid UI    │
  │            │               │ development.                                         │
  │ Framer     │ Animations    │ Smooth, hardware-accelerated transitions and         │
  │ Motion     │               │ interactions.                                        │
  └────────────┴───────────────┴──────────────────────────────────────────────────────┘
  ---

  🔄 Frontend & Sanity Collaboration

  1. Multilingual Support
  The project uses a sub-path routing strategy (/[lang]/...). Content in Sanity is often modeled
  with language-specific fields (e.g., title_en, title_am).
   - Frontend Logic: Queries detect the lang parameter and fetch the corresponding fields.
   - Fallback Logic: If a query fails, the web/src/sanity/client.ts intercepts the error and
     returns localized static data from web/lib/data-fallbacks.

  2. Shared Schemas & 'Page' Filtering
  To keep the CMS organized, we use Shared Schemas for recurring elements like the heroSection.
   - The 'Page' Field: The heroSection schema includes a hidden or read-only page field.
   - Structure Builder: In studio/structure/pages.ts, we use GROQ filters to show only the
     relevant documents for each page:

   1   // Example filter for Home Page sections
   2   S.documentList()
   3     .title('Home Page Sections')
   4     .filter('_type == "heroSection" && page == "home" || _type == "aboutUsSection"')

  ---

  ✨ Main Features

  🤖 Telegram Automation
  Located in web/app/api/telegram/bot/route.ts, the bot handles:
   - Lead Capture: Automatically saves subscribers to the automation dataset in Sanity.
   - User Profiling: Asks for phone numbers and service interests (Web Design, SEO, etc.) via
     interactive buttons.
   - Interaction Tracking: Logs button clicks and campaign views for analytics.

  📄 Proposal System
  A specialized workflow for generating professional client proposals directly within the Studio.
   - Templates: Pre-defined sections for services and contracts.
   - Dynamic Generation: Proposals are modeled as documents that can be customized for specific
     clients.

  📈 SEO & Performance
   - Dynamic Metadata: Generated in web/app/[lang]/page.tsx using a centralized createPageMetadata
     utility.
   - Sanity SEO Plugin: Integrated sanity-plugin-seofields for per-page SEO management.
   - Structured Data: Automatic JSON-LD schema generation for Local Business and Website.

  ---

  🛠 Setup & Development

  Prerequisites
   - Node.js 18+
   - Sanity CLI (npm install -g sanity)
   - Environment variables configured in .env files.

  1. Clone & Install

   1 git clone <repo-url>
   2 npm install

  2. Run Locally
   - Frontend: cd apps/web && npm run dev (Runs on localhost:3000)
   - Studio: cd apps/studio && npm run dev (Runs on localhost:3333)

  3. Syncing Data
  To sync titles for the workflow manager:

   1 cd apps/studio
   2 npx ts-node scripts/sync-post-titles.ts

  ---

  📦 Deployment Notes (Vercel)

  The project is optimized for deployment on Vercel.

   1. Environment Variables: Ensure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and
      SANITY_API_READ_WRITE_TOKEN are set in the Vercel dashboard.
   2. CORS: Add your Vercel deployment URL to the Sanity Project Management dashboard under
      Settings > API Settings > CORS origins.
   3. Draft Mode: The project supports Sanity's "Presentation" tool for live previews. Configure
      the preview URL to https://your-domain.com/api/draft-mode/enable.

  ---

  This wiki is a living document. For major architectural changes, please update the corresponding
  sections.