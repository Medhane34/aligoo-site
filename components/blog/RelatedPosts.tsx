import Link from "next/link";
import Image from "next/image";
import { BlogPostListItem, Lang } from "@/types/BlogPost";

interface RelatedPostsProps {
    posts: BlogPostListItem[];
    lang?: Lang;
}

export default function RelatedPosts({ posts, lang = "en" }: RelatedPostsProps) {
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
                        href={`/${lang}/blog/${post.slug}`}
                        className="group flex flex-col gap-3"
                    >
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
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
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
