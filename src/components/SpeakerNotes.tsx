"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNote, X } from "lucide-react";

interface SpeakerNotesProps {
  notes: string;
}

export default function SpeakerNotes({ notes }: SpeakerNotesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-3 right-3 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
        aria-label="スピーカーノート"
      >
        <StickyNote size={20} className="text-primary" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-[280px] bg-white/95 backdrop-blur-sm shadow-2xl z-20 flex flex-col"
          >
            <div className="flex items-center justify-between p-3 border-b border-primary/20">
              <span className="text-sm font-bold text-primary">カンペ</span>
              <button onClick={() => setIsOpen(false)} aria-label="閉じる">
                <X size={18} className="text-muted" />
              </button>
            </div>
            <div className="p-4 text-sm leading-relaxed text-foreground/80 overflow-y-auto flex-1">
              {notes}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
