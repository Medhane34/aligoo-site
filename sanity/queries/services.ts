
export const WHY_SERVICE_WORKS_SECTION_QUERY = `
  *[_type == "whyServiceWorksSection" && name == $name][0]{
    heading_en,
    heading_am,
    highlight_en,
    highlight_am,
    paragraph1_en,
    paragraph1_am,
    paragraph2_en,
    paragraph2_am,
    stats_en,
    stats_am
  }
`;
export const AD_PHILOSOPHY_SECTION_QUERY = `
  *[_type == "adPhilosophySection" && name == $name][0]{
    heading_en,
    heading_am,
    accentText_en,
    accentText_am,
    steps_en,
    steps_am,
    bottomHeading_en,
    bottomHeading_am,
    bottomText_en,
    bottomText_am
  }
`;

export const WHO_THIS_IS_FOR_SECTION_QUERY = `
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

export const FAQ_SECTION_QUERY = `
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
// Our Process Section - Web Design 
export const HERO_SECTION_QUERY_WEB = `
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



export const OUR_PROCESS_SECTION_QUERY = `
  *[_type == "ourProcessSection" && name == $name][0]{
    heading_en,
    heading_am,
    subheading_en,
    subheading_am,
    "imageSrc_en": image_en.asset->url,
    imageAlt_en,
    "imageSrc_am": image_am.asset->url,
    imageAlt_am,
    steps_en,
    steps_am
  }
`;

export const SECTION_HEADING_BLOCK_QUERY_WEB= `
    *[_type == "sectionHeadingBlock" && name == $name][0]{  
      heading_en,  
      heading_am,  
      subheading_en,  
      subheading_am  
    }  
  `;  

export const CTA_SECTION_QUERY_WEB = `
  *[_type == "ctaSection" && name == $name][0]{
    heading_en,
    heading_am,
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

// TikTok Ad Service Queries 

export const HERO_SECTION_QUERY_TIKTOK = `
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

export const WHY_SERVICE_WORKS_SECTION_QUERY_TIKTOK = `
  *[_type == "whyServiceWorksSection" && name == $name][0]{
    heading_en,
    heading_am,
    highlight_en,
    highlight_am,
    paragraph1_en,
    paragraph1_am,
    paragraph2_en,
    paragraph2_am,
    stats_en,
    stats_am
  }
`;
export const OUR_PROCESS_SECTION_QUERY_TIKTOK = `
  *[_type == "ourProcessSection" && name == $name][0]{
    heading_en,
    heading_am,
    subheading_en,
    subheading_am,
    "imageSrc_en": image_en.asset->url,
    imageAlt_en,
    "imageSrc_am": image_am.asset->url,
    imageAlt_am,
    steps_en,
    steps_am
  }
`;

export const WHO_THIS_IS_FOR_SECTION_QUERY_TIKTOK = `
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

export const FAQ_SECTION_QUERY_TIKTOK = `
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

export const CTA_SECTION_QUERY_TIKTOK= `
  *[_type == "ctaSection" && name == $name][0]{
    heading_en,
    heading_am,
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

// Digtal Marketing Quereis 
export const HERO_SECTION_QUERY_DIGITAL= `
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

export const WHY_SERVICE_WORKS_SECTION_QUERY_DIGITAL= `
  *[_type == "whyServiceWorksSection" && name == $name][0]{
    heading_en,
    heading_am,
    highlight_en,
    highlight_am,
    paragraph1_en,
    paragraph1_am,
    paragraph2_en,
    paragraph2_am,
    stats_en,
    stats_am
  }
`;

export const OUR_PROCESS_SECTION_QUERY_DIGITAL = `
  *[_type == "ourProcessSection" && name == $name][0]{
    heading_en,
    heading_am,
    subheading_en,
    subheading_am,
    "imageSrc_en": image_en.asset->url,
    imageAlt_en,
    "imageSrc_am": image_am.asset->url,
    imageAlt_am,
    steps_en,
    steps_am
  }
`;

export const WHO_THIS_IS_FOR_SECTION_QUERY_DIGITAL= `
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

export const FAQ_SECTION_QUERY_DIGITAL = `
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











