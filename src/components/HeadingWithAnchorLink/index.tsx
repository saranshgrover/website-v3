'use client';
import { cn } from '@/lib/utils';
import { render as structuredTextToPlainText } from 'datocms-structured-text-to-plain-text';
import type { Heading } from 'datocms-structured-text-utils';
import { Copy } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

type Props = {
  node: Heading;
  children: ReactNode;
};

const slugify = (str: string | null) =>
  str
    ? str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    : undefined;

export default function HeadingWithAnchorLink({ node, children }: Props) {
  const [copied, setCopied] = useState(false);
  const Tag = `h${node.level}` as const;
  const slug = slugify(structuredTextToPlainText(node));

  const headingClasses = {
    h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
    h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
    h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
    h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
    h6: 'scroll-m-20 text-base font-semibold tracking-tight',
  };

  const copyUrl = () => {
    const url = `${window.location.href.split('#')[0]}#${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  // dont underline the heading when it has an anchor link
  return slug ? (
    <Tag id={slug} tabIndex={-1} className={cn(headingClasses[Tag], 'group relative')}>
      <a href={`#${slug}`} className="subheading-anchor no-underline" onClick={copyUrl}>
        {children}
      </a>
      <span
        className={cn(
          'opacity-0 group-hover:opacity-100 ml-2 text-muted-foreground inline-flex items-center',
          copied ? 'animate-fade-out text-sm' : '',
        )}
      >
        {copied ? <Copy className="h-4 w-4" /> : '#'}
      </span>
    </Tag>
  ) : (
    <Tag className={headingClasses[Tag]}>{children}</Tag>
  );
}
