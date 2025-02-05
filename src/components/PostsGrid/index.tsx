'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Link from 'next/link';
import { Image } from 'react-datocms';
import { Boxes } from '../ui/background-boxes';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

interface Post {
  id: string;
  title: string;
  slug: string;
  _firstPublishedAt: string;
  seo: {
    description: string | null;
  } | null;
  excerpt: string | null;
  coverImage: {
    responsiveImage: {
      src: string;
      width: number;
      height: number;
      alt: string;
      title: string | null;
      base64: string;
    };
  } | null;
}

interface PostsGridProps {
  posts: Post[];
}

export function PostsGrid({ posts }: PostsGridProps) {
  return (
    <div className="relative min-h-screen">
      {/* Background Boxes */}
      <Boxes variant="random" randomBoxCount={500} className="opacity-20" />

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Posts & Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Articles and posts detailing projects, learnings, and more
          </p>
        </motion.div>

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow bg-background/20 backdrop-blur-sm border-muted">
                    {post.coverImage && (
                      <CardHeader className="p-0">
                        <Image
                          data={post.coverImage.responsiveImage}
                          className="rounded-t-lg"
                        />
                      </CardHeader>
                    )}
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                      <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt || post.seo?.description}
                      </p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0">
                      <time className="text-sm text-muted-foreground">
                        {format(new Date(post._firstPublishedAt), 'MMMM d, yyyy')}
                      </time>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 