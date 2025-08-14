// src/types/todo.ts
import { Timestamp, FieldValue } from "firebase/firestore";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  ownerId: string;
  createdAt: Date | null;
};

export type NewTodo = {
  text: string;
  completed: boolean;
  ownerId: string;
  createdAt: FieldValue; // serverTimestamp()
};
