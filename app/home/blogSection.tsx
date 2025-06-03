import BlogSectionClient from "./BlogSectionClient";
import { client } from "@/src/sanity/client";
import type { SanityDocument } from "next-sanity";

type BlogPostType = {
  imageUrl: string;
  _id: string;
  title: string;
  slug: string; // Add slug to the type
};

async function fetchLatestBlogs(): Promise<BlogPostType[]> {
  const query = `
    *[_type == "post"] | order(_createdAt desc)[0...10] {
      _id,
      title,
      "imageUrl": image.asset->url,
      "slug": slug.current // Fetch the current slug
    }
  `;

  try {
    const posts = await client.fetch<SanityDocument[]>(query);

    return posts.map((post) => ({
      _id: post._id,
      title: post.title,
      imageUrl: post.imageUrl,
      slug: post.slug, // Map the slug
    }));
  } catch (error) {
    console.error("Error fetching latest blogs from Sanity:", error);

    return [];
  }
}

export default async function BlogSection() {
  const blogs = await fetchLatestBlogs();

  return (
    <div className="max-w-full overflow-x-hidden py-16 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="container mx-auto px-4 ">
        <BlogSectionClient blogs={blogs} />
      </div>
    </div>
  );
}
