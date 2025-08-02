import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "firebase/auth";

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
