import VideoPlayer, { VideoPlayerFragment } from '@/components/VideoPlayer';
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
export const VideoBlockFragment = graphql(
  /* GraphQL */ `
    fragment VideoBlockFragment on VideoBlockRecord {
      asset {
        title
        ...VideoPlayerFragment
      }
    }
  `,
  [VideoPlayerFragment],
);

type Props = {
  data: FragmentOf<typeof VideoBlockFragment>;
};

export default function VideoBlock({ data }: Props) {
  const unmaskedData = readFragment(VideoBlockFragment, data);

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <div className="rounded-lg overflow-hidden">
          <VideoPlayer data={unmaskedData.asset} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground text-center">
          {unmaskedData.asset.title}
        </p>
      </CardContent>
    </Card>
  );
}
