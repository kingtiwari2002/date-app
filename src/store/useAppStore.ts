import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';
import { DateSession } from '../types';

interface AppState {
  isAdminMode: boolean;
  setAdminMode: (val: boolean) => void;
  currentSession: DateSession | null;
  setCurrentSession: (session: DateSession | null) => void;
  updateSession: (updates: Partial<DateSession>) => void;
  activeSessionId: string | null;
  setActiveSessionId: (id: string | null) => void;
}

// Custom storage utilizing localforage (IndexedDB)
const storage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await localforage.getItem(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await localforage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await localforage.removeItem(name);
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAdminMode: false,
      setAdminMode: (val) => set({ isAdminMode: val }),
      currentSession: null,
      setCurrentSession: (session) => set({ currentSession: session }),
      updateSession: (updates) => set((state) => ({
        currentSession: state.currentSession ? { ...state.currentSession, ...updates } : null
      })),
      activeSessionId: null,
      setActiveSessionId: (id) => set({ activeSessionId: id }),
    }),
    {
      name: 'date-experience-storage',
      storage: createJSONStorage(() => storage),
    }
  )
);
