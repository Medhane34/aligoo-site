// types/BlogPost.ts
export type Lang = 'en' | 'am';

export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  imageUrl?: string;
  category?: {
    _id: string;
    title_en: string;
    title_am: string;
    slug: string;
  };
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
}

export interface BlogPostDetail {
  _id: string;
  title: string;
  excerpt: string;
  slug: { current: string };
  publishedAt: string;
  imageUrl?: string;
  body: any[];
  category?: {
    _id: string;
    title_en: string;
    title_am: string;
  };
}

// NEW: For list & related posts
export type BlogPostListItem = Pick<
  BlogPost,
  '_id' | 'title' | 'excerpt' | 'slug' | 'imageUrl' | 'publishedAt'
>;