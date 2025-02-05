'use client';

import { HomeQueryResponse } from '@/app/(base-layout)/page';
import ProjectsGrid from '@/components/ProjectsGrid';
import { Boxes } from '@/components/ui/background-boxes';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { isCode, isHeading, isLink } from 'datocms-structured-text-utils';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { StructuredText, renderNodeRule } from 'react-datocms';

const VideoBlock = dynamic(() => import('@/components/blocks/VideoBlock'));
const ImageBlock = dynamic(() => import('@/components/blocks/ImageBlock'));
const ImageGalleryBlock = dynamic(() => import('@/components/blocks/ImageGalleryBlock'));
const Code = dynamic(() => import('@/components/Code'));
const HeadingWithAnchorLink = dynamic(() => import('@/components/HeadingWithAnchorLink'));

interface HomeArticleProps {
  home: NonNullable<HomeQueryResponse['home']>;
}

export default function HomeArticle({ home }: HomeArticleProps) {
  const words = home.title.split(' ').map((word) => ({
    text: word,
    className: 'text-primary',
  }));

  return (
    <div className="relative min-h-screen">
      {/* Background Boxes */}
      <Boxes 
        variant="random" 
        randomBoxCount={500} 
        className="opacity-20" 
      />

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        {/* Hero Section - Reduced spacing */}
        <div className="min-h-[45vh] flex flex-col justify-center items-center text-center">
          <div className="relative">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <TypewriterEffect words={words} className="text-6xl md:text-7xl font-bold tracking-tight" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground py-3 px-6 rounded-full inline-block"
            >
              UX Engineer & Digital Craftsman
            </motion.div>
          </div>
        </div>

        {/* About Section - Reduced padding */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-background/20 backdrop-blur-sm"
        >
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="prose-lg">
              <StructuredText
                data={home.structuredText}
                customNodeRules={[
                  renderNodeRule(isCode, ({ node, key }) => <Code key={key} node={node} />),
                  renderNodeRule(isHeading, ({ node, key, children }) => (
                    <HeadingWithAnchorLink node={node} key={key}>
                      {children}
                    </HeadingWithAnchorLink>
                  )),
                  renderNodeRule(isLink, ({ node, key, children }) => (
                    <Link
                      className="font-medium hover:text-primary transition-colors"
                      href={node.url}
                      key={key}
                    >
                      {children}
                    </Link>
                  )),
                ]}
                renderBlock={({ record }) => {
                  switch (record.__typename) {
                    case 'VideoBlockRecord':
                      return <VideoBlock data={record} />;
                    case 'ImageBlockRecord':
                      return <ImageBlock data={record} />;
                    case 'ImageGalleryBlockRecord':
                      return <ImageGalleryBlock data={record} />;
                    default:
                      return null;
                  }
                }}
                renderInlineRecord={({ record }) => {
                  if (record.__typename === 'PageRecord') {
                    return (
                      <Link
                        href={`/${record.slug}`}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
                      >
                        {record.title}
                      </Link>
                    );
                  }
                  return null;
                }}
                renderLinkToRecord={({ record, children }) => {
                  if (record.__typename === 'PageRecord') {
                    return (
                      <Link
                        href={`/${record.slug}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {children}
                      </Link>
                    );
                  }
                  return null;
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Projects Section - Updated background opacity */}
        <div className="relative z-10 bg-background/20 backdrop-blur-sm">
          <ProjectsGrid />
        </div>
      </motion.article>
    </div>
  );
}
