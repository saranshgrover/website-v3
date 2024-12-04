import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { Card, CardContent } from "@/components/ui/card";

/**
 * Let's define the GraphQL fragment needed for the component to function.
 *
 * GraphQL fragment colocation keeps queries near the components using them,
 * improving maintainability and encapsulation. Fragment composition enables
 * building complex queries from reusable parts, promoting code reuse and
 * efficiency. Together, these practices lead to more modular, maintainable, and
 * performant GraphQL implementations by allowing precise data fetching and
 * easier code management.
 *
 * Learn more: https://gql-tada.0no.co/guides/fragment-colocation
 */
export const ImageBlockFragment = graphql(
  /* GraphQL */ `
    fragment ImageBlockFragment on ImageBlockRecord {
      asset {
        title
        responsiveImage(sizes: "(max-width: 700px) 100vw, 700px") {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment],
);

type Props = {
  data: FragmentOf<typeof ImageBlockFragment>;
};

export default function ImageBlock({ data }: Props) {
  const unmaskedData = readFragment(ImageBlockFragment, data);

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <ResponsiveImage 
          data={unmaskedData.asset.responsiveImage} 
          className="rounded-lg"
        />
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {unmaskedData.asset.title}
        </p>
      </CardContent>
    </Card>
  );
}
