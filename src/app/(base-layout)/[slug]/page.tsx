import { Metadata } from 'next';
import Link from 'next/link';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode, isHeading, isLink } from 'datocms-structured-text-utils';
import dynamic from 'next/dynamic';

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

const query = graphql(
  /* GraphQL */ `
    query PageQuery($slug: String!) {
      page(filter: { slug: { eq: $slug } }) {
        _seoMetaTags {
          ...TagFragment
        }
        title
        slug
        _firstPublishedAt
        coverImage {
          responsiveImage(imgixParams: { fit: crop, w: 1200, h: 630, auto: format }) {
            src
            width
            height
            alt
            title
          }
        }
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

export const generateMetadata = generateMetadataFn<Props, any, { slug: string }>({
  query,
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const { isEnabled: isDraftModeEnabled } = draftMode();

  if (!params.slug) {
    notFound();
  }

  try {
    const { page } = await executeQuery(query, {
      variables: { slug: params.slug },
      includeDrafts: isDraftModeEnabled,
    });

    if (!page) {
      notFound();
    }

    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {page.coverImage && (
          <div className="relative h-[60vh] min-h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <img
              src={page.coverImage?.responsiveImage?.src || ''}
              alt={page.coverImage?.responsiveImage?.alt || page.title}
              className="object-cover object-center w-full h-full"
            />
          </div>
        )}

        <article className="prose prose-stone dark:prose-invert max-w-none">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">{page.title}</h1>
            <time dateTime={page._firstPublishedAt || ''} className="text-sm text-muted-foreground">
              {new Date(page._firstPublishedAt || '').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </header>

          <div className="mt-10">
            <StructuredText
              data={page.structuredText}
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

          <footer className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground">
            Published on{' '}
            {new Date(page._firstPublishedAt || '').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </footer>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error fetching page:', error);
    notFound();
  }
}
