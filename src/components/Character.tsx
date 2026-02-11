"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface CharacterProps {
  position: "left" | "right";
  bubble: string;
}

export default function Character({ position, bubble }: CharacterProps) {
  const isRight = position === "right";

  return (
    <div
      className={`absolute bottom-0 ${isRight ? "right-3" : "left-3"} z-10 pointer-events-none flex flex-col items-center`}
    >
      {/* Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4, type: "spring", bounce: 0.5 }}
        className={`relative bg-white border-2 border-primary rounded-2xl px-5 py-3 shadow-md mb-1 max-w-[280px]`}
      >
        <p className="text-base md:text-lg font-bold text-primary text-center leading-snug">
          {bubble}
        </p>
        {/* Triangle pointer */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary" />
        <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-white" />
      </motion.div>

      {/* Character Image */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, type: "spring", bounce: 0.4 }}
      >
        <Image
          src={isRight ? "/orange_right.jpg" : "/orange_left.jpg"}
          alt="ピコ キャラクター"
          width={150}
          height={150}
          className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] object-contain"
          priority
        />
      </motion.div>
    </div>
  );
}
