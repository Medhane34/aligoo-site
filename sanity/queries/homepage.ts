export const HERO_SECTION_QUERY = `
  *[_type == "heroSection"][0]{
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

export const ABOUT_US_SECTION_QUERY = `
  *[_type == "aboutUsSection"][0]{
    sectionHeading_en,
    sectionHeading_am,
    accentText_en,
    accentText_am,
    paragraphs_en,
    paragraphs_am,
    "imageUrl": image.asset->url,
    imageAlt,
    buttonText_en,
    buttonText_am,
    buttonUrl
  }
`;

export const STATS_SECTION_QUERY = `
  *[_type == "statsSection"][0]{
    stats,
    footerText
  }
`;


export const SERVICE_SECTION_QUERY = `
  *[_type == "serviceSection"][0]{
    sectionHeading,
    accentText,
    columns[]{
      title,
      description,
      services[]{
        title,
        description,
        "iconUrl": icon.asset->url,
        link
      }
    }
  }
`;

//our process 

export const PROCESS_SECTION_QUERY = `
  *[_type == "processSection"][0]{
    sectionHeading,
    accentText,
    steps[]{
      icon,
      heading,
      description
    }
  }
`;

export const WHY_US_SECTION_QUERY = `
  *[_type == "whyUsSection"][0]{
    sectionHeading,
    accentText,
    reasons[]{
      emoji,
      title,
      description,
      gradient,
      span // <-- Add this line
    }
  }
`;

export const CTA_SECTION_QUERY = `
  *[_type == "ctaSection"][0]{
    heading,
    subheading,
    primaryButtonText,
    primaryButtonUrl,
    secondaryButtonText,
    secondaryButtonUrl
  }
`;

