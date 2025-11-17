"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NextImage from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { Divider } from "@heroui/divider";
import { Calendar } from "lucide-react"; // Import calendar icon

import { AccentText, SectionHeading } from "@/components/ui/typography";
import BadgeText from "@/components/atoms/BadgeText";

type BlogPostType = {
  imageUrl: string;
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt?: string;
  category?: {
    title_en?: string;
    title_am?: string;
  };
};

const BlogPost = ({
  post: { imageUrl, title, excerpt, slug, publishedAt, category },
  lang,
}: {
  post: BlogPostType;
  lang: "en" | "am";
}) => (
  <Link
    className="block h-full w-96 flex-shrink-0 snap-center"
    href={`/blog/${slug}`}
  >
    <Card className="h-full flex flex-col overflow-hidden border-0 bg-card shadow-sm hover:shadow-brand transition-shadow duration-300">
      {/* Image Container with Category Badge */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        {imageUrl ? (
          <NextImage
            fill
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={imageUrl}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
        )}

        {/* Category Badge - Top Right Corner */}
        {category && (
          <div className="absolute top-3 right-3 z-10">
            <BadgeText size="sm" className="bg-white/90 dark:bg-gray-900/90 text-foreground backdrop-blur-sm">
              {lang === "en" ? category.title_en : category.title_am}
            </BadgeText>
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardHeader className="flex flex-col items-start gap-3 p-5 pb-3">
        {" "}
        {/* Increased gap */}
        {/* Date with Calendar Icon - Left Aligned */}
        <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="flex-shrink-0" size={16} />
          <span>
            {publishedAt &&
              new Date(publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
          </span>
        </div>
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground line-clamp-2">
          {title}
        </h3>
      </CardHeader>

      <CardBody className="flex-1 p-5 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardBody>
      <Divider className="my-4" />

      <CardFooter className="p-5 pt-0 mt-auto">
        <span className="text-sm font-medium text-brand-primary hover:underline">
          Read More
        </span>
      </CardFooter>
    </Card>
  </Link>
);

export default function BlogSectionClient({
  blogs,
}: {
  lang: "en" | "am";
  blogs: BlogPostType[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -384 * 2, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 384 * 2, behavior: "smooth" });
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.7, ease: "easeInOut" },
    },
  };

  return (
    <section className="w-full py-12 bg-background-light dark:bg-background-dark">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            className="text-heading pb-2 xs:pb-3 sm:pb-4"
            variants={textVariants}
          >
            <SectionHeading>BLOGS</SectionHeading>
            <AccentText className="normal-case">
              Ideas, Insights & Marketing Rants
            </AccentText>
          </motion.div>
          <div className="flex space-x-2">
            <button
              aria-label="Scroll left"
              className="bg-brand-primary border rounded-md p-2 text-gray-600 hover:bg-gray-200"
              onClick={scrollLeft}
            >
              &lt;
            </button>
            <button
              aria-label="Scroll right"
              className="bg-brand-primary text-white border rounded-md p-2 hover:bg-gray-700"
              onClick={scrollRight}
            >
              &gt;
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          <div className="flex flex-row gap-4 transition-transform duration-200">
            {blogs.map((post) => (
              <BlogPost key={post._id} post={post} lang={"en"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
