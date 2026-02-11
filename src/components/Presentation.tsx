"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "@/data/slides";
import Slide from "./Slide";

export default function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= slides.length) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;

  return (
    <div className="h-dvh w-screen flex flex-col overflow-hidden bg-white">
      {/* Slide Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <Slide
            key={slides[currentIndex].id}
            slide={slides[currentIndex]}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="shrink-0 bg-white border-t border-primary/10 px-4 py-3 flex items-center justify-between z-30">
        {/* Prev Button */}
        <button
          onClick={goPrev}
          disabled={isFirst}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold transition-all ${
            isFirst
              ? "text-gray-300 cursor-not-allowed"
              : "text-primary hover:bg-primary/10 active:bg-primary/20"
          }`}
        >
          <ChevronLeft size={20} />
          <span>もどる</span>
        </button>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-6 h-2.5 bg-primary"
                  : "w-2.5 h-2.5 bg-primary/25 hover:bg-primary/50"
              }`}
              aria-label={`スライド ${i + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goNext}
          disabled={isLast}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold transition-all ${
            isLast
              ? "text-gray-300 cursor-not-allowed"
              : "text-white bg-primary hover:bg-primary-dark active:bg-primary-dark shadow-md"
          }`}
        >
          <span>つぎへ</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
