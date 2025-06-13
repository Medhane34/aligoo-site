// BlogSectionClient.tsx
"use client";
import React, { useRef } from "react";
import { Image } from "@heroui/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AccentText } from "@/components/ui/typography";

type BlogPostType = {
  imageUrl: string;
  _id: string;
  title: string;
  slug: string;
};

const BlogPost = ({ post }: { post: BlogPostType }) => (
  <div
    className="w-64 md:w-96 rounded-lg shadow-md overflow-hidden flex flex-col flex-shrink-0 bg-background-light dark:bg-background-dark"
  >
    {post.imageUrl && (
      <Image
        isZoomed
        src={post.imageUrl}
        alt={post.title}
        className="object-cover w-full shadow-md"
        width={384}
        height={200}
      />
    )}
    <div className="p-4">
      <Link href={`/blog/${post.slug}`}>
        <h3 className="lg:text-heading text-brand-primary font-semibold">
          {post.title}
        </h3>
      </Link>
    </div>
  </div>
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
      <div className="max-w-5xl mx-auto px-4"> {/* Boxed container */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            className="text-heading pb-2 xs:pb-3 sm:pb-4"
            variants={textVariants}
          >
            <AccentText className="normal-case">
              Ideas, Insights & Marketing Rants
            </AccentText>
          </motion.div>
          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              className="bg-brand-primary border rounded-md p-2 text-gray-600 hover:bg-gray-200"
            >
              &lt;
            </button>
            <button
              onClick={scrollRight}
              className="bg-brand-primary text-white border rounded-md p-2 hover:bg-gray-700"
            >
              &gt;
            </button>
          </div>
        </div>
        <div
          className="overflow-x-auto pb-4 scrollbar-hide"
          ref={scrollRef}
        >
          <div className="flex flex-row gap-4 transition-transform duration-200 ">
            {blogs.map((post) => (
              <BlogPost key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
