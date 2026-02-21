// src/sanity/queries/about.ts

import { groq } from 'next-sanity';

export const ABOUT_PAGE_QUERY = groq`
  {
    "intro": *[_type == "aboutIntroSection"][0] {
      "mainHeading": select($lang == "am" => mainHeading_am, mainHeading_en),
      "introText": select($lang == "am" => introText_am, introText_en),
      "founded": select($lang == "am" => founded_am, founded_en),
      "focus": select($lang == "am" => focus_am, focus_en),
      "campaignsLaunched": select($lang == "am" => campaignsLaunched_am, campaignsLaunched_en),
      "momentsProudOf": select($lang == "am" => momentsProudOf_am, momentsProudOf_en)
    },
    "values": *[_type == "valuesSection"][0] {
      "sectionHeading": select($lang == "am" => sectionHeading_am, sectionHeading_en),
      "accentText": select($lang == "am" => accentText_am, accentText_en),
      "buttonText": select($lang == "am" => buttonText_am, buttonText_en),
      "buttonUrl": buttonUrl,
      "values": select($lang == "am" => values_am, values_en)[] {
        emoji,
        title,
        description,
        bgColor,
        textColor
      }
    },
    "ourWay": *[_type == "ourWaySection"][0] {
      "tabProblem": select($lang == "am" => tabProblem_am, tabProblem_en),
      "tabOurWay": select($lang == "am" => tabOurWay_am, tabOurWay_en),
      "problemHeadline": select($lang == "am" => problemHeadline_am, problemHeadline_en),
      "problemText": select($lang == "am" => problemText_am, problemText_en),
      "problemPoints": select($lang == "am" => problemPoints_am, problemPoints_en),
      "testimonialQuote": select($lang == "am" => testimonialQuote_am, testimonialQuote_en),
      "testimonialAuthor": select($lang == "am" => testimonialAuthor_am, testimonialAuthor_en),
      "testimonialRole": select($lang == "am" => testimonialRole_am, testimonialRole_en),
      "ourWayPoints": ourWayPoints[] {
        number,
        "heading": select($lang == "am" => heading_am, heading_en),
        "description": select($lang == "am" => description_am, description_en)
      },
      "imageProblemUrl": imageProblem.asset->url,
      "imageOurWay1Url": imageOurWay1.asset->url,
      "imageOurWay2Url": imageOurWay2.asset->url
    },
    "meaning": *[_type == "meaningSection"][0] {
      "mainHeading": select($lang == "am" => mainHeading_am, mainHeading_en),
      "pronunciation": select($lang == "am" => pronunciation_am, pronunciation_en),
      "definitionLines": select($lang == "am" => definitionLines_am, definitionLines_en),
      "tagline": select($lang == "am" => tagline_am, tagline_en),
      "audioUrl": pronunciationAudio.asset->url
    },
    "team": *[_type == "teamSection"][0] {
      "heading": select($lang == "am" => heading_am, heading_en),
      "subheading": select($lang == "am" => subheading_am, subheading_en),
      "members": members[] {
        name,
        "role": select($lang == "am" => role_am, role_en),
        "bio": select($lang == "am" => bio_am, bio_en),
        yearsOfExperience,
        "superpower": select($lang == "am" => superpower_am, superpower_en),
        socialLinks,
        department,
        departmentColor,
        firstNameColor,
        lastNameColor,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt
      }
    }
  }
`;