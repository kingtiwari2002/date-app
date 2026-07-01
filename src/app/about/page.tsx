"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md z-10 flex flex-col items-center text-center space-y-10 glass p-10 rounded-3xl"
      >
        <h1 className="text-2xl uppercase tracking-widest text-[#D4AF37] font-medium">About</h1>
        
        <div className="space-y-6 text-white/80 font-light leading-relaxed">
          <p>Designed and Built by <strong>Rahul</strong>.</p>
          <p>This experience wasn't purchased.</p>
          <p>It wasn't downloaded.</p>
          <p>It wasn't generated from a template.</p>
          <p className="text-white">
            It was imagined, designed and built by Rahul to make first meetings feel more memorable.
          </p>
        </div>

        <div className="pt-8 w-full">
          <Button variant="secondary" onClick={() => router.push("/")} className="w-full">
            Return Home
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
