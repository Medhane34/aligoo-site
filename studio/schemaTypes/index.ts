import { postType } from "./postType";
import { serviceType } from "./serviceType";
import { caseStudyType } from "./caseStudyType";
import blockContent from "./objects/blockContent";
import markdownTable from "./blocks/markdownTable";
import tip from "./objects/tip";
import home_heroSection from "./homepage/home_heroSection";
import aboutUsSection from "./homepage/aboutUsSection";
import statsSection from "./homepage/statsSection";
import serviceSection from "./homepage/serviceSection";
import processSection from "./homepage/processSection";
import whyUsSection from "./homepage/whyUsSection";
import aboutIntroSection from "./about/aboutIntroSection";
import aboutOurWaySection from "./about/aboutOurWaySection";
import valuesSection from "./about/valuesSection";
import featuredCaseStudy from "./works/featuredCaseStudy";
import industriesSection from "./works/industriesSection";
import contactSection from "./contact/contactSection";
import whyServiceWorksSection from "./shared/whyServiceWorksSection";
import facebookAdProcessSection from "./services/facebook-ad/facebookAdProcessSection";
import whoThisIsForSection from "./shared/whoThisIsForSection";
import heading4dynamic from "./shared/heading4dynamic";
import faqSection from "./shared/faqSection";
import ourProcessSection from "./shared/ourProcessSection";
import ctaSection from "./shared/ctaSection";
import heroSection from "./shared/heroSection";
import whyServiceWorksFeatures from "./shared/whyServiceWorksFeatures";
import youtubeVideo from "./blocks/youtubeVideo";
import category from "./category";
import testimonial from "./homepage/testimonial";
import teamSection from "./about/teamSection";
import meaningSection from "./about/meaningSection";
import ourWaySection from "./about/ourWaySection";
import salesUser from "./proposal/salesUser";
import proposal from "./proposal/proposal";
import proposalTemplate from "./proposal/proposalTemplate";
import { teamMember } from "./proposal/teamMember";
import contractTemplate from "./proposal/contractTemplate";
import campaign from "./telegram/campaign";
import subscriber from "./telegram/subscribersMaster";
import interaction from "./telegram/interaction";

import author from "./author";
import siteSettings from "./siteSettings";
import { tgPromotionType } from "./tgPromotionType";

export const schemaTypes = [blockContent, tip, serviceType, caseStudyType, markdownTable, youtubeVideo
   // home page 
   , aboutUsSection, statsSection, serviceSection, processSection, whyUsSection, testimonial,
   //about page
   aboutIntroSection, aboutOurWaySection, valuesSection, teamSection, meaningSection, ourWaySection
   // works page 
   , featuredCaseStudy, industriesSection,
   contactSection, whyServiceWorksSection, facebookAdProcessSection, whoThisIsForSection
   //shared types 
   , heroSection, heading4dynamic, faqSection, ourProcessSection, ctaSection, postType, category, whyServiceWorksFeatures, author,
   // Proposal 
   salesUser, proposal, proposalTemplate, teamMember, contractTemplate,
   // Telegram
   campaign, subscriber, interaction,
   // Global
   siteSettings, tgPromotionType
];
