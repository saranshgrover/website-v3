'use client';
import { useEffect, useState } from 'react';

const COLORS = {
  white: 'bg-orange-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-500',
};

type FaceProps = {
  initialColor?: string;
};

const Face = ({ initialColor = COLORS.white }: FaceProps) => {
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    // Only randomize colors after initial render
    const colors = Object.values(COLORS);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, []);

  return (
    <div
      className={`${initialColor} rounded-sm border border-black/10 shadow-inner`}
      style={{
        opacity: 0.8,
      }}
    />
  );
};

export const RubiksCubeSkeleton = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-neutral-950">
      <div className="relative w-32 h-32 [transform-style:preserve-3d] animate-slow-spin">
        {/* Front face */}
        <div className="absolute w-full h-full grid grid-cols-3 gap-1 p-1 [transform:translateZ(4rem)]">
          {[...Array(9)].map((_, i) => (
            <Face key={`front-${i}`} initialColor={COLORS.white} />
          ))}
        </div>

        {/* Back face */}
        <div className="absolute w-full h-full grid grid-cols-3 gap-1 p-1 [transform:rotateY(180deg)_translateZ(4rem)]">
          {[...Array(9)].map((_, i) => (
            <Face key={`back-${i}`} initialColor={COLORS.white} />
          ))}
        </div>

        {/* Right face */}
        <div className="absolute w-full h-full grid grid-cols-3 gap-1 p-1 [transform:rotateY(90deg)_translateZ(4rem)]">
          {[...Array(9)].map((_, i) => (
            <Face key={`right-${i}`} initialColor={COLORS.white} />
          ))}
        </div>

        {/* Left face */}
        <div className="absolute w-full h-full grid grid-cols-3 gap-1 p-1 [transform:rotateY(-90deg)_translateZ(4rem)]">
          {[...Array(9)].map((_, i) => (
            <Face key={`left-${i}`} initialColor={COLORS.white} />
          ))}
        </div>

        {/* Top face */}
        <div className="absolute w-full h-full grid grid-cols-3 gap-1 p-1 [transform:rotateX(90deg)_translateZ(4rem)]">
          {[...Array(9)].map((_, i) => (
            <Face key={`top-${i}`} initialColor={COLORS.white} />
          ))}
        </div>

        {/* Bottom face */}
        <div className="absolute w-full h-full grid grid-cols-3 gap-1 p-1 [transform:rotateX(-90deg)_translateZ(4rem)]">
          {[...Array(9)].map((_, i) => (
            <Face key={`bottom-${i}`} initialColor={COLORS.white} />
          ))}
        </div>
      </div>
    </div>
  );
};
