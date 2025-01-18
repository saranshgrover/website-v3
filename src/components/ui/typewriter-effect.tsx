"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.1,
          delay: stagger(0.1),
        }
      );
    }
  }, [isInView]);

  const renderWords = words.map((word, idx) => {
    return (
      <motion.span
        key={`${word}-${idx}`}
        className={cn("opacity-0", word.className)}
      >
        {word.text}&nbsp;
      </motion.span>
    );
  });

  return (
    <div className={cn("font-bold", className)} ref={scope}>
      {renderWords}
    </div>
  );
}; 