// components/molecules/blog/BlogCard.tsx
"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cardVariantsTilt } from "@/lib/motions/cardVariants";
import { BlogPost } from "@/types/BlogPost";
import BadgeText from "@/components/atoms/BadgeText";
import { Calendar } from "lucide-react"; // Import calendar icon
import {Divider} from "@heroui/divider";
interface BlogCardProps extends BlogPost {
  lang: "en" | "am";
  showCategory?: boolean;
}

export default function BlogCard({
  title,
  excerpt,
  imageUrl,
  slug,
  publishedAt,
  category,
  lang,
  showCategory = true,
}: BlogCardProps) {
  const categoryTitle = lang === "en" ? category?.title_en : category?.title_am;

  return (
    <motion.div
      className="group h-full"
      variants={cardVariantsTilt}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
    >
      <Link href={`/blog/${slug}`} className="block h-full">
        <Card className="h-full flex flex-col overflow-hidden border-0 bg-card shadow-sm hover:shadow-brand transition-shadow duration-300">
          {/* Image Container with Category Badge */}
          <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
            )}
            
            {/* Category Badge - Top Right Corner */}
            {showCategory && category && (
              <div className="absolute top-3 right-3 z-10">
                <BadgeText  size="sm" className="bg-white/90 dark:bg-gray-900/90 text-foreground backdrop-blur-sm">
                  {categoryTitle || "Uncategorized"}
                </BadgeText>
              </div>
            )}
          </div>

          {/* Card Content */}
          <CardHeader className="flex flex-col items-start gap-3 p-5 pb-3"> {/* Increased gap */}
            {/* Date with Calendar Icon - Left Aligned */}
            <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={16} className="flex-shrink-0" />
              <span>
                {new Date(publishedAt).toLocaleDateString("en-US", {
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
            <p className="text-sm text-muted-foreground line-clamp-3">
              {excerpt}
            </p>
          </CardBody>
               <Divider className="my-4" />

          <CardFooter className="p-5 pt-0 mt-auto">
            <span className="text-sm font-medium text-brand-primary hover:underline">
              Read More
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}