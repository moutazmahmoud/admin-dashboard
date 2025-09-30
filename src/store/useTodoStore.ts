// src/store/useTodosStore.ts
import { create } from "zustand";
import { subscribeToMyTodos, addTodo, removeTodo, toggleTodo, updateTodoText } from "@/pages/Todos/api";
import type { Todo } from "@/types/todo";
import { useAuthStore } from "./useAuthStore";

interface TodosState {
  todos: Todo[];
  loading: boolean;
  init: () => void;
  add: (text: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  toggle: (id: string, completed: boolean) => Promise<void>;
  updateText: (id: string, text: string) => Promise<void>;
}

export const useTodosStore = create<TodosState>((set) => ({
  todos: [],
  loading: true,

  init: () => {
    const { user, isAuthResolved } = useAuthStore.getState();
    // Only init if auth state is resolved
    if (!isAuthResolved) return;

    // If no user, reset state
    if (!user) {
      set({ todos: [], loading: false });
      return;
    }

    set({ loading: true });

    const unsub = subscribeToMyTodos(
      user.uid,
      (data) => set({ todos: data, loading: false }),
      (err) => {
        console.error("Todos subscription error:", err);
        set({ loading: false });
      }
    );

    // Optional: store unsubscribe function for cleanup
    // We can add this if you want to stop the listener on logout
    void unsub;
  },

  add: async (text) => {
    await addTodo(text);
  },
  remove: async (id) => {
    await removeTodo(id);
  },
  toggle: async (id, completed) => {
    await toggleTodo(id, completed);
  },
  updateText: async (id, text) => {
    await updateTodoText(id, text);
  },
}));
