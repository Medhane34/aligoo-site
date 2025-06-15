// sanity/BlogPost.ts
export const BLOG_POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  slug,
  publishedAt,
  "imageUrl": mainImage.asset->url,
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->
    }
  }
}`;


// for home section 
export const LATEST_BLOGS_QUERY = `
  *[_type == "post"] | order(_createdAt desc)[0...10] {
    _id,
    title,
    excerpt,
    "imageUrl": mainImage.asset->url, // <-- Use mainImage, not image
    "slug": slug.current
  }
`;
