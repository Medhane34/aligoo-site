import { groq } from 'next-sanity'

export const ABOUT_INTRO_SECTION_QUERY = (lang: 'en' | 'am') => groq`
  *[_type == "aboutIntroSection"][0] {
    "mainHeading": mainHeading_${lang},
    "introText": introText_${lang},
    "founded": founded_${lang},
    "focus": focus_${lang},
    "campaignsLaunched": campaignsLaunched_${lang},
    "momentsProudOf": momentsProudOf_${lang}
  }
`

export const VALUES_SECTION_QUERY = (lang: 'en' | 'am') => groq`
  *[_type == "valuesSection"][0] {
    "sectionHeading": sectionHeading_${lang},
    "accentText": accentText_${lang},
    "buttonText": buttonText_${lang},
    "buttonUrl": buttonUrl_${lang},
    "values": values_${lang}[] {
      emoji,
      title,
      description,
      bgColor,
      textColor
    }
  }
`
// Team Section 
export const TEAM_SECTION_QUERY = (lang: 'en' | 'am') => groq`
  *[_type == "teamSection"][0] {
    "heading": ${lang === 'am' ? 'heading_am' : 'heading_en'},
    "subheading": ${lang === 'am' ? 'subheading_am' : 'subheading_en'},
    "members": members[] {
      name,
      "role": ${lang === 'am' ? 'role_am' : 'role_en'},
      "bio": ${lang === 'am' ? 'bio_am' : 'bio_en'},
      department,
      departmentColor,
      firstNameColor,
      lastNameColor,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    }
  }
`

export const MEANING_SECTION_QUERY = (lang: 'en' | 'am') => groq`
  *[_type == "meaningSection"][0] {
    "mainHeading": ${lang === 'am' ? 'mainHeading_am' : 'mainHeading_en'},
    "pronunciation": ${lang === 'am' ? 'pronunciation_am' : 'pronunciation_en'},
    "definitionLines": ${lang === 'am' ? 'definitionLines_am' : 'definitionLines_en'},
    "tagline": ${lang === 'am' ? 'tagline_am' : 'tagline_en'},
    "audioUrl": pronunciationAudio.asset->url
  }
`

// our way section 
export const OUR_WAY_QUERY = (lang: 'en' | 'am') => groq`
  *[_type == "ourWaySection"][0] {
    "tabProblem": ${lang === 'am' ? 'tabProblem_am' : 'tabProblem_en'},
    "tabOurWay": ${lang === 'am' ? 'tabOurWay_am' : 'tabOurWay_en'},
    "problemHeadline": ${lang === 'am' ? 'problemHeadline_am' : 'problemHeadline_en'},
    "problemText": ${lang === 'am' ? 'problemText_am' : 'problemText_en'},
    "problemPoints": ${lang === 'am' ? 'problemPoints_am' : 'problemPoints_en'},
    "testimonialQuote": ${lang === 'am' ? 'testimonialQuote_am' : 'testimonialQuote_en'},
    "testimonialAuthor": ${lang === 'am' ? 'testimonialAuthor_am' : 'testimonialAuthor_en'},
    "testimonialRole": ${lang === 'am' ? 'testimonialRole_am' : 'testimonialRole_en'},
    "ourWayPoints": ourWayPoints[] {
      number,
      "heading": ${lang === 'am' ? 'heading_am' : 'heading_en'},
      "description": ${lang === 'am' ? 'description_am' : 'description_en'}
    },
    "imageProblemUrl": imageProblem.asset->url,
    "imageOurWay1Url": imageOurWay1.asset->url,
    "imageOurWay2Url": imageOurWay2.asset->url
  }
`

