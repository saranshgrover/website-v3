import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { ImageBlockFragment } from '@/components/blocks/ImageBlock';
import { ImageGalleryBlockFragment } from '@/components/blocks/ImageGalleryBlock';
import { VideoBlockFragment } from '@/components/blocks/VideoBlock';
import HomeArticle from '@/components/HomeArticle';
import { TagFragment } from '@/lib/datocms/commonFragments';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/lib/datocms/generateMetadataFn';
import { graphql } from '@/lib/datocms/graphql';
import { ResultOf } from 'gql.tada';
const VideoBlock = dynamic(() => import('@/components/blocks/VideoBlock'));
const ImageBlock = dynamic(() => import('@/components/blocks/ImageBlock'));
const ImageGalleryBlock = dynamic(() => import('@/components/blocks/ImageGalleryBlock'));
const Code = dynamic(() => import('@/components/Code'));
const HeadingWithAnchorLink = dynamic(() => import('@/components/HeadingWithAnchorLink'));

const homeQuery = graphql(
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

export type HomeQueryResponse = ResultOf<typeof homeQuery>;

export const generateMetadata = generateMetadataFn({
  query: homeQuery,
  pickSeoMetaTags: (data) => data.home?._seoMetaTags,
});

export default async function Page() {
  const { isEnabled: isDraftModeEnabled } = draftMode();

  try {
    const { home } = await executeQuery(homeQuery, {
      includeDrafts: isDraftModeEnabled,
    });

    if (!home) {
      notFound();
    }

    return <HomeArticle home={home} />;
  } catch (error) {
    console.error('Error fetching home:', error);
    notFound();
  }
}
