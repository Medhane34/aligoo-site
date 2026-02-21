// MOCKS FOR BLOGS AND CASE STUDIES
// Keys must match the *Result* of the GROQ projection (e.g. "title" not "title_en")

// NOTE: This is an old fallback, kept for backward compatibility
// The main FALLBACK_CASE_STUDIES is now in homepage.ts
export const FALLBACK_CASE_STUDIES_OLD = [
    {
        _id: "fb_cs_1",
        title: "Digital Transformation",
        goalsSummary: "Increase online presence.",
        challengeSummary: "Outdated website structure.",
        industry: "Tech",
        service: "Digital Strategy",
        imageUrl: "/images/case-study-placeholder.jpg",
        hasImage: true,
        hasService: true,
        slug: "#",
        tags: ["Strategy", "Growth"]
    }
];

export const FALLBACK_BLOG_POSTS = [
    {
        _id: "fb_blog_1",
        title: "5 Marketing Trends for 2025",
        excerpt: "What you need to know to stay ahead of the curve.",
        slug: "#",
        publishedAt: "2024-01-01",
        imageUrl: "/images/blog-placeholder.jpg"
    }
];

export const FALLBACK_WORKS = [
    {
        _id: "fb_work_1",
        title: "Brand Launch",
        slug: "#",
        mainImage: null
    }
];
