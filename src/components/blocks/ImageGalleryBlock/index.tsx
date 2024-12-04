import ResponsiveImage, { ResponsiveImageFragment } from '@/components/ResponsiveImage';
import { type FragmentOf, graphql, readFragment } from '@/lib/datocms/graphql';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
export const ImageGalleryBlockFragment = graphql(
  /* GraphQL */ `
    fragment ImageGalleryBlockFragment on ImageGalleryBlockRecord {
      assets {
        id
        title
        responsiveImage(imgixParams: { w: 300 }, sizes: "300px") {
          ...ResponsiveImageFragment
        }
      }
    }
  `,
  [ResponsiveImageFragment],
);

type Props = {
  data: FragmentOf<typeof ImageGalleryBlockFragment>;
};

export default function ImageGalleryBlock({ data }: Props) {
  const unmaskedData = readFragment(ImageGalleryBlockFragment, data);

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-6 p-6">
        {unmaskedData.assets.map((asset) => (
          <Card key={asset.id} className="w-[300px] shrink-0 shadow-none border-none">
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <ResponsiveImage 
                  data={asset.responsiveImage} 
                  className="rounded-md w-full h-auto object-cover"
                  pictureClassName="w-full"
                />
              </div>
              <p className="mt-3 text-sm text-center text-muted-foreground">
                {asset.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
