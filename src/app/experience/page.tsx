"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Timer } from "@/components/ui/Timer";
import { useAppStore } from "@/store/useAppStore";
import questionsData from "@/data/questions.json";

const transitionMessages = [
  "Interesting...",
  "Didn't expect that...",
  "Nice answer...",
  "Your turn...",
  "Let's continue..."
];

export default function ExperienceScreen() {
  const router = useRouter();
  const { currentSession, updateSession, isAdminMode } = useAppStore();
  
  const [chapterIndex, setChapterIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(-1); // -1 means chapter intro, questions.length means mission
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMsg, setTransitionMsg] = useState("");
  const [timerComplete, setTimerComplete] = useState(isAdminMode);

  const pack = questionsData;
  const chapter = pack.chapters[chapterIndex];
  
  useEffect(() => {
    if (currentSession) {
      setChapterIndex(currentSession.currentChapterIndex || 0);
      setQuestionIndex(currentSession.currentQuestionIndex || -1);
    }
  }, []);

  const saveProgress = (cIdx: number, qIdx: number) => {
    updateSession({ currentChapterIndex: cIdx, currentQuestionIndex: qIdx });
  };

  const handleNext = () => {
    if (questionIndex >= 0 && questionIndex < chapter.questions.length - 1) {
      // Show transition then next question
      showTransition();
      setTimeout(() => {
        setQuestionIndex(q => q + 1);
        setTimerComplete(isAdminMode);
        saveProgress(chapterIndex, questionIndex + 1);
      }, 2000);
    } else if (questionIndex === chapter.questions.length - 1) {
      // Go to mission
      setQuestionIndex(chapter.questions.length);
      saveProgress(chapterIndex, chapter.questions.length);
    } else if (questionIndex === chapter.questions.length) {
      // Next chapter or end
      if (chapterIndex < pack.chapters.length - 1) {
        setChapterIndex(c => c + 1);
        setQuestionIndex(-1);
        saveProgress(chapterIndex + 1, -1);
      } else {
        router.push("/end");
      }
    } else if (questionIndex === -1) {
      // Start questions for chapter
      setQuestionIndex(0);
      setTimerComplete(isAdminMode);
      saveProgress(chapterIndex, 0);
    }
  };

  const showTransition = () => {
    setTransitionMsg(transitionMessages[Math.floor(Math.random() * transitionMessages.length)]);
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 2000);
  };

  if (!chapter) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isTransitioning ? (
          <motion.div
            key="transition"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center h-full text-center"
          >
            <h2 className="text-3xl font-light text-white/70 italic font-serif tracking-wide">{transitionMsg}</h2>
          </motion.div>
        ) : questionIndex === -1 ? (
          // Chapter Intro
          <motion.div
            key={`intro-${chapter.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-lg w-full text-center space-y-8 z-10"
          >
            <p className="text-[#D4AF37] uppercase tracking-widest text-sm">Chapter {chapterIndex + 1}</p>
            <h1 className="text-4xl md:text-5xl font-light text-glow">{chapter.title}</h1>
            <p className="text-xl text-white/60 font-light">{chapter.description}</p>
            <div className="pt-12">
              <Button size="lg" onClick={handleNext}>Begin Chapter</Button>
            </div>
          </motion.div>
        ) : questionIndex < chapter.questions.length ? (
          // Question Screen
          <motion.div
            key={`q-${chapter.questions[questionIndex].id}`}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl w-full flex flex-col h-[80vh] justify-between z-10"
          >
            <div className="flex justify-between items-center text-sm text-white/40 uppercase tracking-widest pt-4">
              <span>{chapter.title}</span>
              <span>{questionIndex + 1} / {chapter.questions.length}</span>
            </div>

            <div className="flex-1 flex items-center justify-center text-center px-4">
              <h2 className="text-3xl md:text-5xl font-light leading-relaxed">
                {chapter.questions[questionIndex].text}
              </h2>
            </div>

            <div className="flex flex-col items-center justify-end pb-8 space-y-8 min-h-[200px]">
              <Timer 
                duration={chapter.questions[questionIndex].duration} 
                onComplete={() => setTimerComplete(true)} 
                isAdminMode={isAdminMode} 
              />
              
              <AnimatePresence>
                {timerComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[250px]"
                  >
                    <Button className="w-full" size="lg" onClick={handleNext}>
                      Next
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          // Mission Screen
          <motion.div
            key={`mission-${chapter.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg w-full text-center space-y-12 z-10 glass-brand p-12 rounded-[2rem]"
          >
            <p className="text-[#D4AF37] uppercase tracking-widest text-sm font-medium">Mission</p>
            <h2 className="text-2xl md:text-3xl font-light leading-relaxed">{chapter.mission.text}</h2>
            <div className="pt-8">
              <Button size="lg" onClick={handleNext} variant="primary">
                Mission Accomplished
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
