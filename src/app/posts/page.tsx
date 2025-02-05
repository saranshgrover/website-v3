import { graphql } from '@/lib/datocms/graphql';
import { PostsGrid } from '@/components/PostsGrid';
import { Metadata } from 'next';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { draftMode } from 'next/headers';

export const metadata: Metadata = {
  title: 'Posts | Saransh Grover',
  description: 'Articles and posts detailing projects, learnings, and more',
};

const query = graphql(
  /* GraphQL */ `
    query AllPages {
      allPages {
        id
        title
        slug
        _firstPublishedAt
        seo: seoSettingsSocial {
          description
        }
        excerpt
        coverImage {
          responsiveImage(imgixParams: { fit: fill, w: 800, h: 400, auto: format }) {
            src
            width
            height
            alt
            title
            base64
          }
        }
      }
    }
  `
);

export default async function PostsPage() {
  const { isEnabled: isDraftModeEnabled } = draftMode();
  const { allPages } = await executeQuery(query, { includeDrafts: isDraftModeEnabled });
  
  return (
    <div className="min-h-screen">
      <PostsGrid posts={allPages as any} />
    </div>
  );
} 