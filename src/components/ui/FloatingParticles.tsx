"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate deterministic-looking random values on the client
  const dots = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  const curves = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    top: Math.random() * 60 + 10,
    delay: i * 2,
    duration: Math.random() * 5 + 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-black">
      {/* 1. Deep Ambient Orbs (Soft red blobs drifting) */}
      <motion.div
        animate={{
          x: ["-10vw", "10vw", "-10vw"],
          y: ["-10vh", "10vh", "-10vh"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#D4AF37]/15 blur-[120px] rounded-full mix-blend-screen"
      />
      
      <motion.div
        animate={{
          x: ["10vw", "-10vw", "10vw"],
          y: ["10vh", "-10vh", "10vh"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#AA8C2C]/40 blur-[150px] rounded-full mix-blend-screen"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-[#D4AF37]/10 blur-[100px] rounded-full mix-blend-screen"
      />

      {/* 2. Tiny Glowing Dots (Drifting upwards) */}
      {dots.map((p) => (
        <motion.div
          key={`dot-${p.id}`}
          initial={{ opacity: 0, y: "110vh", x: `${p.x}vw` }}
          animate={{
            opacity: [0, 0.6, 0.9, 0.4, 0],
            y: "-10vh",
            x: [`${p.x}vw`, `${p.x + (Math.random() * 6 - 3)}vw`, `${p.x}vw`]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute bg-[#F3E5AB] rounded-full shadow-[0_0_8px_#F3E5AB]"
          style={{ 
            width: p.size, 
            height: p.size,
          }}
        />
      ))}

      {/* 3. Elegant SVG Line Animations */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        {curves.map((c) => (
          <motion.path
            key={`curve-${c.id}`}
            d={`M -100 ${c.top}vh Q 25vw ${c.top + 20}vh, 50vw ${c.top}vh T 110vw ${c.top + 10}vh`}
            fill="transparent"
            stroke="url(#grad)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: c.duration,
              repeat: Infinity,
              delay: c.delay,
              ease: "easeInOut",
              times: [0, 0.4, 0.6, 1]
            }}
          />
        ))}
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AA8C2C" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
            <stop offset="100%" stopColor="#F3E5AB" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
