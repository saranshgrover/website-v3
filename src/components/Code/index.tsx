'use client';

import type { Code as CodeNode } from 'datocms-structured-text-utils';
import hljs from 'highlight.js';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  node: CodeNode;
};

export default function Code({ node }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.dataset.highlighted) {
      return;
    }

    hljs.highlightElement(ref.current);
  }, []);

  return (
    <pre
      className={cn(
        'rounded-lg border bg-muted px-4 py-3 font-mono text-sm',
        `language-${node.language}`,
      )}
    >
      <code ref={ref} className="relative">
        {node.code}
      </code>
    </pre>
  );
}
