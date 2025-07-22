"use client";
import React, { useRef } from "react";
import { Image } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AccentText, SectionHeading } from "@/components/ui/typography";
import NextImage from "next/image";

type BlogPostType = {
  imageUrl: string;
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt?: string;
};

const BlogPost = ({ post }: { post: BlogPostType }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group w-80 sm:w-96 shrink-0 rounded-lg shadow-md overflow-hidden flex flex-col bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 snap-start"
    tabIndex={0}
  >
    {post.imageUrl && (
      <NextImage
       src={post.imageUrl}
        alt={post.title}
        className="object-cover w-full h-48"
        width={384}
        height={200}
      />
    )}
    <div className="p-4 flex flex-col flex-1">
      <h3 className="xl:text-heading lg:text-heading md:text-heading text-brand-primary font-semibold group-hover:underline">
        {post.title}
      </h3>
      {post.publishedAt && (
        <span className="text-xs text-gray-400 mb-2">
          {new Date(post.publishedAt).toLocaleDateString()}
        </span>
      )}
      <p className="text-body text-gray-600 dark:text-gray-400 mt-1 mb-2 line-clamp-3">
        {post.excerpt}
      </p>
      <span className="mt-auto text-sm text-red-500 font-medium group-hover:underline">
        Read More &rarr;
      </span>
    </div>
  </Link>
);

export default function BlogSectionClient({
  blogs,
}: {
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
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="bg-brand-primary border rounded-md p-2 text-gray-600 hover:bg-gray-200"
            >
              &lt;
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll right"
              className="bg-brand-primary text-white border rounded-md p-2 hover:bg-gray-700"
            >
              &gt;
            </button>
          </div>
        </div>
        <div
          className="overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          ref={scrollRef}
        >
          <div className="flex flex-row gap-4 transition-transform duration-200">
            {blogs.map((post) => (
              <BlogPost key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
