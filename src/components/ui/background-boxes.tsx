'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BoxesProps = {
  className?: string;
  variant?: 'none' | 'scroll' | 'click' | 'random';
  randomBoxCount?: number; // Number of boxes to randomly highlight
};

export const BoxesCore = ({ 
  className, 
  variant = 'none', 
  randomBoxCount = 30,
  ...rest 
}: BoxesProps) => {
  // Memoize the grid dimensions to avoid recalculation
  const ROWS = 150;
  const COLS = 100;
  
  const colors = useMemo(() => [
    '--white-300',
    '--red-500',
    '--blue-500',
    '--orange-500',
    '--green-500',
    '--yellow-300',
  ], []);

  // State to store persistent colors
  const [persistentColors, setPersistentColors] = useState<{ [key: string]: string }>({});

  // Memoize the getRandomColor function
  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  // Initialize random boxes when variant is 'random'
  useEffect(() => {
    if (variant === 'random') {
      const initialColors: { [key: string]: string } = {};
      const totalBoxes = ROWS * COLS;
      const boxIndices = new Set<number>();

      // Generate unique random box indices
      while (boxIndices.size < randomBoxCount) {
        boxIndices.add(Math.floor(Math.random() * totalBoxes));
      }

      // Set colors for random boxes
      boxIndices.forEach((index) => {
        const row = Math.floor(index / COLS);
        const col = index % COLS;
        initialColors[`${row}-${col}`] = `var(${getRandomColor()})`;
      });

      setPersistentColors(initialColors);
    }
  }, [variant, randomBoxCount, ROWS, COLS, getRandomColor]);

  const handleInteraction = useCallback((key: string) => {
    if (variant === 'none') return;
    
    setPersistentColors((prev) => {
      const newColors = { ...prev };
      if (newColors[key]) {
        delete newColors[key]; // Toggle off if already colored
      } else {
        newColors[key] = `var(${getRandomColor()})`; // Toggle on with new color
      }
      return newColors;
    });
  }, [variant, getRandomColor]);

  // Memoize the rows array
  const rows = useMemo(() => Array.from({ length: ROWS }, (_, i) => i), [ROWS]);
  const cols = useMemo(() => Array.from({ length: COLS }, (_, i) => i), [COLS]);

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        'absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-[100vw] h-screen pointer-events-none',
        className
      )}
      {...rest}
    >
      {rows.map((i) => (
        <motion.div 
          key={`row-${i}`} 
          className="w-16 h-8 border-l border-slate-700 relative pointer-events-auto"
        >
          {cols.map((j) => {
            const boxKey = `${i}-${j}`;
            const shouldRenderPlus = j % 2 === 0 && i % 2 === 0;
            
            return (
              <motion.div
                whileHover={{
                  backgroundColor: `var(${getRandomColor()})`,
                  transition: { duration: 0 },
                }}
                animate={{
                  backgroundColor: persistentColors[boxKey] || '',
                  transition: { duration: 2 },
                }}
                onClick={() => handleInteraction(boxKey)}
                key={`${boxKey}`}
                className="w-16 h-8 border-r border-t border-slate-700 relative cursor-crosshair"
              >
                {shouldRenderPlus && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
