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
    name: "Sarah Johnson",
    date: "April 10, 2025",
    rating: 5,
    title: "Transformed Our Ad Campaigns!",
    content:
      "The team optimized our Facebook ad strategy, and we saw a 50% increase in conversions within a month. Highly recommend!",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Michael Carter",
    date: "January 20, 2024",
    rating: 4,
    title: "Boosted Our Online Presence!",
    content:
      "Their SEO strategies increased our website traffic by 40%. The results were impressive, though it took a bit longer than expected.",
    avatarUrl: "https://heroui.com/images/card-example-4.jpeg",
  },
  {
    name: "Emily Davis",
    date: "March 5, 2025",
    rating: 5,
    title: "Exceptional Service!",
    content:
      "Working with them on our digital marketing was a game-changer. Our brand visibility skyrocketed, and we gained so many new clients!",
    avatarUrl: "https://heroui.com/images/card-example-4.jpeg",
  },
  {
    name: "David Lee",
    date: "November 15, 2024",
    rating: 5,
    title: "Amazing Results with Facebook Ads!",
    content:
      "Their expertise in Facebook ads helped us reach our target audience effectively. We saw a 60% ROI increase in just two months!",
    avatarUrl: "https://heroui.com/images/card-example-4.jpeg",
  },
  {
    name: "Olivia Brown",
    date: "February 12, 2025",
    rating: 4,
    title: "Great Collaboration!",
    content:
      "The team was professional and delivered a solid social media strategy. We’re thrilled with the engagement growth on our platforms.",
    avatarUrl: "https://heroui.com/images/card-example-4.jpeg",
  },
  {
    name: "James Wilson",
    date: "December 1, 2024",
    rating: 3,
    title: "Good, But Room for Improvement",
    content:
      "The campaign results were decent, but communication could have been better. Still, our online sales did improve by 20%.",
    avatarUrl: "https://heroui.com/images/card-example-4.jpeg",
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
  <section className="w-full overflow-hidden py-12 text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark">
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
            <div key={i} className="flex-none w-80">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default TestimonialsSection;
