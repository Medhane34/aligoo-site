
export const HERO_SECTION_QUERY_FUNNEL = `
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

export const WHY_FUNNEL_WORKS_SECTION_QUERY = `
  *[_type == "whyServiceWorksFeatures" && name == $name][0]{
    heading_en,
    heading_am,
    subheading_en,
    subheading_am,
    features_en,
    features_am
  }
`;

export const OUR_PROCESS_SECTION_QUERY_FUNNEL = `
  *[_type == "ourProcessSection" && name == $name][0]{
    heading_en,
    heading_am,
    subheading_en,
    subheading_am,
    steps_en,
    steps_am
  }
`;

export const WHO_THIS_IS_FOR_SECTION_QUERY_FUNNEL = `
  *[_type == "whoThisIsForSection" && name == $name][0]{
    heading_en,
    heading_am,
    subheading_en,
    subheading_am,
    introText_en,
    introText_am,
    highlightedPhrases_en,
    highlightedPhrases_am,
    outroText_en,
    outroText_am
  }
`;

export const FAQ_SECTION_QUERY_FUNNEL = `
  *[_type == "faqSection" && name == $name][0]{
    eyebrow_en,
    eyebrow_am,
    heading_en,
    heading_am,
    subheading_en,
    subheading_am,
    ctaText_en,
    ctaText_am,
    ctaHref_en,
    ctaHref_am,
    faqs_en,
    faqs_am
  }
`;
