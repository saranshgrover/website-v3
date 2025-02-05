'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const DefaultSkeleton = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <motion.div 
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.3] relative group"
      initial={{ opacity: 0.5 }}
      whileHover={{ 
        opacity: 1,
        transition: { duration: 0.3 }
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }}
    >
      {/* Main container */}
      <div className="relative w-full h-full bg-black/5 dark:bg-black/40 backdrop-blur-sm rounded-xl p-6 overflow-hidden">
        {/* Magical floating orb that follows mouse */}
        <motion.div 
          className="absolute w-32 h-32 bg-gradient-radial from-blue-500/40 via-purple-500/30 to-transparent rounded-full blur-2xl pointer-events-none"
          animate={{
            x: mousePosition.x - 64,
            y: mousePosition.y - 64,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1
          }}
        />

        {/* Content skeleton */}
        <div className="relative space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-black/10 dark:bg-white/10 group-hover:bg-gradient-to-r from-blue-500/40 to-purple-500/40 transition-all duration-300" />
            <div className="h-4 w-1/4 rounded bg-black/10 dark:bg-white/10 group-hover:bg-gradient-to-r from-blue-500/40 to-purple-500/40 transition-all duration-300" />
          </div>

          {/* Body */}
          <div className="space-y-3">
            <div className="h-3 w-full rounded bg-black/10 dark:bg-white/10 group-hover:bg-gradient-to-r from-blue-500/30 to-purple-500/30 transition-all duration-500" />
            <div className="h-3 w-5/6 rounded bg-black/10 dark:bg-white/10 group-hover:bg-gradient-to-r from-blue-500/30 to-purple-500/30 transition-all duration-500 delay-75" />
            <div className="h-3 w-4/6 rounded bg-black/10 dark:bg-white/10 group-hover:bg-gradient-to-r from-blue-500/30 to-purple-500/30 transition-all duration-500 delay-150" />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/5">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="h-6 w-6 rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 transition-all duration-300"
                  style={{ transitionDelay: `${i * 75}ms` }}
                />
              ))}
            </div>
            <div className="h-6 w-20 rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-gradient-to-r from-blue-500/40 to-purple-500/40 transition-all duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 