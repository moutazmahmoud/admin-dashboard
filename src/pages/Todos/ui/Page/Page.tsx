import { useTodosStore } from "@/store/useTodoStore";
import TodoComposer from "./components/TodoComposer";
import TodoList from "./components/TodoList";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function TodosPage() {
  const { todos, loading, add, remove, toggle, updateText } = useTodosStore();
  const { init } = useTodosStore();
  const { isAuthResolved } = useAuthStore();

  useEffect(() => {
    if (isAuthResolved) {
      init();
    }
  }, [isAuthResolved, init]);

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-semibold">My Todos</h1>
      <TodoComposer onAdd={(text) => add(text)} disabled={loading} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          items={todos}
          onToggle={toggle}
          onRemove={remove}
          onUpdateText={updateText}
        />
      )}
    </div>
  );
}
