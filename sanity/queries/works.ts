export const FEATURED_CASE_STUDY_QUERY = `
  *[_type == "featuredCaseStudy"][0]{
    title_en,
    title_am,
    excerpt_en,
    excerpt_am,
    "imageUrl": image.asset->url,
    imageAlt,
    "slug": slug.current
  }
`;

export const INDUSTRIES_SECTION_QUERY = `
  *[_type == "industriesSection"][0]{
    sectionHeading_en,
    sectionHeading_am,
    accentText_en,
    accentText_am,
    industries_en,
    industries_am
  }
`;
