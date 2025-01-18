'use client';

import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode, isHeading, isLink } from 'datocms-structured-text-utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { HomeQueryResponse } from '@/app/(base-layout)/page';
import { Boxes } from '@/components/ui/background-boxes';
import { ChevronDown } from 'lucide-react';

const VideoBlock = dynamic(() => import('@/components/blocks/VideoBlock'));
const ImageBlock = dynamic(() => import('@/components/blocks/ImageBlock'));
const ImageGalleryBlock = dynamic(() => import('@/components/blocks/ImageGalleryBlock'));
const Code = dynamic(() => import('@/components/Code'));
const HeadingWithAnchorLink = dynamic(() => import('@/components/HeadingWithAnchorLink'));

interface HomeArticleProps {
  home: NonNullable<HomeQueryResponse['home']>;
}

export default function HomeArticle({ home }: HomeArticleProps) {
  // Split title into words for the typewriter effect
  const words = home.title.split(' ').map((word) => ({
    text: word,
    className: 'text-primary',
  }));

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 96, // 6rem = 96px
      behavior: 'smooth',
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-stone dark:prose-invert max-w-none"
    >
      <div className="h-[calc(100vh-6rem)] flex flex-col justify-center items-center text-center relative overflow-hidden">
        <Boxes variant="click" className="opacity-10 z-10 w-[100vw] m-0 p-0 h-full" />


        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative z-10"
        >
          <TypewriterEffect words={words} className="text-5xl font-bold tracking-tight" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-xl text-muted-foreground relative z-20 bg-background/80 backdrop-blur-sm py-2 px-4 rounded-full"
        >
          UX Engineer & Digital Craftsman
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onClick={scrollToContent}
          className="mt-8 relative z-20 text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
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
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-8 text-sm text-muted-foreground"
      >
        Published at {home._firstPublishedAt}
      </motion.footer>
    </motion.article>
  );
}
