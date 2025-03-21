'use client';
import { cn } from '@/lib/utils';
import { Bitcoin, Cuboid, Map, Search, Shirt, Smartphone, Store } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import { CoinFlipSkeleton } from './skeletons/CoinFlipSkeleton';
import { DataVisualizationSkeleton } from './skeletons/DataVisualizationSkeleton';
import { DefaultSkeleton } from './skeletons/DefaultSkeleton';
import { RubiksCubeSkeleton } from './skeletons/RubiksCubeSkeleton';

const items = [
  {
    title: 'CoinFlip',
    description:
      'I lead Web Development for CoinFlip, including the CoinFlip Website, CoinFlip Locator, and CoinFlip Preferred for over 300,000 crypto customers',
    header: <CoinFlipSkeleton />,
    className: 'md:col-span-3',
    icon: <Bitcoin className="h-4 w-4 text-neutral-500" />,
    slug: 'coinflip',
    href: 'https://www.coinflip.tech',
  },
  {
    title: 'Soliyarn Smart Wearables',
    description:
      'Designing and developing a web portal for real-time visualization of sensor data from smart garments',
    header: <DataVisualizationSkeleton />,
    icon: <Shirt className="h-4 w-4 text-neutral-500" />,
    className: 'md:col-span-2',
    slug: 'soliyarn',
    href: 'https://soliyarn.com',
  },
  {
    title: 'Cubing Wrapped',
    description:
      'Akin to Spotify Wrapped for Speedcubing. With an accessible design and intuitive interface, it offered visually captivating end-of-year stats, fostering community excitement.',
    header: <RubiksCubeSkeleton />,
    icon: <Cuboid className="h-4 w-4 text-neutral-500" />,
    className: 'md:col-span-1',
    slug: 'cubing_wrapped',
  },
  {
    title: 'Drop Off Table',
    description:
      'A progressive web app providing live event feedback and management tools for competition organizers',
    header: <DefaultSkeleton />,
    icon: <Smartphone className="h-4 w-4 text-neutral-500" />,
    slug: 'drop-off-table',
    href: 'https://dropofftable.com',
  },
  {
    title: 'Mango Lakay',
    description:
      'Redesigning an online directory platform to better serve Haitian vendors and promote economic growth',
    header: <DefaultSkeleton />,
    icon: <Store className="h-4 w-4 text-neutral-500" />,
    skeleton: 'default',
    className: 'md:col-span-2',
    slug: 'mango_lakay',
    href: 'https://www.mangolakay.com',
  },
  {
    title: 'WCA Website Usability',
    description:
      'A comprehensive usability analysis of the World Cube Association website, focusing on improving accessibility for new competitors',
    header: <RubiksCubeSkeleton />,
    icon: <Search className="h-4 w-4 text-neutral-500" />,
    slug: 'wca_usability',
    href: 'https://www.worldcubeassociation.org',
  },
  {
    title: 'Politech',
    description:
      'Developing visualizations and interfaces for automated redistricting analysis and comparison',
    header: <DataVisualizationSkeleton />,
    icon: <Map className="h-4 w-4 text-neutral-500" />,
    slug: 'politech',
    href: 'https://www.stonybrook.edu/commcms/vertically-integrated-projects/teams/_team_page/team_page.php?team=PoliTech',
  },

  {
    title: 'Cubing at Home',
    description:
      'An online platform for organizing and participating in virtual speedcubing competitions',
    header: <RubiksCubeSkeleton />,
    icon: <Cuboid className="h-4 w-4 text-neutral-500" />,
    slug: 'cah',
    href: 'https://cubingathome.netlify.app/',
  },
];

export default function ProjectsGrid() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header || <DefaultSkeleton />}
          className={cn('[&>p:text-lg]', item.className)}
          icon={item.icon}
          href={item.href}
        />
      ))}
    </BentoGrid>
  );
}
