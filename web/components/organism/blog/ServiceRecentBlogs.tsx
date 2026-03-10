// components/organism/blog/ServiceRecentBlogs.tsx
// Server Component — fetches data, renders static structure, delegates interactivity to client.
import HeadingAtom from "@/components/atoms/HeadingAtom";
import { fetchRecentServiceBlogs } from "@/lib/BlogPost";
import { BlogPost } from "@/types/BlogPost";
import ServiceRecentBlogsClient from "./ServiceRecentBlogsClient";

interface ServiceRecentBlogsProps {
    /** Sanity category slug — e.g. "facebook-ad", "seo", "web-design" */
    categorySlug: string;
    /** Display name shown in the heading & CTA button */
    serviceName: string;
    lang: "en" | "am";
}

// --- i18n labels ---
const labels = {
    en: {
        eyebrow: "From Our Blog",
        heading: "Recent Articles & Guides",
        readMore: (name: string) => `Read More on ${name}`,
    },
    am: {
        eyebrow: "ከብሎጋችን",
        heading: "የቅርብ ጊዜ ብሎጎች እና ጋይዶች",
        readMore: (name: string) => `ስለ ${name} ተጨማሪ ያንብቡ`,
    },
};

export default async function ServiceRecentBlogs({
    categorySlug,
    serviceName,
    lang,
}: ServiceRecentBlogsProps) {
    const posts = await fetchRecentServiceBlogs(lang, categorySlug);

    // Gracefully hide section if no matching posts
    if (!posts || posts.length === 0) return null;

    const t = labels[lang];

    // JSON-LD schema.org/Article markup for SEO (static, server-side)
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@graph": posts.map((post: BlogPost) => ({
            "@type": "Article",
            headline: post.title,
            description: post.excerpt ?? "",
            image: post.imageUrl ?? "",
            datePublished: post.publishedAt,
            url: `https://aligoo-digital.agency/blog/${post.slug}`,
        })),
    };

    return (
        <>
            {/* JSON-LD for SEO — rendered on the server, no JS needed */}
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />

            <section
                className="py-20 bg-background-light dark:bg-background-dark"
                dir={lang === "am" ? "rtl" : "ltr"}
            >
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header — static, server-rendered */}
                    <div className="mb-12 text-center space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary">
                            {t.eyebrow}
                        </p>
                        <HeadingAtom
                            as="h2"
                            title={t.heading}
                            highlight={serviceName}
                            size="lg"
                            variant="split"
                            align="center"
                        />
                    </div>

                    {/* Cards + CTA Button — delegated to Client Component for interactivity */}
                    <ServiceRecentBlogsClient
                        posts={posts}
                        lang={lang}
                        categorySlug={categorySlug}
                        ctaLabel={t.readMore(serviceName)}
                    />
                </div>
            </section>
        </>
    );
}
