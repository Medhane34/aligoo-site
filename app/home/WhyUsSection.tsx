// components/home/WhyUsSection.tsx
"use client";
import React from "react";
import Image from "next/image"; // Import Next.js Image component
import { motion } from "framer-motion";
import { AccentText, SectionHeading } from "@/components/ui/typography";

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0.2, scale: 1.1 },
  visible: {
    opacity: 0.3,
    scale: 1,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

export default function WhyUsSection() {
  // Hardcoded reasons as per the content strategy
  const reasons = [
    {
      id: 1,
      emoji: "🐺",
      title: "We’re Built for the Underdogs",
      description:
        "We love working with small to medium-sized businesses — especially those overlooked by big agencies. We meet you where you are, and help you scale with strategy, not fluff.",
      gradient: "from-blue-500 to-indigo-700",
      span: "col-span-1",
      // No background image for this card
    },
    {
      id: 2,
      emoji: "📊",
      title: "Results Come First — Always",
      description:
        "We don’t throw buzzwords or pretty mockups. Everything we do is tied to clear goals: more traffic, more leads, more conversions. Creative work that actually performs.",
      gradient: "from-green-500 to-emerald-700",
      span: "col-span-1 row-span-2", // This card spans 2 rows
      backgroundImage: "/rocket-launcher.png", // Example path, update with your actual image paths in public/images
      imageStyle: {
        // <-- NEW: Specific style for this image
        objectFit: "contain", // Keep aspect ratio, fit inside
        objectPosition: "bottom right", // Position at bottom right
        opacity: 0.2, // Subtle opacity
      },
    },
    {
      id: 3,
      emoji: "🌍",
      title: "Deep Local Understanding",
      description:
        "Based in Addis, we speak your market’s language — literally and culturally. We get the nuance of local buying behavior, and we bring it into your campaigns and design.",
      gradient: "from-orange-500 to-red-700",
      span: "col-span-1",
      // No background image for this card
    },
    {
      id: 4,
      emoji: "🎨",
      title: "Design with Soul",
      description:
        "Every pixel, word, and layout choice is intentional. Because your brand deserves more than templates — it needs a site and strategy that feels like you and wows your audience.",
      gradient: "from-purple-500 to-pink-700",
      span: "col-span-1",
      // No background image for this card
    },
    {
      id: 5,
      emoji: "📈",
      title: "Made for Growth — Not Just Launch",
      description:
        "A beautiful site is just step one. We build with marketing in mind — SEO, speed, funnel design, and flexibility — so your site doesn’t just look great, it performs and evolves.",
      gradient: "from-teal-500 to-cyan-700",
      span: "col-span-1",
      // No background image for this card
    },
    {
      id: 6,
      emoji: "🤝",
      title: "We’re With You, Not Above You",
      description:
        "No corporate ego. No confusing lingo. We partner like real people — collaborative, clear, responsive. We’ll treat your project like it’s our own.",
      gradient: "from-yellow-500 to-orange-700",
      span: "md:col-span-2 lg:col-span-2", // This card spans 2 columns on medium and large screens
      backgroundImage: "", // Example path, update with your actual image paths in public/images
      imageStyle: {
        // <-- NEW: Specific style for this image
        objectFit: "contain",
        objectPosition: "top", // Position at bottom center (for offset, we'll use a wrapper)
        opacity: 0.3, // Slightly higher opacity
        // To add offset, we'll wrap the Image component and use positioning there
      },
    },
    /*
    { // Commented out id 7 as requested
      id: 7,
      emoji: '❤️',
      title: 'Small Team, Big Heart',
      description: 'We’re not a faceless firm. We’re a close-knit team who cares deeply about what we create and who we create for. You’ll feel that in every call, comment, and deliverable.',
      gradient: 'from-rose-500 to-fuchsia-700',
      span: 'col-span-1',
      backgroundImage: '/images/card-bg-7.svg',
      imageStyle: {}, // Default empty style if needed
    },
    */
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Title and Subtext */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          variants={headingVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.div
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-light dark:text-text-dark mb-4"
            variants={headingVariants}
          >
            <SectionHeading className="text-heading uppercase">
              Why Us{" "}
            </SectionHeading>
          </motion.div>
          <motion.div
            className="text-lg sm:text-xl text-gray-300"
            variants={headingVariants}
          >
            <AccentText className="normal-case">
              {" "}
              This isn’t your average digital agency. Here’s why.{" "}
            </AccentText>
          </motion.div>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
          initial="hidden"
          variants={cardContainerVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              className={`
        relative overflow-hidden
        ${reason.span}
        bg-gradient-to-br ${reason.gradient}
        rounded-xl shadow-lg
        p-8 flex flex-col justify-between
        min-h-[220px] sm:min-h-[250px] lg:min-h-[280px]
        transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl
      `}
              variants={cardVariants}
            >
              {/* Content layer */}
              <div className="relative z-10">
                <div
                  aria-label={reason.emoji}
                  className="text-5xl mb-4"
                  role="img"
                >
                  {reason.emoji}
                </div>
                <h3 className="text-heading font-bold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-200 text-body">{reason.description}</p>
              </div>

              {/* Background Image layer */}
              {reason.backgroundImage && (
                <motion.div
                  className="absolute inset-0 z-0"
                  initial="hidden"
                  variants={imageVariants}
                  viewport={{ once: true }}
                  whileInView="visible"
                >
                  <Image
                    alt={`${reason.title} background`}
                    className={`
              ${reason.imageStyle?.opacity ? `opacity-${reason.imageStyle.opacity * 100}` : "opacity-20"}
              ${reason.id === 6 ? "translate-x-[20%] translate-y-[20%]" : ""}
            `}
                    layout="fill"
                    objectFit={reason.imageStyle?.objectFit || "contain"}
                    objectPosition={
                      reason.imageStyle?.objectPosition || "bottom right"
                    }
                    src={reason.backgroundImage}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
