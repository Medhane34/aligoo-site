// types/BlogPost.ts
export interface BlogPost {
  title: string;
  description?: string;
  slug: { current: string };
  publishedAt: string;
  imageUrl?: string;
  body: any[];
}

// this for the home section 
export type BlogPostType = {
  _id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
};
