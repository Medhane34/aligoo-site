import { fetchCaseStudies, fetchTotalCaseStudiesCount } from "@/lib/CaseStudies";
import WorkSection from "@/app/works/WorkSection"

type CaseStudy = {
  _id: string;
  title: string;
  imageUrl: string;
  service: string;
  hasImage: boolean;
  hasService: boolean;
  slug: string;
};

// No longer needed to pass initial casestudyPosts if WorkSection manages its own data fetching based on pagination
// interface WorkSectionProps {
//   casestudyPosts: CaseStudy[];
// }

export default async function WorkSectionWrapper() {
  const POSTS_PER_PAGE = 6; // Define this here, or as an environment variable

  // Fetch initial data for the first page and total count on the server
  const initialCaseStudies = await fetchCaseStudies(POSTS_PER_PAGE, 0);
  const totalPosts = await fetchTotalCaseStudiesCount();

  if (initialCaseStudies.length === 0 && totalPosts === 0) {
    return <div className="text-center py-8">No case studies available.</div>;
  }

  // Pass initial data and total count to the client component
  return (
    <WorkSection
      initialCaseStudies={initialCaseStudies}
      totalPosts={totalPosts}
      postsPerPage={POSTS_PER_PAGE}
    />
  );
}
