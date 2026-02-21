// lib/blog.ts
import { groq } from "next-sanity";
import type { SanityClient } from "next-sanity";
import { client } from "@/src/sanity/client";
import {
  BlogPost,
  BlogPostListItem,
  BlogPostDetail,
  Lang,
  Category,
} from "@/types/BlogPost";

// === 1. FETCH LATEST BLOGS (Home Section) ===
export async function fetchLatestBlogs(
  lang: Lang = "en",
): Promise<BlogPostListItem[]> {
  const langField = (field: string) => `${field}_${lang}`;

  const query = groq`
    *[_type == "post" && publishedAt < now() && isExclusive != true && ${langField("title")} != null] 
    | order(publishedAt desc)[0...6] {
      _id,
      "title": ${langField("title")},
      "excerpt": ${langField("excerpt")},
      "slug": slug.current,
      publishedAt,
      "imageUrl": mainImage.asset->url
    }
  `;

  const posts = await client.fetch<BlogPostListItem[]>(query);
  /*   console.log(`[fetchLatestBlogs] Fetched ${posts.length} latest posts for lang '${lang}'`); */
  return posts;
}

// === 2. FETCH BLOG POSTS (List Page + Pagination + Filter) ===
export async function fetchBlogPosts(
  start: number,
  end: number,
  lang: Lang,
  categorySlug?: string,
): Promise<BlogPost[]> {
  const langField = (field: string) => `${field}_${lang}`;
  const cat =
    categorySlug && categorySlug.trim() !== "" ? categorySlug : undefined;
  const filter = cat ? `&& category->slug.current == $categorySlug` : "";

  /*   console.log("[fetchBlogPosts] variables:", {
    start,
    end,
    lang,
    categorySlug: cat,
  }); */

  const query = groq`
    *[_type == "post" && publishedAt < now() && isExclusive != true ${filter} && ${langField("title")} != null && ${langField("excerpt")} != null] 
    | order(publishedAt desc) 
    [$start...$end] {
      _id,
      "title": ${langField("title")},
      "excerpt": ${langField("excerpt")},
      "slug": slug.current,
      publishedAt,
      "imageUrl": mainImage.asset->url,
      "category": category-> {
        _id,
        title_en,
        title_am,
        "slug": slug.current
      }
    }
  `;

  const posts = await client.fetch<BlogPost[]>(query, {
    start,
    end,
    categorySlug: cat,
  });

  return posts;
}

// === 3. FETCH TOTAL COUNT ===
export async function fetchTotalBlogPostsCount(
  lang: Lang,
  categorySlug?: string,
): Promise<number> {
  const cat =
    categorySlug && categorySlug.trim() !== "" ? categorySlug : undefined;
  const filter = cat ? `&& category->slug.current == $categorySlug` : "";

  /*   console.log("[fetchTotalBlogPostsCount] variables:", {
    lang,
    categorySlug: cat,
  }); */

  const query = groq`
    count(*[_type == "post" && publishedAt < now() && isExclusive != true ${filter}])  // ADDED: && isExclusive != true
  `;

  const count = await client.fetch<number>(query, { categorySlug: cat });

  /*   console.log("[fetchTotalBlogPostsCount] count:", count);
   */
  return count;
}

// === 4. FETCH CATEGORIES ===
export async function fetchCategories(lang: Lang): Promise<Category[]> {
  const query = groq`
    *[_type == "category"] {
      _id,
      "title": title_${lang},
      "slug": slug.current
    }
  `;

  const cats = await client.fetch<Category[]>(query);

  return cats.filter((c) => c.title);
}

// === 5. FETCH SINGLE POST BY SLUG (Detail Page) ===
export async function fetchBlogPostBySlug(
  slug: string,
  lang: Lang = "en",
): Promise<BlogPostDetail | null> {
  const langField = (field: string) => `${field}_${lang}`;

  const query = groq`
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      "title": ${langField("title")},
      "excerpt": ${langField("excerpt")},
      "slug": slug.current,
      publishedAt,
      "imageUrl": mainImage.asset->url,
      "body": ${langField("body")}[]{
        ...,
        _type == "image" => {
          ...,
          asset->
        },
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": reference->slug
          }
        }
      },
      "category": category-> {
        _id,
        title_en,
        title_am,
        "slug": slug.current
      },
      "author": author-> {
        name,
        "image": image.asset->url,
        "image": image.asset->url,
        "bio": bio[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": reference->slug
            }
          }
        }
      },
      promotionalCard {
        heading,
        description,
        buttonText,
        buttonLink
      }
    }
  `;

  const post = await (client as SanityClient).fetch<BlogPostDetail | null>(query, { slug });

  if (post && post.body) {
    // Calculate reading time: avg 200 words per minute
    const text = JSON.stringify(post.body);
    const wordCount = text.split(/\s+/).length;
    post.estimatedReadingTime = Math.ceil(wordCount / 200);
  }

  /* console.log(
    `[fetchBlogPostBySlug] Fetched post '${slug}' for lang '${lang}'`,
  ); */

  return post;
}

// === 6. FETCH RELATED POSTS (Detail Page) ===
export async function fetchRelatedPosts(
  currentSlug: string,
  categorySlug?: string,
  lang: Lang = "en",
  limit = 3,
): Promise<BlogPostListItem[]> {
  const langField = (field: string) => `${field}_${lang}`;

  // Filter by category if provided
  const categoryFilter = categorySlug
    ? `&& category->slug.current == $categorySlug`
    : "";

  const query = groq`
    *[_type == "post" && slug.current != $currentSlug && isExclusive != true ${categoryFilter} && ${langField("title")} != null] 
    | order(publishedAt desc)[0...$limit] {
      _id,
      "title": ${langField("title")},
      "excerpt": ${langField("excerpt")},
      "slug": slug.current,
      publishedAt,
      "imageUrl": mainImage.asset->url
    }
  `;

  const posts = await client.fetch<BlogPostListItem[]>(query, {
    currentSlug,
    categorySlug,
    limit
  });
  console.log(`[fetchRelatedPosts] Fetched ${posts.length} related posts for lang '${lang}'`);
  return posts;
}
