/* eslint-disable padding-line-between-statements */
import { fetchHomeCaseStudies } from "@/lib/CaseStudies";
import WorkSection from "@/app/home/WorkSection"
import { CaseStudy } from "@/types/CaseStudyTypes";

type HomeCaseStudyWrapper = {
  casestudyPosts: CaseStudy[]; // Renamed casestudy to casestudyPosts
};

export default async function HomeCaseStudyWrapper() {
  const casestudyPosts = await fetchHomeCaseStudies();
  
  if (casestudyPosts.length === 0) {
    return <div>No case studies available.</div>;
  }

  return <WorkSection casestudyPosts={casestudyPosts} />;
}
