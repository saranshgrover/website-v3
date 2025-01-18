"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BoxesProps = {
  className?: string;
  variant?: "none" | "scroll" | "click";
};

export const BoxesCore = ({ className, variant = "none", ...rest }: BoxesProps) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  const colors = [
    "--white-300",
    "--red-500",
    "--blue-500",
    "--orange-500",
    "--green-500",
    "--yellow-300",
  ];

  // State to store persistent colors
  const [persistentColors, setPersistentColors] = useState<{ [key: string]: string }>({});

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleInteraction = (key: string) => {
    if (variant === "none") return;
    setPersistentColors((prev) => ({
      ...prev,
      [key]: `var(${getRandomColor()})`,
    }));
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8  border-l  border-slate-700 relative"
        >
          {cols.map((_, j) => {
            const boxKey = `${i}-${j}`;
            return (
              <motion.div
                whileHover={{
                  backgroundColor:  `var(${getRandomColor()})`,
                  transition: { duration: 0 },
                }}
                animate={{
                  backgroundColor: persistentColors[boxKey],
                  transition: { duration: 2 },
                }}
                key={`col` + j}
                className="w-16 h-8  border-r border-t border-slate-700 relative"
                onClick={() => variant === "click" && handleInteraction(boxKey)}
                onViewportEnter={() => variant === "scroll" && handleInteraction(boxKey)}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
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

export const Boxes = React.memo(BoxesCore);
