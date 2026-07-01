"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function EndScreen() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[#D4AF37]/10 blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="w-full max-w-lg z-10 flex flex-col items-center text-center space-y-12"
      >
        <div className="text-5xl text-red-500">❤️</div>
        
        <h1 className="text-3xl md:text-5xl font-light font-serif text-glow tracking-wide">
          Our First Adventure
        </h1>

        <div className="space-y-6 text-lg md:text-xl text-white/80 font-light leading-relaxed">
          <p>Whether tonight ends here,</p>
          <p>or becomes the first chapter of something bigger,</p>
          <p>I'm genuinely glad you were part of it.</p>
        </div>

        <p className="text-2xl font-light text-[#D4AF37] italic pt-4">
          Thank you for making this evening memorable.
        </p>
        <p className="text-lg text-white/60 font-light">
          — Rahul
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="pt-12 w-full flex flex-col items-center space-y-4"
        >
          <Button variant="outline" onClick={() => router.push("/about")}>
            About This Experience
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
