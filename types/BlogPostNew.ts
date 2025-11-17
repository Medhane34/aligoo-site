// types/BlogPost.ts
export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  publishedAt: string;
  serviceTitle?: string;
}

export interface Service {
  title: string;
}