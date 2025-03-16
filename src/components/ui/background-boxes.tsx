'use client';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BoxesProps = {
  className?: string;
  variant?: 'none' | 'click' | 'random';
};

// Polyfill for requestIdleCallback
const requestIdleCallback =
  typeof window !== 'undefined'
    ? window.requestIdleCallback ||
    ((cb: any) => setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 1))
    : (cb: any) => setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 }), 1);

const BoxesCore = ({ className, variant = 'click', ...rest }: BoxesProps) => {
  const [isClient, setIsClient] = useState(false);
  const [renderedRows, setRenderedRows] = useState<number[]>([]);
  const requestRef = useRef<number | undefined | NodeJS.Timeout>();

  // Adjust grid size based on device
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const rows = new Array(isMobile ? 50 : 100).fill(1);
  const cols = new Array(isMobile ? 40 : 80).fill(1);

  const colors = [
    '--sky-300',
    '--pink-300',
    '--green-300',
    '--yellow-300',
    '--red-300',
    '--purple-300',
    '--blue-300',
    '--indigo-300',
    '--violet-300',
  ];

  const [persistentColors, setPersistentColors] = useState<{ [key: string]: string }>({});

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  // Initialize random boxes when variant is 'random'
  useEffect(() => {
    if (variant === 'random' && Object.keys(persistentColors).length === 0) {
      const initialColors: { [key: string]: string } = {};
      const totalBoxes = rows.length * cols.length;
      const randomBoxCount = Math.floor(totalBoxes * 0.1);
      const boxIndices = new Set<number>();

      while (boxIndices.size < randomBoxCount) {
        boxIndices.add(Math.floor(Math.random() * totalBoxes));
      }

      boxIndices.forEach((index) => {
        const row = Math.floor(index / cols.length);
        const col = index % cols.length;
        initialColors[`${row}-${col}`] = `var(${getRandomColor()})`;
      });

      setPersistentColors(initialColors);
    }
  }, [variant]);

  // Progressive rendering for mobile
  useEffect(() => {
    setIsClient(true);

    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      setRenderedRows(rows.map((_, i) => i));
      return;
    }

    let currentRow = 0;
    const BATCH_SIZE = 10; // Render 10 rows at a time

    const renderNextBatch = () => {
      requestRef.current = requestIdleCallback(() => {
        const nextRows: number[] = [];
        for (let i = 0; i < BATCH_SIZE && currentRow < rows.length; i++) {
          nextRows.push(currentRow);
          currentRow++;
        }

        setRenderedRows((prev) => [...prev, ...nextRows]);

        if (currentRow < rows.length) {
          renderNextBatch();
        }
      });
    };

    renderNextBatch();

    return () => {
      if (requestRef.current) {
        cancelIdleCallback(requestRef.current as number);
      }
    };
  }, []);

  const handleClick = useCallback(
    (key: string) => {
      if (variant === 'none') return;

      setPersistentColors((prev) => {
        const newColors = { ...prev };
        if (newColors[key]) {
          delete newColors[key];
        } else {
          newColors[key] = `var(${getRandomColor()})`;
        }
        return newColors;
      });
    },
    [variant, getRandomColor],
  );

  // Optimize animations for mobile
  const getAnimationProps = useCallback(() => {
    if (isMobile) {
      return {
        transition: { duration: 0.1 }, // Faster transitions
        animate: { opacity: 1 },
      };
    }
    return {
      transition: { duration: 0.2 },
      animate: { opacity: 1 },
    };
  }, [isMobile]);

  // Measure specific operations
  const measureOperation = (operationName: string) => {
    performance.mark(`${operationName}-start`);
    // ... operation code ...
    performance.mark(`${operationName}-end`);
    performance.measure(operationName, `${operationName}-start`, `${operationName}-end`);
  };

  if (!isClient) {
    return null; // Prevent SSR flash
  }

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        'fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] z-0',
        'will-change-transform transform-gpu',
        'md:w-[200%] md:h-[200%] md:left-1/4 md:p-4 md:-top-1/4',
        className,
      )}
      {...rest}
    >
      {renderedRows.map((i) => (
        <motion.div
          key={`row${i}`}
          className="w-16 h-8 border-l border-slate-700 relative"
          initial={{ opacity: 0 }}
          {...getAnimationProps()}
        >
          {cols.map((_, j) => {
            const boxKey = `${i}-${j}`;
            const hasColor = persistentColors[boxKey];

            return (
              <motion.div
                key={`col${j}`}
                onClick={() => handleClick(boxKey)}
                className="w-16 h-8 border-r border-t border-slate-700 relative cursor-crosshair"
                style={{
                  backgroundColor: hasColor || undefined,
                }}
                whileHover={{
                  backgroundColor: variant === 'none' ? undefined : `var(${getRandomColor()})`,
                  transition: { duration: 0 },
                }}
                {...(hasColor && {
                  animate: {
                    backgroundColor: hasColor,
                    transition: { duration: 2 },
                  },
                })}
              >
                {j % 2 === 0 && i % 2 === 0 ? (
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
                ) : null}
              </motion.div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};

// Wrap with React.memo with custom comparison
export const Boxes = React.memo(BoxesCore, (prevProps, nextProps) => {
  return prevProps.variant === nextProps.variant && prevProps.className === nextProps.className;
});
