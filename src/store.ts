import { create } from 'zustand';

interface MissionState {
  currentSession: number;
  setSession: (session: number) => void;
  // Add more state as needed for the activities
}

export const useStore = create<MissionState>((set) => ({
  currentSession: 0,
  setSession: (session) => set({ currentSession: session }),
}));
