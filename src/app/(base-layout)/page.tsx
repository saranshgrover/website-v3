import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode, isHeading, isLink } from 'datocms-structured-text-utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { ImageBlockFragment } from '@/components/blocks/ImageBlock';
import { ImageGalleryBlockFragment } from '@/components/blocks/ImageGalleryBlock';
import { VideoBlockFragment } from '@/components/blocks/VideoBlock';

const VideoBlock = dynamic(() => import('@/components/blocks/VideoBlock'));
const ImageBlock = dynamic(() => import('@/components/blocks/ImageBlock'));
const ImageGalleryBlock = dynamic(() => import('@/components/blocks/ImageGalleryBlock'));
const Code = dynamic(() => import('@/components/Code'));
const HeadingWithAnchorLink = dynamic(() => import('@/components/HeadingWithAnchorLink'));

export const query = graphql(
  /* GraphQL */ `
    query HomeQuery {
      home {
        _seoMetaTags {
          ...TagFragment
        }
        title
        _firstPublishedAt
        structuredText {
          value
          blocks {
            ... on RecordInterface {
              id
              __typename
            }
            ... on ImageBlockRecord {
              ...ImageBlockFragment
            }
            ... on ImageGalleryBlockRecord {
              ...ImageGalleryBlockFragment
            }
            ... on VideoBlockRecord {
              ...VideoBlockFragment
            }
          }
          links {
            ... on RecordInterface {
              id
              __typename
            }
            ... on PageRecord {
              title
              slug
            }
          }
        }
      }
    }
  `,
  [TagFragment, ImageBlockFragment, ImageGalleryBlockFragment, VideoBlockFragment],
);

export const generateMetadata = generateMetadataFn({
  query,
  pickSeoMetaTags: (data) => data.home?._seoMetaTags,
});

export default async function Page() {
  const { isEnabled: isDraftModeEnabled } = draftMode();

  try {
    const { home } = await executeQuery(query, {
      includeDrafts: isDraftModeEnabled,
    });

    if (!home) {
      notFound();
    }

    return (
      <article className="prose prose-stone dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold tracking-tight">{home.title}</h1>
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
        <footer className="mt-8 text-sm text-muted-foreground">
          Published at {home._firstPublishedAt}
        </footer>
      </article>
    );
  } catch (error) {
    console.error('Error fetching home:', error);
    notFound();
  }
}
