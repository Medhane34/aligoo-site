import { fetchCaseStudies } from "@/lib/CaseStudies";
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

type WorkSectionWrapperProps = {
  casestudyPosts: CaseStudy[]; // Renamed casestudy to casestudyPosts
};

export default async function WorkSectionWrapper() {
  const casestudyPosts = await fetchCaseStudies();

  if (casestudyPosts.length === 0) {
    return <div>No case studies available.</div>;
  }

  return <WorkSection casestudyPosts={casestudyPosts} />;
}
