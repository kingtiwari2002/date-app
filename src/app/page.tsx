"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { currentSession, isAdminMode, setAdminMode } = useAppStore();
  const [adminClickCount, setAdminClickCount] = useState(0);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const girlName = currentSession?.girlName || "Beautiful";

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleBegin = () => {
    setIsNavigating(true);
    router.push("/mood");
  };

  const handleHiddenTrigger = () => {
    const newCount = adminClickCount + 1;
    setAdminClickCount(newCount);
    if (newCount >= 5) {
      setShowAdminPrompt(true);
      setAdminClickCount(0);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "King@2002") {
      setAdminMode(true);
      setShowAdminPrompt(false);
      setIsNavigating(true);
      router.push("/admin");
    } else {
      alert("Incorrect Password");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden bg-black text-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-6 z-10"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full border-t-2 border-[#D4AF37]"
            />
            <p className="text-xl font-light tracking-wide text-white/70" onClick={handleHiddenTrigger}>
              Preparing today's adventure...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center justify-center text-center max-w-lg mx-auto z-10 space-y-12"
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-serif font-light text-glow" onClick={handleHiddenTrigger}>
                Hey, {girlName} <span className="text-red-500">❤️</span>
              </h1>
              
              <div className="space-y-4 text-lg md:text-xl text-white/80 font-light leading-relaxed">
                <p>I'm really glad you're here.</p>
                <p>I wanted our first meeting to be a little different.</p>
                <p>Instead of spending the evening deciding what to do next...</p>
                <p>I built something.</p>
                <p>This app, and every question in it, was made specially for you — a lot of thought and time went into it, and I really hope you like it.</p>
                <p className="pt-4 text-[#D4AF37]">
                  For the next hour,<br/>
                  you'll make a few choices,<br/>
                  answer a few questions,<br/>
                  and hopefully create a memory worth remembering.
                </p>
              </div>
            </div>

            <div className="pt-8 w-full flex flex-col items-center space-y-4">
              <p className="text-sm uppercase tracking-widest text-white/40">Ready?</p>
              <Button size="lg" onClick={handleBegin} isLoading={isNavigating} className="w-full sm:w-auto min-w-[200px]">
                Let's Begin
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login Prompt */}
      <AnimatePresence>
        {showAdminPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.form 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onSubmit={handleAdminLogin}
              className="glass p-8 rounded-3xl w-full max-w-sm space-y-6"
            >
              <h2 className="text-2xl font-light text-[#D4AF37] text-center">Admin Access</h2>
              <input
                type="password"
                autoFocus
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <div className="flex space-x-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowAdminPrompt(false)}>Cancel</Button>
                <Button type="submit" className="flex-1">Enter</Button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
