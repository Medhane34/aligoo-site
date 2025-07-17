export const HERO_SECTION_QUERY_WORKSPAGE= `
  *[_type == "heroSection" && name == $name][0]{
    badgeText_en,
    badgeText_am,
    headlineText1_en,
    headlineText1_am,
    headlineText2_en,
    headlineText2_am,
    headlineText3_en,
    headlineText3_am,
    subheading_en,
    subheading_am,
    primaryButtonText_en,
    primaryButtonText_am,
    primaryButtonUrl,
    secondaryButtonText_en,
    secondaryButtonText_am,
    secondaryButtonUrl
  }
`;

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
