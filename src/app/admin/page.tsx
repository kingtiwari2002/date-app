"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAppStore } from "@/store/useAppStore";
import { DateSession } from "@/types";

export default function AdminScreen() {
  const router = useRouter();
  const { isAdminMode, currentSession, setCurrentSession, setAdminMode } = useAppStore();
  const [girlName, setGirlName] = useState("");
  const [adventure, setAdventure] = useState("Long Drive");

  useEffect(() => {
    if (!isAdminMode) {
      router.push("/");
    }
  }, [isAdminMode, router]);

  if (!isAdminMode) return null;

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!girlName.trim()) return;

    const newSession: DateSession = {
      id: Date.now().toString(),
      girlName: girlName.trim(),
      theme: "default",
      mood: null,
      adventure: adventure,
      currentChapterIndex: 0,
      currentQuestionIndex: -1,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCurrentSession(newSession);
    alert(`Session for ${newSession.girlName} created successfully!`);
    setGirlName("");
  };

  const handleLogout = () => {
    setAdminMode(false);
    router.push("/");
  };

  const handleTestFlow = () => {
    router.push("/mood");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-black text-white space-y-8">
      <div className="w-full max-w-2xl flex justify-between items-center pt-8">
        <h1 className="text-3xl font-light text-[#D4AF37]">Admin Dashboard</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
      </div>

      <div className="w-full max-w-2xl grid gap-8 md:grid-cols-2">
        <Card className="space-y-6">
          <h2 className="text-xl font-medium">Create New Session</h2>
          <form onSubmit={handleCreateSession} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Girl's Name</label>
              <input
                type="text"
                value={girlName}
                onChange={(e) => setGirlName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                placeholder="e.g. Priya"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-white/60 mb-1">Adventure Override</label>
              <select
                value={adventure}
                onChange={(e) => setAdventure(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Long Drive">Long Drive</option>
                <option value="Café">Café</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Night Walk">Night Walk</option>
                <option value="Random">Random (Not implemented)</option>
              </select>
            </div>

            <Button type="submit" className="w-full">Save Session</Button>
          </form>
        </Card>

        <Card className="space-y-6">
          <h2 className="text-xl font-medium">Current Active Session</h2>
          {currentSession ? (
            <div className="space-y-2 text-white/80">
              <p><strong className="text-[#D4AF37]">Name:</strong> {currentSession.girlName}</p>
              <p><strong className="text-[#D4AF37]">Adventure:</strong> {currentSession.adventure || "Pending"}</p>
              <p><strong className="text-[#D4AF37]">Mood:</strong> {currentSession.mood || "Pending"}</p>
              <p><strong className="text-[#D4AF37]">Chapter:</strong> {currentSession.currentChapterIndex + 1}</p>
              <p><strong className="text-[#D4AF37]">Started:</strong> {new Date(currentSession.createdAt).toLocaleDateString()}</p>
              <div className="pt-4 flex flex-col space-y-3">
                <Button onClick={handleTestFlow} variant="secondary" className="w-full">
                  Test Flow (Preview Mode)
                </Button>
                <Button onClick={() => setCurrentSession(null)} variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10">
                  Clear Session
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-white/40 italic">No active session.</p>
          )}
        </Card>
      </div>
    </main>
  );
}
