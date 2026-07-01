"use client";

import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminBanner() {
  const { isAdminMode, setAdminMode } = useAppStore();
  const router = useRouter();

  if (!isAdminMode) return null;

  const handleExit = () => {
    setAdminMode(false);
    router.push("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100] bg-[#D4AF37]/90 text-white text-xs md:text-sm font-medium py-2 px-4 flex items-center justify-between shadow-lg backdrop-blur-md">
      <div className="flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span>Admin Preview Mode Active</span>
      </div>
      <button 
        onClick={handleExit}
        className="flex items-center space-x-2 bg-black/20 hover:bg-black/40 px-3 py-1 rounded-full transition-colors"
      >
        <span>Exit Admin Mode</span>
        <LogOut size={14} />
      </button>
    </div>
  );
}
