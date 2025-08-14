import TodoItem from "./TodoItem";
import type { Todo } from "@/types/todo";

type Props = {
  items: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onRemove: (id: string) => void;
  onUpdateText: (id: string, text: string) => void;
};

export default function TodoList({ items, onToggle, onRemove, onUpdateText }: Props) {
  if (!items.length) {
    return <div className="text-gray-500">No todos yet.</div>;
  }

  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onRemove={onRemove}
          onUpdateText={onUpdateText}
        />
      ))}
    </ul>
  );
}
