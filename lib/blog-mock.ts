// lib/blog-mock.ts
import { BlogPost, Service } from "@/types/BlogPostNew";

const SERVICES: Service[] = [
  { title: "Facebook & Instagram Ads" },
  { title: "Web Design & Development" },
  { title: "Digital Marketing (all-in-one)" },
  { title: "Content Marketing" },
  { title: "Search Engine Optimization (SEO)" },
  { title: "TikTok Ads" },
  { title: "Graphic Design" },
  { title: "Funnel Mapping" },
];

const MOCK_POSTS: BlogPost[] = [
  {
    _id: "1",
    title: "How We Grew a Local Café’s Revenue by 340% with TikTok Ads",
    excerpt: "A step-by-step breakdown of our viral campaign that turned a small Addis café into a city sensation using hyper-targeted TikTok ads and UGC.",
    slug: "tiktok-cafe-growth",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    publishedAt: "2025-03-10T10:00:00Z",
    serviceTitle: "TikTok Ads",
  },
  {
    _id: "2",
    title: "የፌስቡክ እና ኢንስታግራም ማስታወቂያዎችን በመጠቀም የንግድ ስራዎን እንዴት ማሳደግ ይችላሉ?",
    excerpt: "የአዲስ አበባ ንግዶች በፌስቡክ ላይ የሚያደርጉትን የተሳካ ዘመቻ በዝርዝር እንመልከት።",
    slug: "facebook-ads-amharic",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    publishedAt: "2025-03-05T08:00:00Z",
    serviceTitle: "Facebook & Instagram Ads",
  },
  {
    _id: "3",
    title: "Why Your Website Is Losing Customers (And How to Fix It)",
    excerpt: "Common UX mistakes Ethiopian businesses make — and how a 3-second load time can double your conversions.",
    slug: "website-ux-mistakes",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    publishedAt: "2025-02-28T12:00:00Z",
    serviceTitle: "Web Design & Development",
  },
  ...Array.from({ length: 12 }, (_, i) => ({
    _id: `${i + 4}`,
    title: i % 2 === 0 ? `SEO Strategy #${i + 1}` : `Content Ideas for ${SERVICES[i % 8].title}`,
    excerpt: "Mock post to test pagination, filtering, and responsive grid. Includes long text to test line clamping and card overflow.",
    slug: `mock-${i + 1}`,
    imageUrl: i % 3 === 0 ? undefined : "https://images.unsplash.com/photo-1517180105933-7b30e3a0d67d?w=800",
    publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
    serviceTitle: SERVICES[i % SERVICES.length].title,
  })),
].flat();

export const fetchBlogPosts = async (
  start: number,
  end: number,
  lang: "en" | "am",
  service?: string
): Promise<BlogPost[]> => {
  await new Promise((r) => setTimeout(r, 300));
  let filtered = service ? MOCK_POSTS.filter((p) => p.serviceTitle === service) : MOCK_POSTS;
  return filtered.slice(start, end);
};

export const fetchTotalBlogPostsCount = async (
  lang: "en" | "am",
  service?: string
): Promise<number> => {
  await new Promise((r) => setTimeout(r, 100));
  return service ? MOCK_POSTS.filter((p) => p.serviceTitle === service).length : MOCK_POSTS.length;
};

export const fetchServices = async (lang: "en" | "am"): Promise<Service[]> => {
  return SERVICES;
};