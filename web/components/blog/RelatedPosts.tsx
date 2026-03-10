import Link from "next/link";
import Image from "next/image";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Calendar } from "lucide-react";
import { Divider } from "@heroui/divider";

import { BlogPostListItem, Lang } from "@/types/BlogPost";

interface RelatedPostsProps {
  posts: BlogPostListItem[];
  lang?: Lang;
}

export default function RelatedPosts({
  posts,
  lang = "en",
}: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="w-full mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
        Related Posts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            className="group flex flex-col gap-3"
            href={`/${lang}/blog/${post.slug}`}
          >
            {/*      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                            {post.imageUrl ? (
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg leading-tight group-hover:text-brand-primary transition-colors line-clamp-2 text-text-light dark:text-text-dark">
                                {post.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                                {post.publishedAt
                                    ? new Date(post.publishedAt).toLocaleDateString()
                                    : ""}
                            </p>
                        </div> */}
            <Card className="h-full flex flex-col rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 bg-card shadow-sm hover:shadow-brand transition-shadow duration-300 bg-neutral-900/50 border border-white/10 backdrop-blur-sm">
              {/* Image Container with Category Badge */}
              <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                {post.imageUrl ? (
                  <Image
                    fill
                    alt={post.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={post.imageUrl}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />
                )}
              </div>
              {/* Card Content */}
              {/* Date with Calendar Icon - Left Aligned */}
              <CardHeader className="flex flex-col items-start gap-3 p-5 pb-3">
                {" "}
                {/* Increased gap */}
                {/* Date with Calendar Icon - Left Aligned */}
                <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="flex-shrink-0" size={16} />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {/* Title */}
                <h3 className="text-md font-semibold text-foreground line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>
              <CardBody className="flex-1 p-5 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </CardBody>
              <Divider className="my-2" />
              <CardFooter className="p-5 pt-0 mt-auto">
                <span className="text-sm font-medium text-brand-primary hover:underline">
                  Read More
                </span>
              </CardFooter>
              {/* Divider */}
              {/* Read More */}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
