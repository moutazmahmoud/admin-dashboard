import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "firebase/auth";

type AuthState = {
  user: User | null;
  isAuthResolved: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthResolved: false,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => {
        return () => {
          useAuthStore.setState({ isAuthResolved: true });
        };
      },
    },
  ),
);
