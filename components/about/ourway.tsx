// app/[lang]/about/OurWaySection.tsx
'use client'

import { useState } from "react"
import NextImage from "next/image"
import { motion } from "framer-motion"
import { OurWaySectionData } from "@/lib/about"

type Props = OurWaySectionData & { lang: 'en' | 'am' }

const OurWaySection = ({
  tabProblem,
  tabOurWay,
  problemHeadline,
  problemText,
  problemPoints = [],
  testimonialQuote,
  testimonialAuthor,
  testimonialRole,
  ourWayPoints = [],
  imageProblemUrl,
  imageOurWay1Url,
  imageOurWay2Url,
  lang
}: Props) => {
  const [activeTab, setActiveTab] = useState<"problem" | "ourWay">("problem")
  const isAmharic = lang === 'am'

  const tabNavVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } } }
  const problemLeftVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeInOut" } } }
  const problemRightContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
  const problemRightVariants = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } } }
  const ourWayImagesContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
  const ourWayImageVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeInOut" } } }
  const ourWayListContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
  const ourWayListVariants = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } } }

  return (
    <div className="py-16 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 text-text-light dark:text-text-dark">
        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center border-gray-200"
          initial="hidden"
          variants={tabNavVariants}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <motion.button
            className={`py-2 px-4 font-semibold ${activeTab === "problem" ? "text-text-light dark:text-text-dark border-b-2 border-brand-primary" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("problem")}
          >
            ❌ {tabProblem}
          </motion.button>
          <motion.button
            className={`py-2 px-4 font-semibold ${activeTab === "ourWay" ? "text-text-light dark:text-text-dark border-b-2 border-brand-primary" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("ourWay")}
          >
            ✅ {tabOurWay}
          </motion.button>
        </motion.div>

        {/* Problem Tab */}
        {activeTab === "problem" && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8"
            initial="hidden"
            viewport={{ once: true }}
            whileInView="visible"
          >
            {/* Left: Image + Testimonial */}
            <motion.div className="relative" variants={problemLeftVariants}>
              <NextImage
                alt="Merchant testimonial"
                className="rounded-xl shadow-2xl object-cover z-0"
                height={500}
                src={imageProblemUrl || "/page-content-images/david-2.jpeg"}
                width={500}
              />
              <motion.div
                className="absolute m-[-25] bottom-0 right-[54] bg-gray-900 bg-opacity-90 text-white p-6 rounded-xl max-w-sm shadow-xl z-13"
                variants={problemLeftVariants}
              >
                <p className="text-lg italic">&quot;{testimonialQuote}&quot;</p>
                <p className="mt-4 font-semibold text-subheading">
                  {testimonialAuthor}
                  <br />
                  <span className="text-small opacity-75">{testimonialRole}</span>
                </p>
              </motion.div>
            </motion.div>

            {/* Right: Text */}
            <motion.div className="space-y-6" variants={problemRightContainerVariants}>
              <motion.h2 className={`text-4xl font-bold text-text-light dark:text-text-dark text-heading ${isAmharic ? 'font-amharicHeading' : ''}`} variants={problemRightVariants}>
                {problemHeadline}
              </motion.h2>
              <motion.p className={`text-gray-600 dark:text-gray-400 text-body ${isAmharic ? 'font-amharicBody text-lg' : ''}`} variants={problemRightVariants}>
                {problemText}
              </motion.p>
              <motion.div className="space-y-4" variants={problemRightContainerVariants}>
                {(Array.isArray(problemPoints) ? problemPoints : []).map((point, i) => (
                  <motion.div key={i} variants={problemRightVariants}>
                    <h3 className="text-2xl font-semibold text-brand-primary">
                      {String(point).includes("0% B.S.")
                        ? "⛔️ 0% B.S."
                        : String(point).includes("promises")
                        ? "Big promises, small follow-through"
                        : String(point).includes("Copy-paste")
                        ? "Copy-paste strategies"
                        : "Agencies more obsessed with awards than impact"}
                    </h3>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Our Way Tab */}
        {activeTab === "ourWay" && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center py-8"
            initial="hidden"
            viewport={{ once: true }}
            whileInView="visible"
          >
            {/* Images */}
            <motion.div className="flex justify-center items-center gap-12 relative" variants={ourWayImagesContainerVariants}>
              <motion.div className="relative z-10" variants={ourWayImageVariants}>
                <NextImage
                  alt="E-commerce Dashboard"
                  className="rounded-xl shadow-2xl object-cover"
                  height={300}
                  src={imageOurWay1Url || "/page-content-images/about-us-ourway-1.png"}
                  width={300}
                />
              </motion.div>
              <motion.div className="relative -mt-8 -ml-8 z-0" variants={ourWayImageVariants}>
                <NextImage
                  alt="Cashier Interaction"
                  className="rounded-xl shadow-xl object-cover"
                  height={300}
                  src={imageOurWay2Url || "/page-content-images/about-us-ourway-2.png"}
                  width={300}
                />
              </motion.div>
            </motion.div>

            {/* List */}
            <motion.div className="space-y-8 text-left" variants={ourWayListContainerVariants}>
              {(Array.isArray(ourWayPoints) ? ourWayPoints : []).map((point, index) => (
                <motion.div key={index} className="flex items-start gap-4" variants={ourWayListVariants}>
                  <span className="text-4xl font-bold text-brand-primary shrink-0 mt-1">
                    {point?.number}
                  </span>
                  <div>
                    <h3 className={`text-subheading font-bold text-text-light dark:text-text-dark mb-1 ${isAmharic ? 'font-amharicHeading' : ''}`}>
                      {point?.heading}
                    </h3>
                    <p className={`text-gray-600 dark:text-gray-400 text-body ${isAmharic ? 'font-amharicBody text-lg' : ''}`}>
                      {point?.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default OurWaySection