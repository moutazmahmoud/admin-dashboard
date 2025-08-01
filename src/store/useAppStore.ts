import { create } from 'zustand'

type AppState = {
  user: string | null
  setUser: (user: string) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
