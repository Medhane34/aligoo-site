// lib/BlogPost.tsx
import { client } from "@/src/sanity/client";
import { BLOG_POST_QUERY, LATEST_BLOGS_QUERY } from "@/sanity/queries/BlogPost";
import { BlogPost, BlogPostType } from "@/types/BlogPost";
import type { SanityDocument } from "next-sanity";

export async function fetchBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  return await client.fetch(BLOG_POST_QUERY, { slug });
}

export async function fetchLatestBlogs(): Promise<BlogPostType[]> {
  try {
    const posts = await client.fetch<any[]>(LATEST_BLOGS_QUERY);

    return posts.map((post) => ({
      _id: String(post._id ?? ""),
      title: String(post.title ?? ""),
      excerpt: String(post.excerpt ?? ""),
      imageUrl: String(post.imageUrl ?? ""),
      slug: String(post.slug ?? ""),
    }));
  } catch (error) {
    console.error("Error fetching latest blogs from Sanity:", error);
    return [];
  }
}
