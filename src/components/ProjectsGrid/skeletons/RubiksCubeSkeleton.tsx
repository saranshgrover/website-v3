'use client';
import { motion } from 'framer-motion';

const cubeVariants = {
  initial: {
    rotateX: -20,
    rotateY: -20,
  },
  hover: {
    rotateX: [0, 360],
    rotateY: [0, 360],
    transition: {
      duration: 5,
      ease: 'linear',
    },
  },
};

const generateCubieColors = (baseColor: string) => {
  return [...Array(9)].map(() => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-400',
      'bg-white',
      'bg-orange-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  });
};

interface FaceProps {
  baseColor: string;
  rotate?: string;
  translate?: string;
}

const Face = ({ baseColor, rotate = '', translate = '' }: FaceProps) => {
  const colors = generateCubieColors(baseColor);
  return (
    <div
      className={`grid grid-cols-3 gap-0.5 absolute w-24 h-24 ${rotate} ${translate}`}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      {colors.map((color, i) => (
        <div
          key={i}
          className={`${color} rounded-sm border border-black/10 shadow-inner`}
          style={{ aspectRatio: '1' }}
        />
      ))}
    </div>
  );
};

export const RubiksCubeSkeleton = () => {
  return (
    <motion.div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] items-center justify-center perspective-1000"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        variants={cubeVariants}
        className="relative w-24 h-24"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <Face baseColor="bg-red-500" translate="transform translateZ-[48px]" />
        <Face
          baseColor="bg-blue-500"
          rotate="rotateY(90deg)"
          translate="transform translateX-[48px]"
        />
        <Face
          baseColor="bg-green-500"
          rotate="rotateY(-90deg)"
          translate="transform translateX-[-48px]"
        />
        <Face
          baseColor="bg-yellow-400"
          rotate="rotateX(90deg)"
          translate="transform translateY-[-48px]"
        />
        <Face
          baseColor="bg-white"
          rotate="rotateX(-90deg)"
          translate="transform translateY-[48px]"
        />
        <Face
          baseColor="bg-orange-500"
          translate="transform translateZ-[-48px]"
          rotate="rotateY(180deg)"
        />
      </motion.div>
    </motion.div>
  );
}; 