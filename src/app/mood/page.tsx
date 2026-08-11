"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAppStore } from "@/store/useAppStore";
import { Check } from "lucide-react";

const moods = [
  {
    id: "flirty",
    emoji: "❤️",
    title: "Let's See Where This Goes",
    description: "Open to flirting, chemistry and seeing where today leads.",
  },
  {
    id: "chill",
    emoji: "😊",
    title: "Just Enjoy The Evening",
    description: "No expectations. Let's simply have a great evening.",
  },
  {
    id: "surprise",
    emoji: "😈",
    title: "Surprise Me",
    description: "I trust the experience. Let's see what happens.",
  },
];

export default function MoodScreen() {
  const router = useRouter();
  const { updateSession } = useAppStore();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleContinue = () => {
    if (selectedMood) {
      setIsNavigating(true);
      updateSession({ mood: selectedMood });
      router.push("/adventure");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative bg-black text-white">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg z-10 flex flex-col items-center text-center space-y-12"
      >
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest text-[#D4AF37]">Step 1</p>
          <h1 className="text-3xl md:text-4xl font-light text-glow">Set The Mood</h1>
          <p className="text-white/60 font-light">How are we feeling today?</p>
        </div>

        <div className="w-full space-y-4">
          {moods.map((mood, i) => {
            const isSelected = selectedMood === mood.id;
            return (
              <Card
                key={mood.id}
                variant={isSelected ? "glass-gold" : "glass"}
                onClick={() => setSelectedMood(mood.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: selectedMood && !isSelected ? 0.4 : 1, 
                  x: 0,
                  scale: isSelected ? 1.02 : 1
                }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`cursor-pointer relative overflow-hidden group ${
                  !selectedMood || isSelected ? 'hover:bg-white/10' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <span className="text-4xl">{mood.emoji}</span>
                  <div className="flex-1 text-left">
                    <h3 className={`text-xl font-medium mb-1 transition-colors ${isSelected ? 'text-[#D4AF37]' : 'text-white'}`}>
                      {mood.title}
                    </h3>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      {mood.description}
                    </p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black"
                    >
                      <Check size={18} strokeWidth={3} />
                    </motion.div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: selectedMood ? 1 : 0, y: selectedMood ? 0 : 20 }}
          className="pt-4"
        >
          <Button size="lg" onClick={handleContinue} isLoading={isNavigating} className="min-w-[200px]">
            Continue
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
