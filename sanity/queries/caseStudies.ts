// sanity/queries/caseStudies.ts
// GROQ queries for case studies

// Fetch up to 6 case studies, sorted by creation date
export const caseStudiesQuery = (start: number, end: number) => `
  *[_type == "caseStudy"] | order(_createdAt desc)[${start}...${end}] {
    _id,
    title,
    excerpt,
    "imageUrl": mainImage.asset->url,
    "service": service->title,
    "slug": slug.current,
    "hasImage": defined(mainImage),
    "hasService": defined(service)
  }
`;

// Additionally, we need a query to get the total count of case studies
// This is crucial for calculating the total number of pages in the frontend.
export const getTotalCaseStudiesCountQuery = `
  count(*[_type == "caseStudy"])
`;

// Fetch a single featured case study
export const featuredCaseStudyQuery = `
  *[_type == "caseStudy" && tag == "Featured"][0] {
    _id,
    title,
    excerpt, 
    "imageUrl": mainImage.asset->url,
    "service": service->title,
    "slug": slug.current,
    "hasImage": defined(mainImage),
    "hasService": defined(service)
  }
`;

// query to fetch fb case study heading for the service page 

export const SECTION_HEADING_BLOCK_QUERY = `
  *[_type == "sectionHeadingBlock" && name == $name][0]{
    heading_en,
    heading_am,
    subheading_en,
    subheading_am
  }
`;

// query to fetch fb casestudy for the service page. 
export const fbCaseStudyQuery = `
*[_type == "caseStudy" && service->title == "Facebook-Ad"]
{
  _id,
  title,
  industry,
  "imageUrl": mainImage.asset->url,
  "service": service->title, // Keep this for projecting the service title
  "slug": slug.current
}[0...3]
`;

export const wbCaseStudyQuery = `
*[_type == "caseStudy" && service->title match "Web-Design"]
{
  _id,
  title,
  industry,
  "imageUrl": mainImage.asset->url,
  "service": service->title, // Keep this for projecting the service title
  "slug": slug.current
}[0...3]
`;

export const HomeCaseStudyQuery = `
  *[_type == "caseStudy"] | order(_createdAt desc)[0...5] {
    _id,
    title,
   goalsSummary,
challengeSummary,
    "imageUrl": mainImage.asset->url,
    "service": service->title,
    "slug": slug.current,
    "hasImage": defined(mainImage),
    "hasService": defined(service)
  }

`;
