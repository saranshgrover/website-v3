import { graphql } from '@/lib/datocms/graphql';

export const ALL_PAGES_QUERY = graphql(`
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
`); 