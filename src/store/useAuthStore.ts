import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

type AuthUser = Pick<User, "uid" | "email" | "displayName" | "photoURL">;

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isAuthResolved: boolean;
  register: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  initAuthListener: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      isAuthResolved: false,

      register: async (email, password, displayName) => {
        try {
          set({ loading: true, error: null });
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          await updateProfile(result.user, { displayName });
          set({ user: { ...result.user, displayName } });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null });
      },

      setUser: (user) => {
        if (!user) return set({ user: null });
        const { uid, email, displayName, photoURL } = user;
        set({ user: { uid, email, displayName, photoURL } });
      },

      initAuthListener: () => {
        onAuthStateChanged(auth, (user) => {
          useAuthStore.getState().setUser(user);
          set({ isAuthResolved: true });
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user, // persist only necessary fields
      }),
    },
  ),
);
