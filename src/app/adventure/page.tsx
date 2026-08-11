"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";

const availableAdventures = [
  { id: "drive", icon: "🚗", title: "Long Drive" },
  { id: "cafe", icon: "☕", title: "Café" },
  { id: "restaurant", icon: "🍽️", title: "Restaurant" },
  { id: "walk", icon: "🚶", title: "Night Walk" }
];

export default function AdventureScreen() {
  const router = useRouter();
  const { currentSession, updateSession } = useAppStore();
  
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Determine the chosen adventure (from session or default)
    const chosenTitle = currentSession?.adventure || "Long Drive";
    const chosenAdv = availableAdventures.find(a => a.title === chosenTitle) || availableAdventures[0];
    
    // Pick 2 other random adventures
    const others = availableAdventures.filter(a => a.id !== chosenAdv.id).sort(() => 0.5 - Math.random()).slice(0, 2);
    
    setCards([chosenAdv, others[0], others[1]]);
  }, [currentSession]);

  const handleCardClick = (index: number) => {
    if (selectedCardIndex !== null) return;
    
    setSelectedCardIndex(index);
    
    // The clicked card becomes the chosen one
    const newCards = [...cards];
    const chosen = newCards[0]; // The one we pre-selected as the outcome
    
    // Swap chosen into the clicked position
    newCards[0] = newCards[index];
    newCards[index] = chosen;
    setCards(newCards);
    
    // Trigger reveals
    setTimeout(() => {
      setRevealed(true);
    }, 800);
  };

  const handleAccept = () => {
    setIsNavigating(true);
    updateSession({ adventure: cards[selectedCardIndex!].title });
    router.push("/rules");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative bg-black text-white overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg z-10 flex flex-col items-center text-center space-y-12">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="picking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <p className="text-sm uppercase tracking-widest text-[#D4AF37]">Step 2</p>
              <h1 className="text-3xl md:text-4xl font-light text-glow">Choose The Adventure</h1>
              <p className="text-white/60 font-light">Pick a card to reveal today's setting.</p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-4xl font-light text-glow">Looks like today has chosen...</h1>
              <p className="text-2xl font-medium text-[#D4AF37]">
                {cards[selectedCardIndex!].icon} {cards[selectedCardIndex!].title}
              </p>
              <p className="text-white/60 font-light mt-4">
                Sometimes the best conversations don't happen across a table.<br/>
                Let's see where this goes.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center space-x-4 w-full">
          {[0, 1, 2].map((i) => {
            const isSelected = selectedCardIndex === i;
            const isRevealed = revealed || isSelected;
            
            return (
              <motion.div
                key={i}
                onClick={() => handleCardClick(i)}
                className="relative perspective-1000 w-24 h-36 md:w-32 md:h-48 cursor-pointer"
                whileHover={selectedCardIndex === null ? { y: -10 } : {}}
              >
                <motion.div
                  className="w-full h-full preserve-3d"
                  animate={{ rotateY: isRevealed ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
                >
                  {/* Front (Hidden) */}
                  <div className="absolute inset-0 backface-hidden glass rounded-2xl flex items-center justify-center border border-white/10 hover:border-[#D4AF37]/50 transition-colors">
                    <span className="text-3xl font-light text-[#D4AF37]">?</span>
                  </div>
                  
                  {/* Back (Revealed) */}
                  <div className="absolute inset-0 backface-hidden glass-gold rounded-2xl flex flex-col items-center justify-center rotate-y-180 border border-[#D4AF37]/30">
                    <span className="text-3xl md:text-4xl mb-2">{cards[i]?.icon}</span>
                    <span className="text-xs md:text-sm text-center font-medium px-2">{cards[i]?.title}</span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center text-black">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
          className="pt-8"
        >
          <Button size="lg" onClick={handleAccept} isLoading={isNavigating} className="min-w-[200px]" disabled={!revealed}>
            Accept Adventure
          </Button>
        </motion.div>
      </div>
      
      {/* Required CSS for 3D flip */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </main>
  );
}
