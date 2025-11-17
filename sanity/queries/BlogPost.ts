// sanity/BlogPost.ts
import { Lang } from '@/types/BlogPost';
import { groq } from 'next-sanity';

export const BLOG_POST_QUERY = (lang: Lang) => groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title_${lang},
    excerpt_${lang},
    slug,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    body_${lang}[]{
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
      title_${lang}
    }
  }
`;

// For related posts (optional)
export const RELATED_POSTS_QUERY = (lang: Lang, currentSlug: string, limit = 3) => groq`
  *[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc)[0...$limit] {
    _id,
    title_${lang},
    excerpt_${lang},
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    publishedAt
  }
`;

export const LATEST_BLOGS_QUERY = (lang: 'en' | 'am') => groq`
  *[_type == "post"] | order(_createdAt desc)[0...10] {
    _id,
    title_${lang},
    excerpt_${lang},
    "imageUrl": mainImage.asset->url,
    "slug": slug.current
  }
`;