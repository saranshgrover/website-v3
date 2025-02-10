import { cn } from '@/lib/utils';
import Link from 'next/link';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto p-4',
        className,
      )}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: BentoGridItemProps) => {
  const content = (
    <>
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-300 ease-out relative z-10">
        <div className="text-neutral-600 dark:text-neutral-200 group-hover/bento:scale-105 transition duration-300">
          {icon}
        </div>
        <div className="font-sans font-bold text-neutral-800 dark:text-neutral-100 mb-2 mt-2 text-lg group-hover/bento:text-neutral-950 dark:group-hover/bento:text-white transition duration-300">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300 group-hover/bento:text-neutral-700 dark:group-hover/bento:text-neutral-200 transition duration-300">
          {description}
        </div>
      </div>
    </>
  );

  const wrapperClasses = cn(
    'row-span-1 rounded-xl group/bento hover:shadow-2xl hover:scale-[1.02] transition duration-300 ease-out shadow-xl dark:shadow-none p-6 dark:bg-zinc-900 dark:border-white/[0.2] bg-white border-2 border-neutral-200 dark:border-zinc-800 justify-between flex flex-col space-y-4 relative overflow-hidden hover:border-neutral-300 dark:hover:border-zinc-600',
    'before:absolute before:inset-0 before:bg-gradient-to-br before:from-neutral-100 before:to-neutral-50 dark:before:from-zinc-800 dark:before:to-zinc-900 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:-z-10',
    className
  );

  if (href) {
    const isExternalLink = href.startsWith('http');
    const LinkComponent = isExternalLink ? 'a' : Link;
    const linkProps = isExternalLink
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <LinkComponent
        href={href}
        className={wrapperClasses}
        {...linkProps}
      >
        {content}
      </LinkComponent>
    );
  }

  return <div className={wrapperClasses}>{content}</div>;
};
