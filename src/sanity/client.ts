import { createClient, type QueryParams, type ClientConfig } from "next-sanity";
import {
  FALLBACK_HERO,
  FALLBACK_ABOUT,
  FALLBACK_STATS,
  FALLBACK_SERVICES,
  FALLBACK_PROCESS,
  FALLBACK_WHY_US,
  FALLBACK_TESTIMONIALS,
  FALLBACK_CTA,
  FALLBACK_CASE_STUDIES,
  FALLBACK_BLOG_POSTS,
  FALLBACK_WORKS,
  FALLBACK_GENERIC_SERVICE,
  FALLBACK_ABOUT_INTRO,
  FALLBACK_VALUES,
  FALLBACK_TEAM,
  FALLBACK_MEANING,
  FALLBACK_OUR_WAY,
  FALLBACK_CONTACT,
  getFallbackStats,
  getFallbackServices,
  getFallbackProcess,
  getFallbackWhyUs,
  getFallbackTestimonials,
  getFallbackAboutIntro,
  getFallbackValues,
  getFallbackTeam,
  getFallbackMeaning,
  getFallbackOurWay,
  getFallbackFbWhyServiceWorks,
  getFallbackFbAdPhilosophy,
  getFallbackFbWhoThisIsFor,
  getFallbackFbFaq,
  getFallbackFbCaseStudies,
  getFallbackWebHero,
  getFallbackWebOurProcess,
  getFallbackWebWhoThisIsFor,
  getFallbackWebFaq,
  getFallbackWebCta,
  getFallbackWebCaseStudies,
  getFallbackTiktokHero,
  getFallbackTiktokWhyServiceWorks,
  getFallbackTiktokOurProcess,
  getFallbackTiktokWhoThisIsFor,
  getFallbackTiktokFaq,
  getFallbackTiktokCta,
  getFallbackTiktokCaseStudies,
  getFallbackSeoHero,
  getFallbackSeoWhyServiceWorks,
  getFallbackSeoOurProcess,
  getFallbackSeoWhoThisIsFor,
  getFallbackSeoFaq,
  getFallbackContentMarketingHero,
  getFallbackContentMarketingWhyServiceWorks,
  getFallbackContentMarketingOurProcess,
  getFallbackContentMarketingWhoThisIsFor,
  getFallbackContentMarketingFaq,
  getFallbackDigitalMarketingHero,
  getFallbackDigitalMarketingWhyServiceWorks,
  getFallbackDigitalMarketingOurProcess,
  getFallbackDigitalMarketingWhoThisIsFor,
  getFallbackDigitalMarketingFaq,
  getFallbackDigitalMarketingCta,
  getFallbackFunnelMappingHero,
  getFallbackFunnelMappingWhyServiceWorks,
  getFallbackFunnelMappingOurProcess,
  getFallbackFunnelMappingWhoThisIsFor,
  getFallbackFunnelMappingFaq,
  getFallbackGraphicDesignHero,
  getFallbackGraphicDesignWhyServiceWorks,
  getFallbackGraphicDesignOurProcess,
  getFallbackGraphicDesignWhoThisIsFor,
  getFallbackGraphicDesignFaq
} from "@/lib/data-fallbacks";

export const automationClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'automation',  // New dataset
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_WRITE_TOKEN,
});

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false to ensure fresh data, especially for mutations
  token: process.env.SANITY_API_READ_WRITE_TOKEN,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333',
  },
});

// Save original fetch
const originalFetch = sanityClient.fetch.bind(sanityClient);

// Helper to detect language from query string
const detectLanguage = (queryStr: string): 'en' | 'am' => {
  // Check for language-specific field patterns like stats_am, columns_am, etc.
  if (queryStr.includes('_am')) return 'am';
  return 'en';
};

// Override fetch to handle Quota Exceeded errors
sanityClient.fetch = async <R = any>(
  query: string,
  params: QueryParams = {},
  options: any = {}
): Promise<R> => {
  try {
    // Attempt real fetch
    return await originalFetch<R>(query, params, options);
  } catch (error: any) {
    console.warn("⚠️ Sanity Fetch Failed (Likely Quota/Network). Switching to Fallback Data.", error.message);

    const queryStr = query.toString();
    const lang = detectLanguage(queryStr);

    // NOTE: Service-specific checks MUST come before generic homepage checks
    // to prevent service pages from showing homepage content

    // -- Service Page Hero Sections (checked FIRST) --
    // These must be checked before the generic heroSection check
    if (queryStr.includes('"heroSection"') && params.name) {
      const nameStr = params.name as string;

      // Check each service type
      if (nameStr.includes('TikTok') || nameStr.includes('Tiktok') || nameStr.includes('tiktok')) {
        return getFallbackTiktokHero(nameStr) as unknown as R;
      }
      if (nameStr.includes('Web') || nameStr.includes('web')) {
        return getFallbackWebHero(nameStr) as unknown as R;
      }
      if (nameStr.includes('Digital') || nameStr.includes('digital')) {
        return getFallbackDigitalMarketingHero(nameStr) as unknown as R;
      }
      if (nameStr.includes('Content') || nameStr.includes('content') || nameStr.includes('Marketing') || nameStr.includes('marketing')) {
        return getFallbackContentMarketingHero(nameStr) as unknown as R;
      }
      if (nameStr.includes('Seo') || nameStr.includes('seo') || nameStr.includes('SEO')) {
        return getFallbackSeoHero(nameStr) as unknown as R;
      }
      if (nameStr.includes('Graphic') || nameStr.includes('graphic')) {
        return getFallbackGraphicDesignHero(nameStr) as unknown as R;
      }
      if (nameStr.includes('Funnel') || nameStr.includes('funnel')) {
        return getFallbackFunnelMappingHero(nameStr) as unknown as R;
      }
    }

    // -- Homepage Sections (with language support) --
    // Only match if NOT a service page (no name parameter)
    if (queryStr.includes('"heroSection"') && !params.name) return FALLBACK_HERO as unknown as R;
    if (queryStr.includes('"aboutUsSection"')) return FALLBACK_ABOUT as unknown as R;
    if (queryStr.includes('"statsSection"')) return getFallbackStats(lang) as unknown as R;
    if (queryStr.includes('"serviceSection"')) return getFallbackServices(lang) as unknown as R;
    if (queryStr.includes('"processSection"')) return getFallbackProcess(lang) as unknown as R;
    if (queryStr.includes('"whyUsSection"')) return getFallbackWhyUs(lang) as unknown as R;
    if (queryStr.includes('"testimonial"')) return getFallbackTestimonials(lang) as unknown as R;
    if (queryStr.includes('"ctaSection"')) return FALLBACK_CTA as unknown as R;

    // -- About Page Sections (with language support) --
    if (queryStr.includes('"aboutIntroSection"')) return getFallbackAboutIntro(lang) as unknown as R;
    if (queryStr.includes('"valuesSection"')) return getFallbackValues(lang) as unknown as R;
    if (queryStr.includes('"teamSection"')) return getFallbackTeam(lang) as unknown as R;
    if (queryStr.includes('"meaningSection"')) return getFallbackMeaning(lang) as unknown as R;
    if (queryStr.includes('"ourWaySection"')) return getFallbackOurWay(lang) as unknown as R;

    // -- Contact Page --
    if (queryStr.includes('"contactSection"')) return FALLBACK_CONTACT as unknown as R;

    // -- Facebook Ad Service Sections --
    if (queryStr.includes('"whyServiceWorksSection"') && params.name?.includes('Fb')) {
      return getFallbackFbWhyServiceWorks(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"adPhilosophySection"') && (params.name?.includes('Fb') || params.name?.includes('facebook'))) {
      return getFallbackFbAdPhilosophy(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"whoThisIsForSection"') && (params.name?.includes('Fb') || params.name?.includes('facebook'))) {
      return getFallbackFbWhoThisIsFor(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"faqSection"') && (params.name?.includes('Fb') || params.name?.includes('facebook'))) {
      return getFallbackFbFaq(params.name as string) as unknown as R;
    }
    // Facebook Ad case studies
    if (queryStr.includes('"caseStudy"') && queryStr.includes('Facebook-Ad')) {
      return getFallbackFbCaseStudies() as unknown as R;
    }

    // -- Web Design Service Sections --
    // Hero handled at top
    if (queryStr.includes('"ourProcessSection"') && (params.name?.includes('Web') || params.name?.includes('web'))) {
      return getFallbackWebOurProcess(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"whoThisIsForSection"') && (params.name?.includes('Web') || params.name?.includes('web'))) {
      return getFallbackWebWhoThisIsFor(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"faqSection"') && (params.name?.includes('Web') || params.name?.includes('web'))) {
      return getFallbackWebFaq(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"ctaSection"') && (params.name?.includes('Web') || params.name?.includes('web'))) {
      return getFallbackWebCta(params.name as string) as unknown as R;
    }
    // Web Design case studies
    if (queryStr.includes('"caseStudy"') && queryStr.includes('Web-Design')) {
      return getFallbackWebCaseStudies() as unknown as R;
    }

    // -- TikTok Ad Service Sections --
    // Hero handled at top
    if (queryStr.includes('"whyServiceWorksSection"') && (params.name?.includes('TikTok') || params.name?.includes('Tiktok') || params.name?.includes('tiktok'))) {
      return getFallbackTiktokWhyServiceWorks(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"ourProcessSection"') && (params.name?.includes('TikTok') || params.name?.includes('Tiktok') || params.name?.includes('tiktok'))) {
      return getFallbackTiktokOurProcess(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"whoThisIsForSection"') && (params.name?.includes('TikTok') || params.name?.includes('Tiktok') || params.name?.includes('tiktok'))) {
      return getFallbackTiktokWhoThisIsFor(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"faqSection"') && (params.name?.includes('TikTok') || params.name?.includes('Tiktok') || params.name?.includes('tiktok'))) {
      return getFallbackTiktokFaq(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"ctaSection"') && (params.name?.includes('TikTok') || params.name?.includes('Tiktok') || params.name?.includes('tiktok'))) {
      return getFallbackTiktokCta(params.name as string) as unknown as R;
    }
    // TikTok Ad case studies
    if (queryStr.includes('"caseStudy"') && queryStr.includes('TikTok-Ad')) {
      return getFallbackTiktokCaseStudies() as unknown as R;
    }

    // -- SEO Service Sections --
    // Hero handled at top
    if (queryStr.includes('"whyServiceWorksSection"') && (params.name?.includes('Seo') || params.name?.includes('seo') || params.name?.includes('SEO'))) {
      return getFallbackSeoWhyServiceWorks(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"ourProcessSection"') && (params.name?.includes('Seo') || params.name?.includes('seo') || params.name?.includes('SEO'))) {
      return getFallbackSeoOurProcess(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"whoThisIsForSection"') && (params.name?.includes('Seo') || params.name?.includes('seo') || params.name?.includes('SEO'))) {
      return getFallbackSeoWhoThisIsFor(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"faqSection"') && (params.name?.includes('Seo') || params.name?.includes('seo') || params.name?.includes('SEO'))) {
      return getFallbackSeoFaq(params.name as string) as unknown as R;
    }

    // -- Content Marketing Service Sections --
    // Hero handled at top
    if (queryStr.includes('"whyServiceWorksSection"') && (params.name?.includes('Content') || params.name?.includes('content') || params.name?.includes('Marketing') || params.name?.includes('marketing'))) {
      return getFallbackContentMarketingWhyServiceWorks(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"ourProcessSection"') && (params.name?.includes('Content') || params.name?.includes('content') || params.name?.includes('Marketing') || params.name?.includes('marketing'))) {
      return getFallbackContentMarketingOurProcess(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"whoThisIsForSection"') && (params.name?.includes('Content') || params.name?.includes('content') || params.name?.includes('Marketing') || params.name?.includes('marketing'))) {
      return getFallbackContentMarketingWhoThisIsFor(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"faqSection"') && (params.name?.includes('Content') || params.name?.includes('content') || params.name?.includes('Marketing') || params.name?.includes('marketing'))) {
      return getFallbackContentMarketingFaq(params.name as string) as unknown as R;
    }

    // -- Digital Marketing Service Sections --
    // Hero handled at top
    if (queryStr.includes('"whyServiceWorksSection"') && (params.name?.includes('Digital') || params.name?.includes('digital'))) {
      return getFallbackDigitalMarketingWhyServiceWorks(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"ourProcessSection"') && (params.name?.includes('Digital') || params.name?.includes('digital'))) {
      return getFallbackDigitalMarketingOurProcess(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"whoThisIsForSection"') && (params.name?.includes('Digital') || params.name?.includes('digital'))) {
      return getFallbackDigitalMarketingWhoThisIsFor(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"faqSection"') && (params.name?.includes('Digital') || params.name?.includes('digital'))) {
      return getFallbackDigitalMarketingFaq(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"ctaSection"') && (params.name?.includes('Digital') || params.name?.includes('digital'))) {
      return getFallbackDigitalMarketingCta(params.name as string) as unknown as R;
    }

    // -- Funnel Mapping Service Sections --
    // Hero handled at top
    if (queryStr.includes('"whyServiceWorksFeatures"') && (params.name?.includes('Funnel') || params.name?.includes('funnel'))) {
      return getFallbackFunnelMappingWhyServiceWorks(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"ourProcessSection"') && (params.name?.includes('Funnel') || params.name?.includes('funnel'))) {
      return getFallbackFunnelMappingOurProcess(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"whoThisIsForSection"') && (params.name?.includes('Funnel') || params.name?.includes('funnel'))) {
      return getFallbackFunnelMappingWhoThisIsFor(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"faqSection"') && (params.name?.includes('Funnel') || params.name?.includes('funnel'))) {
      return getFallbackFunnelMappingFaq(params.name as string) as unknown as R;
    }

    // -- Graphic Design Service Sections --
    // Hero handled at top
    if (queryStr.includes('"whyServiceWorksFeatures"') && (params.name?.includes('Graphic') || params.name?.includes('graphic'))) {
      return getFallbackGraphicDesignWhyServiceWorks(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"ourProcessSection"') && (params.name?.includes('Graphic') || params.name?.includes('graphic'))) {
      return getFallbackGraphicDesignOurProcess(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"whoThisIsForSection"') && (params.name?.includes('Graphic') || params.name?.includes('graphic'))) {
      return getFallbackGraphicDesignWhoThisIsFor(params.name as string) as unknown as R;
    }
    if (queryStr.includes('"faqSection"') && (params.name?.includes('Graphic') || params.name?.includes('graphic'))) {
      return getFallbackGraphicDesignFaq(params.name as string) as unknown as R;
    }

    // -- Other Pages (Generic Fallbacks) --

    // Case Studies (Array check)
    if (queryStr.includes('"caseStudy"')) {
      // If query asks for specific item (e.g. by slug or [0]), return object
      if (queryStr.includes('[0]')) return FALLBACK_CASE_STUDIES.casestudyPosts[0] as unknown as R;
      return FALLBACK_CASE_STUDIES.casestudyPosts as unknown as R;
    }

    // Blog Posts (matches "post" type or "blogPost" text)
    if (queryStr.includes('"post"') || queryStr.includes('"blogPost"')) {
      if (queryStr.includes('[0]')) return FALLBACK_BLOG_POSTS[0] as unknown as R;
      return FALLBACK_BLOG_POSTS as unknown as R;
    }

    // Works
    if (queryStr.includes('"works"')) {
      return FALLBACK_WORKS as unknown as R;
    }

    // Service Pages (e.g. digital-marketing, seo - assuming they are "servicePage" or queried by slug matches)
    // Note: User queries might be `* [_type == "service" && slug.current == $slug][0]`
    // We'll catch generic "service" type queries here
    if (queryStr.includes('"service"') || queryStr.includes('"servicePage"')) {
      return FALLBACK_GENERIC_SERVICE as unknown as R;
    }

    console.warn("⚠️ No fallback found for query:", queryStr);
    return null as unknown as R;
  }
};

// Export the modified client
// NOTE: We export 'client' as the primary export, matching previous usage.
export const client = sanityClient;
