import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
} from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { Todo } from "@/types/todo";

const TODOS_COL = "todos";

const todoConverter: FirestoreDataConverter<Todo> = {
  toFirestore(todo: WithFieldValue<Todo>): WithFieldValue<DocumentData> {
    return {
      text: todo.text,
      completed: todo.completed,
      ownerId: todo.ownerId,
      createdAt:
        todo.createdAt instanceof Date
          ? Timestamp.fromDate(todo.createdAt)
          : todo.createdAt || serverTimestamp(),
    };
  },
  fromFirestore(snapshot, options): Todo {
    const data = snapshot.data(options) as any;
    return {
      id: snapshot.id,
      text: data.text,
      completed: !!data.completed,
      ownerId: data.ownerId,
      createdAt: data.createdAt?.toDate?.() ?? null,
    };
  },
};

function todosCollection() {
  return collection(db, TODOS_COL).withConverter(todoConverter);
}

export async function addTodo(text: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  await addDoc(todosCollection(), {
    id: "", // will be set by Firestore on read
    text: text.trim(),
    completed: false,
    ownerId: user.uid,
    createdAt: serverTimestamp(),
  });
}

export async function toggleTodo(id: string, completed: boolean) {
  await updateDoc(doc(db, TODOS_COL, id), { completed });
}

export async function updateTodoText(id: string, text: string) {
  await updateDoc(doc(db, TODOS_COL, id), { text: text.trim() });
}

export async function removeTodo(id: string) {
  await deleteDoc(doc(db, TODOS_COL, id));
}

export function subscribeToMyTodos(
  uid: string,
  onData: (todos: Todo[]) => void,
  onError?: (err: Error) => void,
) {
  const q = query(
    todosCollection(),
    where("ownerId", "==", uid),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((doc) => doc.data())),
    (err) => onError?.(err as Error),
  );
}
