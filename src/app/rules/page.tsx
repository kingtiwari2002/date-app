"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const rules = [
  "One question at a time.",
  "No skipping.",
  "Honest answers."
];

export default function RulesScreen() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleBegin = () => {
    setIsNavigating(true);
    router.push("/experience");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white">
      <div className="w-full max-w-lg flex flex-col items-center text-center space-y-16 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-3xl md:text-5xl font-light text-[#D4AF37] mb-2 tracking-wide">Three Rules</h1>
          <p className="text-white/60 font-light max-w-sm mx-auto">
            This whole experience was made specially for you — a lot of thought and time went into it, and I really hope you like it.
          </p>
        </motion.div>

        <div className="space-y-8 w-full max-w-sm text-left">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.3 }}
              className="flex items-center space-x-4 text-xl md:text-2xl font-light"
            >
              <span className="text-[#D4AF37]">✔</span>
              <span>{rule}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="pt-8"
        >
          <Button size="lg" onClick={handleBegin} isLoading={isNavigating} className="min-w-[200px] bg-white text-black hover:bg-gray-200 shadow-none border-none">
            Let's begin.
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
