export const ABOUT_INTRO_SECTION_QUERY = `
  *[_type == "aboutIntroSection"][0]{
    mainHeading,
    introText,
    founded,
    focus,
    campaignsLaunched,
    momentsProudOf
  }
`;

export const VALUES_SECTION_QUERY = `
  *[_type == "valuesSection"][0]{
    sectionHeading,
    accentText,
    buttonText,
    buttonUrl,
    values[]{
      emoji,
      title,
      description,
      bgColor,
      textColor
    }
  }
`;

