"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimerProps {
  duration: number;
  onComplete: () => void;
  isAdminMode?: boolean;
}

export function Timer({ duration, onComplete, isAdminMode }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(false);
  }, [duration]);

  useEffect(() => {
    if (isAdminMode) {
      onComplete();
      return;
    }

    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete, isAdminMode]);

  const progress = ((duration - timeLeft) / duration) * 100;
  
  if (isAdminMode) return null;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="44"
            className="stroke-white/10 fill-none"
            strokeWidth="4"
          />
          <motion.circle
            cx="48"
            cy="48"
            r="44"
            className="stroke-[#D4AF37] fill-none"
            strokeWidth="4"
            strokeDasharray={276}
            strokeDashoffset={276 - (276 * progress) / 100}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 276 }}
            animate={{ strokeDashoffset: 276 - (276 * progress) / 100 }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <span className="text-2xl font-light text-[#D4AF37]">{timeLeft}</span>
      </div>

      <AnimatePresence>
        {!isRunning && timeLeft === duration && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsRunning(true)}
            className="px-6 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] text-sm hover:bg-[#D4AF37]/10 transition-colors uppercase tracking-widest"
          >
            Start Timer
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
