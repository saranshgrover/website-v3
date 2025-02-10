'use client';

export type SkeletonType = 'default' | 'rubiks' | 'dataViz' | 'coinFlip';

interface BasicImageSkeletonProps {
  type: SkeletonType;
}

export const BasicImageSkeleton = ({ type }: BasicImageSkeletonProps) => {
  return (
    <div className="w-full h-full min-h-[6rem] rounded-xl bg-black/5 dark:bg-white/5 p-4 overflow-hidden">
      <div className="h-full w-full flex items-center justify-center">
        {type === 'default' && (
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 text-black/20 dark:text-white/20"
            fill="currentColor"
          >
            <rect x="10" y="10" width="80" height="80" rx="8" />
            <rect x="25" y="40" width="50" height="4" rx="2" />
            <rect x="25" y="50" width="40" height="4" rx="2" />
            <rect x="25" y="60" width="30" height="4" rx="2" />
          </svg>
        )}

        {type === 'rubiks' && (
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 text-black/20 dark:text-white/20"
            fill="currentColor"
          >
            <rect x="20" y="20" width="20" height="20" />
            <rect x="40" y="20" width="20" height="20" />
            <rect x="60" y="20" width="20" height="20" />
            <rect x="20" y="40" width="20" height="20" />
            <rect x="40" y="40" width="20" height="20" />
            <rect x="60" y="40" width="20" height="20" />
            <rect x="20" y="60" width="20" height="20" />
            <rect x="40" y="60" width="20" height="20" />
            <rect x="60" y="60" width="20" height="20" />
          </svg>
        )}

        {type === 'dataViz' && (
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 text-black/20 dark:text-white/20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path d="M10,90 L90,90" /> {/* x-axis */}
            <path d="M10,10 L10,90" /> {/* y-axis */}
            <path d="M10,70 C30,30 50,60 90,20" /> {/* graph line */}
          </svg>
        )}

        {type === 'coinFlip' && (
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 text-black/20 dark:text-white/20"
            fill="currentColor"
          >
            <circle cx="50" cy="50" r="40" />
            <text
              x="50"
              y="65"
              fontSize="40"
              textAnchor="middle"
              fill="white"
              className="font-bold"
            >
              ₿
            </text>
          </svg>
        )}
      </div>
    </div>
  );
};
