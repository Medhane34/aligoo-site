'use client'
import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import {
  AccentText,
  SectionHeading,
  Paragraph,
} from "@/components/ui/typography";

// Define a customized array of 6 testimonials with unique data
const testimonials = [
  {
    name: "Yordanos G/silassie",
    date: "june 15, 2024",
    rating: 5,
    title: "increased my ROI!",
    content:
      "Aligo Marketing solution was the perfect partner for to help me grow my online business and I was very impressed with their service. They created a custom ads plan that suited my budget and goals, and helped me reach more customers across different platforms. They also provided me with detailed reports and insights on how to optimize my campaigns and increase my ROI. Aligo Marketing solution is a professional and reliable advertising company that I would highly recommend to anyone looking for online advertising solutions.",
    avatarUrl: "/icons/google-icon.png",
  },
  {
    name: "Abeselom Banjaw",
    date: "January 20, 2024",
    rating: 5,
    title: "Boosted Our Online Presence!",
    content:
      "Aligo Marketing solution was the best solution and partner for to help me grow my architectural business and I was very impressed with their service. Their custom ad plan, tailored to my budget and objectives, helped me connect with a wider audience across Ethiopia. I saw a significant increase in brand awareness and customer engagement, ultimately leading to a generating quality leads and 3x Return on my investement, I am very flattered to have them boost my company /abrehot designs/and I thank them with all my heart. Thanks aligoo",
    avatarUrl: "/icons/google-icon.png",
  },
  {
    name: "Zelalem Sima",
    date: "March 5, 2025",
    rating: 5,
    title: "Exceptional Service!",
    content:
      "The web Developing company Aligoo and its founding partner Daniel has been very compassionate and timely in delivering their development. I also like to thank Daniel for his relentless effort of making time for this project and his unwavering commitment to his work. I had a pleasure working with them !!!",
    avatarUrl: "/icons/google-icon.png",
  },
  {
    name: "Tenbit Ermiyas",
    date: "November 15, 2024",
    rating: 5,
    title: "Amazing Results with Web Design!",
    content:
      "Overall very pleased with Daniel and his friendliness with Me. He did everything I asked in a timely matter. I will definitely be recommending him to other companies. Thanks for such good work.",
    avatarUrl: "/icons/google-icon.png",
  },
  {
    name: "ruta kesete",
    date: "February 12, 2025",
    rating: 5,
    title: "Great Collaboration!",
    content:
      "Aligo Digital Betam new mamesegnew, tiru page nachu yserachulgn amesegnalew.",
   avatarUrl: "/icons/google-icon.png",
  },
  {
    name: "Ephrem Hirut Export",
    date: "December 1, 2024",
    rating: 4,
    title: "Good, But Room for Improvement",
    content:
      "Well experienced web designer",
    avatarUrl: "/icons/google-icon.png",
  },
];
const textVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.7, ease: "easeInOut" },
  },
};

export const TestimonialsSection = () => (
  <section className="w-full overflow-x-hidden py-12 text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark">
    <motion.div className="mx-auto max-w-6xl px-4">
      <motion.div 
      initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        variants={textVariants}
      >
        <SectionHeading className="text-heading uppercase">
          Client Love{" "}
        </SectionHeading>
      </motion.div>
      <motion.div
        variants={textVariants}
        className="text-heading pb-2 xs:pb-3 sm:pb-4"
      >
        <AccentText className="normal-case"> Feedback That Fuels Us</AccentText>
      </motion.div>
      <div className="relative max-w-full">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth scrollbar-hide">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="flex-none ">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default TestimonialsSection;
