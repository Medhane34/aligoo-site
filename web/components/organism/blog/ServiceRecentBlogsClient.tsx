"use client";

import Link from "next/link";
import BlogCard from "@/components/molecules/blog/BlogCard";
import ButtonAtom from "@/components/atoms/ButtonAtom";
import { BlogPost } from "@/types/BlogPost";

interface ServiceRecentBlogsClientProps {
    posts: BlogPost[];
    lang: "en" | "am";
    categorySlug: string;
    ctaLabel: string;
}

function trackGaEvent(eventName: string, label: string, category: string) {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", eventName, {
            event_category: "service_blog_section",
            event_label: label,
            service_category: category,
        });
    }
}

export default function ServiceRecentBlogsClient({
    posts,
    lang,
    categorySlug,
    ctaLabel,
}: ServiceRecentBlogsClientProps) {
    return (
        <>
            {/* 3-column grid — collapses to 1 on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        onClick={() => trackGaEvent("blog_card_click", post.slug, categorySlug)}
                    >
                        <BlogCard {...post} lang={lang} showCategory={false} />
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="mt-12 flex justify-center">
                <Link
                    href={`/${lang}/blog?category=${categorySlug}`}
                    onClick={() => trackGaEvent("service_blog_cta_click", categorySlug, categorySlug)}
                >
                    <ButtonAtom shimmer size="md">
                        📖 {ctaLabel}
                    </ButtonAtom>
                </Link>
            </div>
        </>
    );
}
