"use client";

import { motion } from "framer-motion";
import type { SlideData } from "@/data/slides";
import Character from "./Character";
import SpeakerNotes from "./SpeakerNotes";

interface SlideProps {
  slide: SlideData;
  direction: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

function LastSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
      {/* Decorative top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="w-24 h-1 bg-white/60 rounded-full mb-8"
      />

      {/* Main killer phrase */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-2xl md:text-4xl font-bold text-white text-center leading-relaxed"
      >
        {slide.title}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-6xl font-extrabold text-white text-center leading-tight mt-2"
      >
        {slide.content[0]}
        <br />
        {slide.content[1]}
      </motion.p>

      {/* Decorative bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-24 h-1 bg-white/60 rounded-full mt-8 mb-6"
      />

      {/* School name */}
      {slide.closingLabel && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg md:text-2xl text-white/80 font-medium tracking-wider"
        >
          {slide.closingLabel}
        </motion.p>
      )}
    </div>
  );
}

export default function Slide({ slide, direction }: SlideProps) {
  const isFirstSlide = slide.id === 1;
  const isLastSlide = slide.id === 10;

  const bgClass = isLastSlide
    ? "bg-gradient-to-br from-primary via-primary-dark to-[#B35A00]"
    : slide.bgAccent
      ? "bg-surface"
      : "bg-white";

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`absolute inset-0 ${bgClass} flex flex-col`}
    >
      {/* Speaker Notes Toggle */}
      <SpeakerNotes notes={slide.speakerNotes} transitionNote={slide.transitionNote} />

      {isLastSlide ? (
        <LastSlide slide={slide} />
      ) : (
        /* Normal Slide Content */
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-4 pt-6">
          {/* Subtitle */}
          {slide.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-primary font-bold tracking-widest mb-3 ${
                isFirstSlide ? "text-xl md:text-2xl" : "text-lg md:text-xl"
              }`}
            >
              {slide.subtitle}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`font-extrabold text-foreground text-center leading-tight ${
              isFirstSlide
                ? "text-4xl md:text-6xl mb-8"
                : "text-3xl md:text-5xl mb-6"
            }`}
          >
            {slide.title}
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-20 h-1 bg-primary rounded-full mb-6"
          />

          {/* Content Lines */}
          <div className="space-y-2 text-center max-w-2xl">
            {slide.content.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className={`leading-relaxed ${
                  line === "" ? "h-4" : ""
                } ${
                  isFirstSlide
                    ? "text-xl md:text-3xl text-foreground/80 font-medium"
                    : "text-lg md:text-2xl text-foreground/85"
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      )}

      {/* Character with bubble */}
      <Character position={slide.characterPosition} bubble={slide.bubble} />
    </motion.div>
  );
}
