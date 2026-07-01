"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, ArrowLeft, RotateCcw, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NavigationControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleOpen = () => {
    setIsOpen(true);
    setPassword("");
    setError("");
    setIsAuthenticated(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "King@2002") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleBack = () => {
    handleClose();
    router.back();
  };

  const handleRestart = () => {
    handleClose();
    router.push("/");
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md text-white/40 hover:text-white transition-all outline-none"
      >
        <Settings size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm glass-gold rounded-3xl p-6 relative"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X size={20} />
              </button>

              {!isAuthenticated ? (
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-medium text-[#D4AF37]">Admin Access</h3>
                    <p className="text-sm text-white/60">Enter password to modify experience</p>
                  </div>
                  
                  <div className="space-y-2">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#D4AF37]/50 transition-colors"
                      autoFocus
                    />
                    {error && <p className="text-xs text-red-400 pl-1">{error}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] text-black font-medium py-3 rounded-xl hover:bg-[#F3E5AB] transition-colors"
                  >
                    Verify
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-medium text-[#D4AF37]">Navigation</h3>
                    <p className="text-sm text-white/60">Where would you like to go?</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleBack}
                      className="flex flex-col items-center justify-center space-y-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    >
                      <ArrowLeft size={24} className="text-[#D4AF37]" />
                      <span className="text-sm font-medium">Go Back</span>
                    </button>
                    
                    <button
                      onClick={handleRestart}
                      className="flex flex-col items-center justify-center space-y-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                    >
                      <RotateCcw size={24} className="text-[#D4AF37]" />
                      <span className="text-sm font-medium">Restart</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
