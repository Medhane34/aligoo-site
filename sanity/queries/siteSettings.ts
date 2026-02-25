import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    telephone,
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
    latitude,
    longitude,
    ratingValue,
    reviewCount
  }
`;
