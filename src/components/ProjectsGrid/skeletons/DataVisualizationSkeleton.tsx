'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export const DataVisualizationSkeleton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full min-h-[6rem] rounded-xl bg-gray-100/80 dark:bg-gray-800/50 p-4 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Graph Background Grid */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-gray-200 dark:border-gray-700/50" />
        ))}
      </div>

      {/* Animated Line Graph */}
      <div className="relative h-full w-full">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* Gradient Fill */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                className="text-blue-500/20 dark:text-blue-400/20"
                style={{ stopColor: 'currentColor' }}
              />
              <stop
                offset="100%"
                className="text-transparent"
                style={{ stopColor: 'currentColor' }}
              />
            </linearGradient>
          </defs>

          {/* Line Path */}
          <motion.path
            d="M0,50 Q25,20 50,50 T100,50"
            fill="none"
            className="stroke-blue-500 dark:stroke-blue-400"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />

          {/* Animated Fill Area */}
          <motion.path
            d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z"
            fill="url(#gradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </div>
    </div>
  );
};

export default DataVisualizationSkeleton;
