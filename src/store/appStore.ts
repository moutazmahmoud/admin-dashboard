import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export const useGlobalStore = create<AppState>()(
  persist(
    (set) => ({
      isLoading: false,
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "global-storage",
    },
  ),
);
