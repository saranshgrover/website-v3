'use client';
import { motion } from 'framer-motion';
import { BasicImageSkeleton } from './BasicImageSkeleton';

const coinVariants = {
  initial: { rotateY: 0 },
  hover: {
    rotateY: 360,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const glowVariants = {
  initial: { opacity: 0.5 },
  hover: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

export const CoinFlipSkeleton = () => {
  return (
    <>
      {/* Show basic skeleton on mobile */}
      <div className="block md:hidden">
        <BasicImageSkeleton type="coinFlip" />
      </div>

      {/* Show coin flip animation on larger screens */}
      <motion.div
        initial="initial"
        whileHover="hover"
        className="hidden md:flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] items-center justify-center relative perspective-1000"
      >
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-lg"
        />

        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="bg-neutral-800 p-3 rounded-lg shadow-xl">
            <div className="h-12 w-8 bg-neutral-700 mx-auto rounded-t-lg" />
            <div className="h-2 w-12 bg-green-500 mx-auto my-2" />
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-2 w-2 bg-neutral-600 rounded-full" />
              ))}
            </div>
          </div>

          <motion.div
            variants={coinVariants}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="text-2xl">₿</span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
